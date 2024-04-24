import { TableCell, TableHead, TableRow } from "@mui/material";

export default function AttachmentsTableHeaders() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>نوع المرفق</TableCell>
        <TableCell>ملف المرفق</TableCell>
        <TableCell>وصف المرفق</TableCell>
        <TableCell>الاعدادات</TableCell>
      </TableRow>
    </TableHead>
  );
}
