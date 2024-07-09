import { Checkbox, TableCell, TableRow } from "@mui/material";

function TableHeader() {
  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell>رقم امر العمل</TableCell>
      <TableCell>اللوكيشن</TableCell>
      <TableCell>الموقع</TableCell>
      <TableCell>اسم المقاول </TableCell>
      <TableCell>رمز العمل</TableCell>
      <TableCell>وصف امر العمل</TableCell>
      <TableCell>المندوب</TableCell>
      <TableCell>رقم جوال المندوب</TableCell>
      <TableCell>فترة التواجد</TableCell>
    </TableRow>
  );
}

export default TableHeader;
