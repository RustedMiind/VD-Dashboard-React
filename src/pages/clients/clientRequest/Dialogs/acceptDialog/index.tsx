import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { MenuItem } from "@mui/material";

export default function AcceptDialog({
  open,
  onClose,
  requestId,
  stepId,
  setRequests,
}: PropsType) {
  return (
    <Dialog
      maxWidth="sm"
      component="form"
      fullWidth
      onSubmit={function openCheckDialog() {}}
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
              <TextField select fullWidth size="small" sx={{ width: 1 }}>
                <MenuItem>{"ddd"}</MenuItem>
              </TextField>
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
        <LoadingButton variant="contained" type="button" onClick={() => {}}>
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
