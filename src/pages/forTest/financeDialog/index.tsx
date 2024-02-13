import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  GridProps,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MenuItem } from "@mui/material";
import { FileBondState } from "../../../types/FileBondState";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DateFormatString } from "../../../constants/DateFormat";

const GridItem = (props: GridProps & { label: string }) => (
  <Grid item md={6} {...props}>
    <Typography variant="body1">{props.label}</Typography>
    {props.children}
  </Grid>
);
export default function FinanceDialog() {
  const [datee, setdatee] = useState<string>("");
  console.log(datee);
  return (
    <Dialog
      maxWidth="md"
      component="form"
      onSubmit={function openCheckDialog() {}}
      open
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: 25, textAlign: "center" }}>
        نموذج المالية
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <GridItem label="اسم النموذج">
            <TextField fullWidth size="small" placeholder="اسم النموذج" />
          </GridItem>
          <GridItem label="حالة الطلب">
            <TextField select fullWidth size="small">
              <MenuItem>{"ddd"}</MenuItem>
            </TextField>
          </GridItem>
          <GridItem label="حالة السداد">
            <TextField select fullWidth size="small">
              <MenuItem>{"ddd"}</MenuItem>
            </TextField>
          </GridItem>
          <GridItem label="مدة الانتهاء المتوقعة">
            <DatePicker
              slotProps={{ textField: { size: "small" } }}
              sx={{ width: 1 }}
              disableFuture
              value={dayjs(datee)}
              onChange={(value) => {
                setdatee(value?.format(DateFormatString) || "");
              }}
            />
          </GridItem>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <LoadingButton variant="contained" type="button" onClick={() => {}}>
          حفظ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
