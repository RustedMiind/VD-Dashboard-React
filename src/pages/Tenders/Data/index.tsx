import {
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TendersOperations from "./TendersOperations";
import TendersTable from "./TendersTable";

function TendersData() {
  return (
    <>
      <Paper>
        <TendersOperations />
        <TendersTable />
      </Paper>
      <Stack
        direction="row"
        spacing={1}
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Stack direction="row" alignItems="center">
          <Typography> عدد العرض في الصفحة</Typography>
          <TextField size="small" select value={25}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={250}>250</MenuItem>
            <MenuItem value={500}>500</MenuItem>
            <MenuItem value={1000}>1000</MenuItem>
            <MenuItem value={10000}>10000</MenuItem>
            <MenuItem value={"-1"}>عرض الكل</MenuItem>
          </TextField>
        </Stack>
        <Stack >
          <Button sx={{ textDecoration: "underline" }}>عرض الكل</Button>
        </Stack>
      </Stack>
    </>
  );
}

export default TendersData;
