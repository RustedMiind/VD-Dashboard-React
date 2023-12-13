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
import { DatePicker } from "@mui/x-date-pickers";
import { VacationsDetailsType } from "../branchDetails";

export default function ShowVactionDialog(props: TypeProps) {
  console.log(props.vacationsData);

  const handleClose = () => {
    props.setOpen(!props.open);
  };

  return (
    <>
      <Dialog maxWidth={"sm"} fullWidth open={props.open}>
        <Typography sx={{ fontWeight: "800", textAlign: "center", pt: 5 }}>
          عرض الاجازة
        </Typography>
        <DialogContent>
          <Grid container p={1}>
            <Grid item md={6}>
              <Typography>العام</Typography>

              <DatePicker
                disabled
                disablePast
                views={["year"]}
                slotProps={{ textField: { size: "small" } }}
                onChange={(e: Year | null) => {
                  console.log(e?.$y);
                }}
              />
            </Grid>
            <Grid item md={6}>
              <Typography sx={{ ml: 2 }}>عدد الاجازات</Typography>
              <TextField
                disabled
                size="small"
                value={
                  props.vacationsData &&
                  props.vacationsData[0].vacationDayNumber
                }
                fullWidth
                sx={{ ml: 2 }}
              />
            </Grid>
            <Grid item md={6} my={2}>
              <Typography> عدد الايام</Typography>
              <TextField
                disabled
                value={
                  props.vacationsData &&
                  props.vacationsData[0].vacationDayNumberUsed + " يوم"
                }
                size="small"
                fullWidth
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </Grid>
            <Grid item md={6} my={2}>
              <Typography sx={{ ml: 2 }}>الحالة </Typography>
              <TextField
                disabled
                size="small"
                fullWidth
                sx={{ ml: 2 }}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </Grid>
            <Grid item md={6}>
              <Typography>المستخدم</Typography>
              <TextField
                disabled
                size="small"
                fullWidth
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </Grid>
            <Grid item md={6}>
              <Typography sx={{ ml: 2 }}>المتبقي</Typography>
              <TextField
                disabled
                size="small"
                fullWidth
                sx={{ ml: 2 }}
                onChange={(e) => {
                  console.log(e.target.value);
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
            sx={{ my: 2, px: 7 }}
            onClick={handleClose}
          >
            رجوع
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

type Year = {
  $y: number;
};
type TypeProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vacationsData?: VacationsDetailsType[];
};
