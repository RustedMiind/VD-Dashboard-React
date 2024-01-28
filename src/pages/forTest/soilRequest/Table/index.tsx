import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableContainer,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Typography } from "@mui/material";
import TableContent from "./TableContent";

function SoilRequestTable() {
  return (
    <Stack>
      <>
        <Paper sx={{ p: 3 }}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{ mb: 1 }}
            >
              اعدادات الطلبات
            </Button>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{ mb: 1 }}
            >
              اضافة الطلب
            </Button>
          </Box>
          <Table>
            <TableContent />
          </Table>
        </Paper>
        <Box
          position={"relative"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Stack p={2} direction="row" alignItems="center" spacing={1}>
            <Typography> عدد العرض في الصفحة</Typography>
            <TextField size="small" select>
              <MenuItem value={"5"}>5</MenuItem>
              <MenuItem value={"25"}>25</MenuItem>
              <MenuItem value={"100"}>100</MenuItem>
              <MenuItem value={"250"}>250</MenuItem>
              <MenuItem value={"500"}>500</MenuItem>
              <MenuItem value={"1000"}>1000</MenuItem>
              <MenuItem value={"10000"}>10000</MenuItem>
              <MenuItem value={"-1"}>عرض الكل</MenuItem>
            </TextField>
          </Stack>
          <Stack p={2}>
            <Button sx={{ textDecoration: "underline" }}>عرض الكل</Button>
          </Stack>
        </Box>
      </>
    </Stack>
  );
}

export default SoilRequestTable;
