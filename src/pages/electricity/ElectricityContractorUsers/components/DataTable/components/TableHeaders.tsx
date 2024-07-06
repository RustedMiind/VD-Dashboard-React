import { TableCell, TableHead, TableRow } from "@mui/material";

export default function TableHeaders() {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>الاسم</TableCell>
          <TableCell>رقم الجوال</TableCell>
          <TableCell>اسم المستخدم</TableCell>
        </TableRow>
      </TableHead>
    </>
  );
}
