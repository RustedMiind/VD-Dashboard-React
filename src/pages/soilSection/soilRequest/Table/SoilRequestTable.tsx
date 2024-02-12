import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  Table,
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
import axios from "axios";
import { useSnackbar } from "notistack";
import { AxiosErrorType } from "../../../../types/Axios";
import { LaravelValidationError } from "../../../../types/LaravelValidationError";
import { Api } from "../../../../constants";

function SoilRequestTable() {
  const {
    soilRequest,
    setSoilRequest,
    limit,
    setLimit,
    setSelectSoilId,
    selectSoilId,
  } = useContext(TableContext);
  const snackbar = useSnackbar();

  function handleDelete() {
    setSelectSoilId && setSelectSoilId([]);
    axios
      .post(Api(`employee/client/order/steps/forms/delete/${selectSoilId}`), {
        data: { id: selectSoilId },
      })
      .then((res) => {
        snackbar.enqueueSnackbar("تم حذف  المختارة بنجاح");
        setSoilRequest && setSoilRequest();
      })
      .catch((err: AxiosErrorType<LaravelValidationError<unknown>>) => {
        snackbar.enqueueSnackbar("تعذر في الحذف", {
          variant: "error",
        });
      });
  }
  return (
    <Stack>
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
          <Box>
            <Button
              onClick={handleDelete}
              variant="outlined"
              color="error"
              sx={{ mb: 1, mx: 2 }}
              disabled={!selectSoilId?.length}
            >
              حذف
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
        </Box>
        {soilRequest === "loading" && <LoadingTable rows={5} cols={9} />}
        {soilRequest === "error" && <NotFound title="حدث خطأ حاول مرة أخرى" />}
        {!soilRequest?.length && <NotFound title="لا يوجد طلبات" />}
        {Array.isArray(soilRequest) && !!soilRequest?.length && (
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
    </Stack>
  );
}

export default SoilRequestTable;
