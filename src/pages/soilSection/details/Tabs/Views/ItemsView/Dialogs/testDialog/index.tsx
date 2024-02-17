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
import { DatePicker } from "@mui/x-date-pickers";
import { MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { FileBondState } from "../../../../../../../../types/FileBondState";
import { FormStatus } from "../../../../../../../../types/FormStatus";
import { objectToFormData } from "../../../../../../../../methods";
import { Api } from "../../../../../../../../constants";
import CustomFilePond from "../../../../../../../../components/CustomFilepond";
import { SoilDataContext } from "../../../../..";
import { set } from "react-hook-form";
const GridItem = (props: GridProps & { label: string }) => (
  <Grid item md={6} {...props}>
    <Typography variant="body1">{props.label}</Typography>
    {props.children}
  </Grid>
);
export default function TestDialog({ open, onClose, id }: PropsType) {
  const [formStatus, setFormStatus] = useState<FormStatus>("none");
  const { setItems } = useContext(SoilDataContext);

  const { enqueueSnackbar } = useSnackbar();
  const objectTest: TypeTest = {
    form_name: "",
    status: "",
    end_date: "",
    image: [],
  };
  const [amountData, setAmountData] = useState<TypeTest>(objectTest);
  const [file, setFile] = useState<FileBondState>([]);

  function updateAmountData(partial: Partial<TypeTest>) {
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
        نموذج الاختبار
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <GridItem label="اسم الاختبار">
            <TextField
              value={amountData.form_name}
              onChange={(e) => {
                updateAmountData({ form_name: e.target.value });
              }}
              fullWidth
              size="small"
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
          <GridItem label=" ارفاق صور الاختبار">
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

type TypeTest = {
  form_name: string;
  status: string;
  image: FileBondState;
  end_date: string;
};
type PropsType = {
  open: boolean;
  onClose: () => void;
  id?: number;
};
