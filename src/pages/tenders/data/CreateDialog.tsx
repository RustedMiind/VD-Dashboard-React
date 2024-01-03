import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CreateDialog(props: PropsType) {
  const navigate = useNavigate();

  function goToCreate() {
    props.onClose();
    setTimeout(() => {
      navigate("create");
    }, 50);
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth={"sm"}>
      <DialogTitle>انشاء منافسة جديدة</DialogTitle>
      <DialogContent>
        <RadioGroup row>
          <Grid container sx={{ py: 2 }} justifyContent="space-between">
            <Grid item>
              <FormControlLabel
                disabled
                value="option2"
                control={<Radio />}
                label="تأهيل سابق"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                checked={true}
                value="option1"
                control={<Radio />}
                label="منافسة"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                disabled
                value="option3"
                control={<Radio />}
                label="تأهيل لاحق"
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>الغاء</Button>
        <Button variant="contained" onClick={goToCreate}>
          انشاء منافسة
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateDialog;

type PropsType = {
  open: boolean;
  onClose: () => void;
};
