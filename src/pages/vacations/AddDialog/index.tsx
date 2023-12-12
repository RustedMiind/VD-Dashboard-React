import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import RequiredSymbol from "../../../components/RequiredSymbol";
import axios from "axios";
import { Api } from "../../../constants";
import { DatePicker } from "@mui/x-date-pickers";

export default function AddDialog(props: TypeProps) {
  const selectVacation: addSelect = {
    branch_id: undefined,
    year: undefined,
    spicefic: "",
  };

  // start axios get data
  function setData() {
    axios
      .post<addSelect>(Api("employee/vacation"), selectVacation)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // end axios get data
  return (
    <>
      <Dialog maxWidth={"sm"} fullWidth open={props.open}>
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
                  selectVacation.spicefic = e.target.value;
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
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => {
              setData();
            }}
          >
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
type TypeProps = {
  open: boolean;
  // onClose: () => void;
  // setTableData: () => void;
  // openErrorDialog: () => void;
};
type Year = {
  $y: number;
};
type addSelect = {
  branch_id: number | undefined;
  year: number | undefined;
  spicefic: string;
};
