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
import SettingsIcon from "@mui/icons-material/Settings";

function TableContent() {
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
        <TableRow>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
          <TableCell>
            <IconButton color="primary">
              <SettingsIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </MuiTableBody>
    </>
  );
}

export default TableContent;