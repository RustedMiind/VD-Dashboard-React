import {
  IconButton,
  TableBody as MuiTableBody,
  TableCell,
  TableRow,
  Checkbox,
  TableHead as MuiTableHead,
  Paper,
  Table,
  Typography,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useContext } from "react";
import { TableContext } from "../TableContext";
import { formatDate } from "../../../../methods";
import { NavLink } from "react-router-dom";
import { useSnackbar } from "notistack";

function TableContent() {
  const { soilRequest, setSoilRequest, selectSoilId, setSelectSoilId } =
    useContext(TableContext);
  const snackbar = useSnackbar();

  const selectAllHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    let values: number[] | undefined =
      typeof soilRequest === "object"
        ? soilRequest?.map((item) => {
            return item.id;
          })
        : [];
    if (checked) {
      setSelectSoilId && setSelectSoilId(values || []);
    } else setSelectSoilId && setSelectSoilId([]);
  };
  function CheckboxHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let isSelect = e.target.checked;

    let value = parseInt(e.target.value);
    if (isSelect) {
      setSelectSoilId &&
        selectSoilId &&
        setSelectSoilId([...selectSoilId, value]);
    } else {
      setSelectSoilId &&
        setSelectSoilId((prevData) => {
          return prevData.filter((id) => {
            return id !== value;
          });
        });
    }
  }

  return (
    <>
      <MuiTableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              checked={
                typeof soilRequest === "object" &&
                selectSoilId?.length != 0 &&
                selectSoilId?.length === soilRequest.length
              }
              onChange={selectAllHandler}
            />
          </TableCell>
          <TableCell>رقم الطلب</TableCell>
          <TableCell>اسم العميل</TableCell>
          <TableCell>تاريخ الطلب</TableCell>
          <TableCell>اسم الخدمة</TableCell>
          <TableCell>نوع التقرير</TableCell>
          <TableCell>الحالة</TableCell>
          <TableCell>عدد الادوار</TableCell>
          <TableCell>عدد الجسات</TableCell>
          <TableCell>عمق الجسات</TableCell>
          <TableCell>عرض الموقع</TableCell>
        </TableRow>
      </MuiTableHead>
      <MuiTableBody>
        {Array.isArray(soilRequest) &&
          soilRequest?.map((req) => (
            <TableRow key={req.id}>
              <TableCell>
                <Checkbox
                  value={req.id}
                  checked={selectSoilId?.includes(req.id)}
                  onChange={CheckboxHandler}
                />
              </TableCell>
              <TableCell>
                <Typography
                  component={NavLink}
                  to={`show/${req.id}`}
                  variant="body2"
                  color={"primary.main"}
                  fontWeight={700}
                >
                  {req?.serial_number ? req?.serial_number : ""}
                </Typography>
              </TableCell>
              <TableCell>
                {req?.client?.name ? req?.client?.name : ""}
              </TableCell>
              <TableCell>
                {formatDate(req?.created_at) ? formatDate(req?.created_at) : ""}
              </TableCell>
              <TableCell>
                {req?.soil_order?.type_order?.name
                  ? req?.soil_order?.type_order?.name
                  : ""}
              </TableCell>
              <TableCell>
                {req?.soil_order?.license?.name
                  ? req?.soil_order?.license?.name
                  : ""}
              </TableCell>
              <TableCell>
                {req?.soil_order?.status_name
                  ? req?.soil_order?.status_name
                  : ""}
              </TableCell>
              <TableCell>
                {req?.soil_order?.soil_floor?.number_floors
                  ? req?.soil_order?.soil_floor?.number_floors
                  : ""}
              </TableCell>
              <TableCell>
                {req?.soil_order?.number_bodies
                  ? req?.soil_order?.number_bodies
                  : ""}
              </TableCell>
              <TableCell>
                {req?.soil_order?.depth ? req?.soil_order?.depth : ""}
              </TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  component={NavLink}
                  to={`show/${req.id}`}
                >
                  <RemoveRedEyeIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </MuiTableBody>
    </>
  );
}

export default TableContent;
