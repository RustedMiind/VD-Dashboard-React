import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  GridProps,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DateFormatString } from "../../../../../constants/DateFormat";
import axios from "axios";
import { Api } from "../../../../../constants";
import { useSnackbar } from "notistack";
import { Select } from "@mui/material";
import { FormStatus } from "../../../../../types/FormStatus";

const GridItem = (props: GridProps & { label: string }) => (
  <Grid item md={6} {...props}>
    <Typography variant="body1">{props.label}</Typography>
    {props.children}
  </Grid>
);

export default function FinanceDialog({
  open,
  onClose,
  requestId,
  stepId,
  setRequests,
}: PropsType) {
  const objectFinance: TypeFinance = {
    form_name: "",
    status: "",
    payment_status: "",
    end_date: "",
  };
  const { enqueueSnackbar } = useSnackbar();
  const [amountData, setAmountData] = useState<TypeFinance>(objectFinance);
  const [formStatus, setFormStatus] = useState<FormStatus>("none");

  function updateAmountData(partial: Partial<TypeFinance>) {
    setAmountData({
      ...amountData,
      ...partial,
    });
  }
  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    if (requestId) {
      axios
        .post(Api(`employee/client/order/add-step/${stepId}`), amountData)
        .then((res) => {
          setRequests();
          enqueueSnackbar("تم اتخاذ الاجراء بنجاح");
          onClose();
          setAmountData(objectFinance);
          setFormStatus("none");
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
        نموذج المالية
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <GridItem label="اسم النموذج">
            <TextField
              value={amountData.form_name}
              onChange={(e) => {
                updateAmountData({ form_name: e.target.value });
              }}
              fullWidth
              size="small"
              placeholder="اسم النموذج"
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
          <GridItem label="حالة السداد">
            <FormControl fullWidth size="small">
              <Select
                value={amountData.payment_status}
                onChange={(e) => {
                  updateAmountData({
                    payment_status: e.target.value as string,
                  });
                }}
              >
                <MenuItem value={1}>تم السداد الجزئي</MenuItem>
                <MenuItem value={2}>تم السداد الموافقة على التقرير</MenuItem>
                <MenuItem value={3}>تاكيد الدفع الكاش</MenuItem>
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
type PropsType = {
  open: boolean;
  onClose: () => void;
  setRequests: () => void;
  requestId?: number;
  stepId?: number;
};
type TypeFinance = {
  form_name: string;
  status: string;
  payment_status: string;
  end_date: string;
};
