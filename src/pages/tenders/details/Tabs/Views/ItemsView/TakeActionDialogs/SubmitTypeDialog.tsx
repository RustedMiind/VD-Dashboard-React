import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

function SubmitTypeDialog({
  submitWithoutStatus,
  submitWithStatus,
  ...dialogProps
}: PropsType) {
  return (
    <Dialog fullWidth maxWidth="xs" {...dialogProps}>
      <DialogTitle>هل تريد الحفظ مع ارسال الحالة</DialogTitle>
      <DialogActions>
        <Button onClick={submitWithoutStatus}>الحفظ فقط</Button>
        <Button variant="contained" onClick={submitWithStatus}>
          الحفظ مع تغيير الحالة
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  submitWithoutStatus: () => void;
  submitWithStatus: () => void;
} & DialogProps;

export default SubmitTypeDialog;
