import { Box, Button, Grid, Paper, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableActions from "./components/TableActions";
import TableHeader from "./components/TableHeader";
import TableData from "./components/TableData";
import FooterPagenation from "./components/FooterPagenation";

function WorkOrdersTable() {
  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <TextField size="small" fullWidth placeholder="بحث" />
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained">بحث</Button>
        </Grid>
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "end", gap: 1, marginTop: 2 }}
      >
        <Button variant="contained">تحديثات</Button>
        <Button variant="contained" startIcon={<AddIcon />}>
          اضافة أمر العمل
        </Button>
        <Button variant="contained" startIcon={<AddIcon />}>
          استيراد من ملف Excel
        </Button>
      </Box>
      <Paper sx={{ mt: 5 }}>
        <TableActions />
        <TableHeader />
        <TableData />
        <FooterPagenation />
      </Paper>
    </Stack>
  );
}

export default WorkOrdersTable;
