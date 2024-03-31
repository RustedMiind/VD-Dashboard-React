import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Api } from "../../../../../constants";
function DeleteDialog({ open, setOpen, CommunicationData, id }: PropsType) {
  const { enqueueSnackbar } = useSnackbar();
  function handleClose() {
    setOpen(!open);
  }
  function handleDelete() {
    axios
      .post(Api("employee/client/contact-us/multi-delete"), {
        ids: [id],
      })
      .then((res) => {
        CommunicationData();
        enqueueSnackbar("تم الحذف بنجاح");
        handleClose();
      })
      .catch((err) => {
        enqueueSnackbar("تعذر حذف البيانات", { variant: "error" });
      });
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent sx={{ p: 5 }}>
        <DialogContentText>هل انت متأكد من رغبتك في الحذف</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          الغاء
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
type PropsType = {
  open: boolean;
  id?: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  CommunicationData: () => void;
};
