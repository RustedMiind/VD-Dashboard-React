import {
  IconButton,
  TableBody as MuiTableBody,
  TableCell,
  TableRow,
  Checkbox,
  TableHead as MuiTableHead,
  Paper,
  Table,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useContext } from "react";
import { TableContext } from "../TableContext";
import { formatDate } from "../../../../methods";

function TableContent() {
  const { soilRequest } = useContext(TableContext);
  console.log(soilRequest);

  return (
    <>
      <MuiTableHead>
        <TableRow>
          <TableCell>
            <Checkbox />
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
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{req?.id}</TableCell>
              <TableCell>{req?.client?.name}</TableCell>
              <TableCell>{formatDate(req?.created_at)}</TableCell>
              <TableCell>{req?.soil_order?.type_order?.name}</TableCell>
              <TableCell>{req?.soil_order?.license?.name}</TableCell>
              <TableCell>{req?.soil_order?.status_name}</TableCell>
              <TableCell>-</TableCell>
              <TableCell>{req?.soil_order?.number_bodies}</TableCell>
              <TableCell>{req?.soil_order?.depth}</TableCell>
              <TableCell>
                <IconButton color="primary">
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
