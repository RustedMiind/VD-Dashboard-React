import { TableCell, TableHead, TableRow } from "@mui/material";

export default function TableHeaders() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>اسم العامل</TableCell>
        <TableCell>رقم الجوال</TableCell>
        <TableCell>رقم الترخيص</TableCell>
        <TableCell>انتهاء صلاحية الترخيص</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}
