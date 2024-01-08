import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function CurrantTable() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell> الرقم المرجعي للمنافسة</TableCell>
          <TableCell>تاريخ الورود</TableCell>
          <TableCell>اسم المنافسة</TableCell>
          <TableCell>مدة العقد</TableCell>
          <TableCell> تاريخ الانتهاء </TableCell>
          <TableCell>عرض</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
      </TableBody>
    </Table>
  );
}
