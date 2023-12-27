import { Box, Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

function TendersFilter() {
  return (
    <Box component="form" pb={7}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <TextField label="اسم جهة المنافسة" type="text" size="small" />
        </Grid>
        <Grid item xs={2}>
          <TextField label="رقم الجهة" type="number" size="small" />
        </Grid>
        <Grid item xs={2}>
          <TextField label="اسم المنافسة" type="text" size="small" />
        </Grid>
        <Grid item xs={2}>
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            label={"تاريخ التقديم"}
          />
        </Grid>
        <Grid item xs={2}>
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            label={"تاريخ الانتهاء"}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" fullWidth>
            بحث
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TendersFilter;
