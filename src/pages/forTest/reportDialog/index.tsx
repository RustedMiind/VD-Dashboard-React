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
import CustomFilePond from "../../../components/CustomFilepond";
import { FileBondState } from "../../../types/FileBondState";
import { DatePicker } from "@mui/x-date-pickers";

const GridItem = (props: GridProps & { label: string }) => (
  <Grid item md={6} {...props}>
    <Typography variant="body1">{props.label}</Typography>
    {props.children}
  </Grid>
);

export default function ReportDialog() {
  const [imgReq, setImgReq] = useState<FileBondState>([]);
  console.log(imgReq[0]);
  return (
    <Dialog
      maxWidth="md"
      component="form"
      onSubmit={function openCheckDialog() {}}
      open
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: 25, textAlign: "center" }}>
        نموذج التقرير
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <GridItem label="اسم التقرير">
            <TextField fullWidth size="small" placeholder="اسم التقرير" />
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
          <GridItem label=" ارفاق التقرير">
            <CustomFilePond
              acceptedFileTypes={["image/jpeg"]}
              files={imgReq}
              onupdatefiles={(fileItems) => {
                setImgReq(fileItems.map((fileItem) => fileItem.file));
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
