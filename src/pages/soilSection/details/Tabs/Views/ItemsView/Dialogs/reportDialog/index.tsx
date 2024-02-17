import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  GridProps,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import { FormStatus } from "../../../../../../../../types/FormStatus";
import { FileBondState } from "../../../../../../../../types/FileBondState";
import CustomFilePond from "../../../../../../../../components/CustomFilepond";
import { objectToFormData } from "../../../../../../../../methods";
import { Api } from "../../../../../../../../constants";
import { SoilDataContext } from "../../../../..";

const GridItem = (props: GridProps & { label: string }) => (
  <Grid item md={6} {...props}>
    <Typography variant="body1">{props.label}</Typography>
    {props.children}
  </Grid>
);

export default function ReportDialog({ open, onClose, id }: PropsType) {
  const { setItems } = useContext(SoilDataContext);

  const objectReport: TypeReport = {
    form_name: "",
    status: "",
    end_date: "",
  };
  const { enqueueSnackbar } = useSnackbar();
  const [amountData, setAmountData] = useState<TypeReport>(objectReport);
  const [file, setFile] = useState<FileBondState>([]);
  const [formStatus, setFormStatus] = useState<FormStatus>("none");

  function updateAmountData(partial: Partial<TypeReport>) {
    setAmountData({
      ...amountData,
      ...partial,
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (id) {
      setFormStatus("loading");
      axios
        .post(
          Api(`employee/client/order/add-step/${id}`),
          objectToFormData({
            ...amountData,
            image: file[0],
          })
        )
        .then((res) => {
          enqueueSnackbar("تم اتخاذ الاجراء بنجاح");
          setFormStatus("none");
          onClose();
          setItems && setItems();
        })
        .catch((err) => {
          enqueueSnackbar("يجب تعبئة جميع الحقول" || "", {
            variant: "error",
          });
          setFormStatus("none");
        });
    } else {
      enqueueSnackbar("يجب تعبئة جميع الحقول", { variant: "error" });
    }
  };
  return (
    <Dialog
      maxWidth="md"
      component="form"
      onSubmit={handleSubmit}
      open={open}
      onClose={onClose}
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: 25, textAlign: "center" }}>
        نموذج التقرير
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <GridItem label="اسم التقرير">
            <TextField
              value={amountData.form_name}
              onChange={(e) => {
                updateAmountData({ form_name: e.target.value });
              }}
              fullWidth
              size="small"
              placeholder="اسم التقرير"
            />
          </GridItem>
          <GridItem label="حالة الطلب">
            <FormControl fullWidth size="small">
              <Select
                value={amountData.status}
                onChange={(e) => {
                  updateAmountData({
                    status: e.target.value as string,
                  });
                }}
              >
                <MenuItem value={18}>مقبول</MenuItem>
                <MenuItem value={19}>مرفوض</MenuItem>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem label="مدة الانتهاء المتوقعة">
            <DatePicker
              slotProps={{ textField: { size: "small" } }}
              sx={{ width: 1 }}
              value={dayjs(amountData.end_date)}
              onChange={(value) => {
                updateAmountData({
                  end_date: value?.format("YYYY-MM-DD") || "",
                });
              }}
            />
          </GridItem>
          <GridItem label=" ارفاق التقرير">
            <CustomFilePond
              acceptedFileTypes={["image/jpeg"]}
              files={file}
              onupdatefiles={(fileItems) => {
                setFile(fileItems.map((fileItem) => fileItem.file));
              }}
            />
          </GridItem>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <LoadingButton
          variant="contained"
          type="submit"
          loading={formStatus === "loading"}
        >
          حفظ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

type TypeReport = {
  form_name: string;
  status: string;
  end_date: string;
};
type PropsType = {
  open: boolean;
  onClose: () => void;
  id?: number;
};
