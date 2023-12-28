import { Box, Button, Grid, GridProps, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

function GridItem({ children }: GridProps) {
  return (
    <Grid item xs={12} sm={6} lg={4} xl={2}>
      {children}
    </Grid>
  );
}

function TendersFilters() {
  return (
    <Box component="form" pb={7}>
      <Grid container spacing={2}>
        <GridItem>
          <TextField fullWidth label="اسم جهة المنافسة" size="small" />
        </GridItem>
        <GridItem>
          <TextField fullWidth label="رقم الجهة" size="small" />
        </GridItem>
        <GridItem>
          <TextField fullWidth label="اسم المنافسة" size="small" />
        </GridItem>
        <GridItem>
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            label={"تاريخ التقديم"}
          />
        </GridItem>
        <GridItem>
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            label={"تاريخ الانتهاء"}
          />
        </GridItem>
        <GridItem>
          <Button variant="contained" type="submit" fullWidth>
            بحث
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default TendersFilters;
