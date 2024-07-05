import { TableCell, TableHead, TableRow } from "@mui/material";

export default function TableHeaders() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>اسم المقاول</TableCell>
        <TableCell>رقم الجوال</TableCell>
        <TableCell>السجل التجاري</TableCell>
        <TableCell>البريد الالكتروني</TableCell>
        <TableCell>مدير المشروع</TableCell>
        <TableCell>رقم الجوال مدير المشروع</TableCell>
        <TableCell>المرفقات</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}
