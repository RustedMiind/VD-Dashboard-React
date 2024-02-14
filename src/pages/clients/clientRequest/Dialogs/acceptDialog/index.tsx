import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MenuItem } from "@mui/material";
import axios from "axios";
import { Api } from "../../../../../constants";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { FormStatus } from "../../../../../types/FormStatus";

export default function AcceptDialog({
  open,
  onClose,
  requestId,
  stepId,
  setRequests,
}: PropsType) {
  const { enqueueSnackbar } = useSnackbar();
  const [formStatus, setFormStatus] = useState<FormStatus>("none");
  const objectTest: TypeAccept = {
    status: "",
  };
  const [amountData, setAmountData] = useState<TypeAccept>(objectTest);
  function updateAmountData(partial: Partial<TypeAccept>) {
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
      maxWidth="sm"
      component="form"
      fullWidth
      onSubmit={handleSubmit}
      open={open}
      onClose={onClose}
      sx={{ p: 5 }}
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: 25, textAlign: "center" }}>
        نموذج الموافقة
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
              <Typography sx={{ width: 0.5 }}>حالة الطلب</Typography>
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
            </Box>
          </Grid>
          <Grid item md={12}>
            <Typography>الملاحظة</Typography>
            <TextField
              multiline
              minRows={4}
              fullWidth
              size="small"
              sx={{ width: 1 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <LoadingButton
          variant="contained"
          type="submit"
          loading={formStatus === "loading"}
        >
          ارسال
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
type TypeAccept = {
  status: string;
};
