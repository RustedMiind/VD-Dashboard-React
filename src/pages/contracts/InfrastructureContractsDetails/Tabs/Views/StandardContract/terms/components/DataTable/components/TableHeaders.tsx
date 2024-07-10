import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";

export default function TableHeaders() {
  return (
    <TableHead>
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
        <TableCell>المهندس المسؤول</TableCell>
      </TableRow>
    </TableHead>
  );
}
