import { Button, Grid, MenuItem, TextField } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { DatePicker } from "@mui/x-date-pickers";

function FilterDetails() {
  return (
    <Grid container width={1} py={2}>
      <Grid container spacing={2} md={10}>
        <Grid item xs={2}>
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            label={'"العام"'}
            openTo="year"
            disableFuture
            views={["year"]}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            select
            fullWidth
            label="الحالة"
            size="small"
            sx={{ color: "primary" }}
          >
            <MenuItem value={10}>معتمد</MenuItem>
            <MenuItem value={20}>مسودة</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid item md={2}>
        <Button variant="contained" size="large" color="primary" fullWidth>
          <AddCircleOutlineRoundedIcon sx={{ mr: 1 }} />
          إضافة محدد
        </Button>
      </Grid>
    </Grid>
  );
}

export default FilterDetails;
