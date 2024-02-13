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
import { DatePicker } from "@mui/x-date-pickers";
import { MenuItem } from "@mui/material";
import UploadFileInput from "../../../components/UploadFileInput";

const GridItem = (props: GridProps & { label: string }) => (
  <Grid item md={6} {...props}>
    <Typography variant="body1">{props.label}</Typography>
    {props.children}
  </Grid>
);
export default function TestDialog() {
  return (
    <Dialog
      maxWidth="md"
      component="form"
      onSubmit={function openCheckDialog() {}}
      open
    >
      <DialogTitle>نموذج الاختبار</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <GridItem label="اسم الاختبار">
            <TextField fullWidth size="small" />
          </GridItem>
          <GridItem label="حالة الطلب">
            <TextField select fullWidth size="small">
              <MenuItem>{"ddd"}</MenuItem>
            </TextField>
          </GridItem>
          <GridItem label="مدة الانتهاء المتوقعة">
            <DatePicker
              slotProps={{ textField: { size: "small" } }}
              sx={{ width: 1 }}
              disableFuture
            />
          </GridItem>
          <GridItem label="ارفاق صور للاختبار">
            <UploadFileInput
              size="sm"
              value={undefined}
              subTitle=""
              setValue={(file) => <></>}
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
