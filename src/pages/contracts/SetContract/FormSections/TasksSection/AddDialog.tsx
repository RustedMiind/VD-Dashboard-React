import Button from "@mui/material/Button";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";

function FormTextField(props: TextfieldPropsType) {
  return <TextField {...props} size="small" fullWidth variant="outlined" />;
}

type TextfieldPropsType = TextFieldProps;

function AddDialog(props: PropsType) {
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>اضافة مهمة</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid p={1} item md={6}>
            <FormTextField label="اسم المهمة" />
          </Grid>
          <Grid p={1} item md={6}>
            <FormTextField label="مدة المهمة" />
          </Grid>
          <Grid p={1} item md={6}>
            <FormTextField label="قيمة المهمة" />
          </Grid>
          <Grid p={1} item md={6}>
            <FormTextField label="المسؤول عن المهمة" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>الغاء</Button>
        <Button variant="contained" onClick={props.handleClose}>
          اضافة
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  open: boolean;
  handleClose: () => void;
};

export default AddDialog;
