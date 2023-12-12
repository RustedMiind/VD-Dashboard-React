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
import { useState } from "react";
import dayjs from "dayjs";

export default function ShowVactionDialog() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog maxWidth={"sm"} fullWidth open={open} onClose={handleClose}>
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
                fullWidth
                sx={{ ml: 2 }}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </Grid>
            <Grid item md={6} my={2}>
              <Typography> عدد الايام</Typography>
              <TextField
                disabled
                value={" 2 يوم"}
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
