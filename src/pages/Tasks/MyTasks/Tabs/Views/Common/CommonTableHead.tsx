import {
  Paper,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function CommonTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>رقم الوارد</TableCell>
        <TableCell>نوع الخدمة</TableCell>
        <TableCell>الرقم المرجعي</TableCell>
        <TableCell>طالب الخدمة</TableCell>
        <TableCell>تاريخ الورود</TableCell>
        <TableCell>تاريخ التقديم المطلوب</TableCell>
        <TableCell>الحالة السابقة</TableCell>
        <TableCell>اسم المسؤول</TableCell>
        <TableCell>عرض</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default CommonTableHead;
