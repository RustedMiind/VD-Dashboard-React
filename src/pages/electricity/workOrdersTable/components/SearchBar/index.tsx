import { Button, Grid, TextField } from "@mui/material";

export default function WorkOrderSearchBar() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={11}>
        <TextField size="small" fullWidth placeholder="بحث" />
      </Grid>
      <Grid item xs={1}>
        <Button variant="contained">بحث</Button>
      </Grid>
    </Grid>
  );
}
