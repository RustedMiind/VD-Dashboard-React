import { Box, Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

function GridItem({ children }: { children: React.ReactNode }) {
  return (
    <Grid item xs={6} lg={2} md={4}>
      {children}
    </Grid>
  );
}

function TendersFilters() {
  return (
    <Box component="form" pb={7}>
      <Grid container spacing={2}>
        <GridItem>
          <TextField
            fullWidth
            label="اسم جهة المنافسة"
            type="text"
            size="small"
          />
        </GridItem>
        <GridItem>
          <TextField fullWidth label="رقم الجهة" type="number" size="small" />
        </GridItem>
        <GridItem>
          <TextField fullWidth label="اسم المنافسة" type="text" size="small" />
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
