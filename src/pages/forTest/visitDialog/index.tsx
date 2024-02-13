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

export default function VisitDialog() {
  const [imgReq, setImgReq] = useState<FileBondState>([]);
  const [modelVisit, setModelVisit] = useState<FileBondState>([]);
  const [imgVisit, setImgVisit] = useState<FileBondState>([]);
  console.log(imgReq[0]);
  return (
    <Dialog
      maxWidth="md"
      component="form"
      onSubmit={function openCheckDialog() {}}
      open
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: 25, textAlign: "center" }}>
        نموذج الزيارة
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <GridItem label="اسم الزيارة">
            <TextField fullWidth size="small" placeholder="اسم الزيارة" />
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
          <GridItem label=" ارفاق تاكيد الطلب">
            <CustomFilePond
              acceptedFileTypes={["image/jpeg"]}
              files={imgReq}
              onupdatefiles={(fileItems) => {
                setImgReq(fileItems.map((fileItem) => fileItem.file));
              }}
            />
          </GridItem>
          <GridItem label="ارفاق نموذج الزيارة">
            <CustomFilePond
              acceptedFileTypes={["image/jpeg"]}
              files={modelVisit}
              onupdatefiles={(fileItems) => {
                setModelVisit(fileItems.map((fileItem) => fileItem.file));
              }}
            />
          </GridItem>
          <GridItem label="ارفاق صورة الزيارة">
            <CustomFilePond
              acceptedFileTypes={["image/jpeg"]}
              files={imgVisit}
              onupdatefiles={(fileItems) => {
                setImgVisit(fileItems.map((fileItem) => fileItem.file));
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
