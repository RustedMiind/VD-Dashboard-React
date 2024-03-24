import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Announcement } from "../../../../types/Announcement";
import { MobileService } from "../../../../types/MobileServices";
function DeleteDialog({
  service,
  onConfirmDelete,
  ...props
}: DialogProps & {
  service?: MobileService;
  onClose: () => void;
  onConfirmDelete: (a: MobileService) => void;
}) {
  return (
    <Dialog {...props}>
      <DialogTitle>حذف الخدمة</DialogTitle>
      <DialogContent>
        <DialogContentText>
          هل انت متأكد من رغبتك في حذف الخدمة ({service?.name})
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          الغاء
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={service ? () => onConfirmDelete(service) : props.onClose}
        >
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
