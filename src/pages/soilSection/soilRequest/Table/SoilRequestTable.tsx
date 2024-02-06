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
import { useContext } from "react";
import { TableContext } from "../TableContext";
import LoadingTable from "../../../../components/LoadingTable";
import NotFound from "../../../../components/NotFound";
import { NavLink } from "react-router-dom";

function SoilRequestTable() {
  const { soilRequest, limit, setLimit } = useContext(TableContext);

  return (
    <Stack>
      <>
        <Paper sx={{ p: 3 }}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{ mb: 1 }}
              component={NavLink}
              to={"../../services/soil/create"}
            >
              اعدادات الطلبات
            </Button>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{ mb: 1 }}
              disabled
            >
              اضافة الطلب
            </Button>
          </Box>
          {soilRequest === "loading" && <LoadingTable rows={5} cols={9} />}
          {soilRequest === "error" && (
            <NotFound title="حدث خطأ حاول مرة أخرى" />
          )}
          {Array.isArray(soilRequest) && (
            <Table>
              <TableContent />
            </Table>
          )}
        </Paper>
        <Box
          position={"relative"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Stack p={2} direction="row" alignItems="center" spacing={1}>
            <Typography> عدد العرض في الصفحة</Typography>
            <TextField
              onChange={(e) => {
                setLimit && setLimit(e.target.value);
              }}
              size="small"
              select
              value={limit}
            >
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
            <Button
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => {
                setLimit && setLimit("-1");
              }}
            >
              عرض الكل
            </Button>
          </Stack>
        </Box>
      </>
    </Stack>
  );
}

export default SoilRequestTable;
