import { TableCell, TableHead, TableRow } from "@mui/material";

export default function TableHeaders() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>كود البند</TableCell>
        <TableCell>اسم المرفق</TableCell>
        <TableCell>رقم المرفق</TableCell>
        <TableCell>نوع المرفق</TableCell>
        <TableCell>ملف المرفق</TableCell>
        <TableCell>الاعدادات</TableCell>
      </TableRow>
    </TableHead>
  );
}
