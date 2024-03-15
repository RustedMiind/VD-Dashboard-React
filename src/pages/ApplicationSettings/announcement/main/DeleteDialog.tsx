import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Announcement } from "../../../../types/Announcement";
function DeleteDialog({
  announcement,
  onConfirmDelete,
  ...props
}: DialogProps & {
  announcement?: Announcement;
  onClose: () => void;
  onConfirmDelete: (a: Announcement) => void;
}) {
  return (
    <Dialog {...props}>
      <DialogTitle>حذف الاعلان</DialogTitle>
      <DialogContent>
        <DialogContentText>
          هل انت متأكد من رغبتك في حذف اعلان ({announcement?.title})
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          الغاء
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={
            announcement ? () => onConfirmDelete(announcement) : props.onClose
          }
        >
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
