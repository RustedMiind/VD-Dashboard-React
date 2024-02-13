import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  GridProps,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MenuItem } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import { FileBondState } from "../../../../../types/FileBondState";
import CustomFilePond from "../../../../../components/CustomFilepond";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Api } from "../../../../../constants";
import { FormControl } from "@mui/material";
import dayjs from "dayjs";
import { DateFormatString } from "../../../../../constants/DateFormat";
import { objectToFormData } from "../../../../../methods";

const GridItem = (props: GridProps & { label: string }) => (
  <Grid item md={6} {...props}>
    <Typography variant="body1">{props.label}</Typography>
    {props.children}
  </Grid>
);

export default function VisitDialog({
  open,
  onClose,
  requestId,
  stepId,
  setRequests,
}: PropsType) {
  const { enqueueSnackbar } = useSnackbar();
  const objectTest: TypeVisit = {
    form_name: "",
    status: "",
    end_date: "",
  };
  const [amountData, setAmountData] = useState<TypeVisit>(objectTest);
  const [image, setImage] = useState<FileBondState>([]);
  const [confirmation, setConfirmation] = useState<FileBondState>([]);
  const [form, setForm] = useState<FileBondState>([]);

  function updateAmountData(partial: Partial<TypeVisit>) {
    setAmountData({
      ...amountData,
      ...partial,
    });
  }
  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (requestId) {
      axios
        .post(
          Api(`employee/client/order/add-step/${stepId}`),
          objectToFormData({
            ...amountData,
            image: image[0],
            confirmation: confirmation[0],
            form: form[0],
          })
        )
        .then((res) => {
          setRequests();
          enqueueSnackbar("تم اتخاذ الاجراء بنجاح");
          onClose();
        })
        .catch((err) => {
          enqueueSnackbar("يجب تعبئة جميع الحقول" || "", {
            variant: "error",
          });
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
        نموذج الزيارة
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <GridItem label="اسم الزيارة">
            <TextField
              value={amountData.form_name}
              onChange={(e) => {
                updateAmountData({ form_name: e.target.value });
              }}
              fullWidth
              size="small"
              placeholder="اسم الزيارة"
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
                <MenuItem value={33}>معتمد</MenuItem>
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
          <GridItem label=" ارفاق تاكيد الطلب">
            <CustomFilePond
              acceptedFileTypes={["image/jpeg"]}
              files={confirmation}
              onupdatefiles={(fileItems) => {
                setConfirmation(fileItems.map((fileItem) => fileItem.file));
              }}
            />
          </GridItem>
          <GridItem label="ارفاق نموذج الزيارة">
            <CustomFilePond
              acceptedFileTypes={["image/jpeg"]}
              files={form}
              onupdatefiles={(fileItems) => {
                setForm(fileItems.map((fileItem) => fileItem.file));
              }}
            />
          </GridItem>
          <GridItem label="ارفاق صورة الزيارة">
            <CustomFilePond
              acceptedFileTypes={["image/jpeg"]}
              files={image}
              onupdatefiles={(fileItems) => {
                setImage(fileItems.map((fileItem) => fileItem.file));
              }}
            />
          </GridItem>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <LoadingButton variant="contained" type="submit" onClick={() => {}}>
          حفظ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
type PropsType = {
  open: boolean;
  onClose: () => void;
  setRequests: () => void;
  requestId?: number;
  stepId?: number;
};
type TypeVisit = {
  form_name: string;
  status: string;
  end_date: string;
};
