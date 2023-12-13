import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import RequiredSymbol from "../../../components/RequiredSymbol";
import axios from "axios";
import { Api } from "../../../constants";
import { DatePicker } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { DialogState } from "../branchDetails/FilterDetails";
import ErrorDialog from "../ErrorDialog";

export default function AddDialog(props: PropsType) {
  const selectVacation: addSelect = {
    branch_id: parseInt(props.branch_id),
    year: undefined,
    specific: null,
  };
  const [massageError, setMassageError] = useState<string | null>(null);
  function setData() {
    axios
      .post<addSelect>(Api("employee/vacation"), selectVacation)
      .then((res) => {
        console.log(res);
        props.onClose();
      })
      .catch((err) => {
        if (err.response.data.msg != "Validation errors") {
          setMassageError(err.response.data.msg);
          props.openErrorDialog();
        }
      });
  }

  return (
    <>
      <Dialog
        maxWidth={"sm"}
        fullWidth
        open={props.open}
        onClose={props.onClose}
      >
        <DialogTitle sx={{ fontWeight: "600", textAlign: "center" }}>
          اضافة محدد
        </DialogTitle>
        <DialogContent>
          <Grid container p={2}>
            <Grid item md={6}>
              <Typography>
                العام
                <RequiredSymbol />
              </Typography>

              <DatePicker
                disablePast
                // value={selectVacation.year as number}
                views={["year"]}
                slotProps={{ textField: { size: "small" } }}
                onChange={(e: Year | null) => {
                  selectVacation.year = e?.$y;
                }}
              />
            </Grid>
            <Grid item md={6}>
              <Typography sx={{ ml: 2 }}>
                اسم المحدد
                <RequiredSymbol />
              </Typography>
              <TextField
                type="text"
                size="small"
                fullWidth
                sx={{ ml: 2 }}
                onChange={(e) => {
                  selectVacation.specific = e.target.value;
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" sx={{ mb: 2 }} onClick={setData}>
            حفظ
          </Button>
        </DialogActions>
        <IconButton
          aria-label="close"
          onClick={props.onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>
    </>
  );
}
type PropsType = {
  open: boolean;
  branch_id: string;
  onClose: () => void;
  openErrorDialog: () => void;
  openAddDialog: () => void;
};
type Year = {
  $y: number;
};
type addSelect = {
  branch_id: number;
  year: number | undefined;
  specific?: string | null;
};
