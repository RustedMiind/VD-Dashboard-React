import { TableCell, TableHead, TableRow } from "@mui/material";

export default function PathesTablesHeaders() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>كود المسار</TableCell>
        <TableCell>رقم امر العمل</TableCell>
        <TableCell>البلدية</TableCell>
        <TableCell>الحي</TableCell>
        <TableCell>طول المسار</TableCell>
        <TableCell>التفاصيل</TableCell>
      </TableRow>
    </TableHead>
  );
}
