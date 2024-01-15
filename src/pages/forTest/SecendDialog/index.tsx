import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  GridProps,
  MenuItem,
  Typography,
} from "@mui/material";

import { TextField } from "@mui/material";
import UploadFileInput from "../../../components/UploadFileInput";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";

export default function SecendDialog({ title }: PropsType) {
  const GridItem = (props: GridProps & { label: string }) => (
    <Grid item md={6} {...props}>
      <Typography variant="body1">{props.label}</Typography>
      {props.children}
    </Grid>
  );

  return (
    <Dialog maxWidth="md" open={true} component="form">
      <DialogContent>
        <Grid container spacing={2}>
          <Grid display={"flex"} alignItems={"center"} mb={5} item xs={6}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              {title}
            </Typography>
          </Grid>
          <Grid display={"flex"} alignItems={"center"} mb={5} item md={6}>
            <Typography sx={{ mr: 2 }}>الحاله </Typography>
            <TextField fullWidth size="small" select value={""}>
              <MenuItem> تحت الاجراء</MenuItem>
            </TextField>
          </Grid>
          <GridItem label="اسم البند">
            <TextField fullWidth size="small" value={""} />
          </GridItem>
          <GridItem label="تاريخ الانتهاء">
            <DatePicker
              slotProps={{ textField: { size: "small", fullWidth: true } }}
              sx={{ w: 1 }}
            />
          </GridItem>
          <GridItem label="ارفق عرض التقديم">
            <UploadFileInput
              size="md"
              // value={""}
              subTitle=""
              setValue={() => {}}
            />
          </GridItem>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <LoadingButton variant="contained" type="submit">
          حفظ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  title: string;
};
