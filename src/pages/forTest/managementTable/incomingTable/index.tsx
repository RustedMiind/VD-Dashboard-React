import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function IncomingTable() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell width={"150px"}>الرقم المرجعي للمنافسة</TableCell>
          <TableCell>اسم المنافسة</TableCell>
          <TableCell>حالة الترسية</TableCell>
          <TableCell>عرض</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
      </TableBody>
    </Table>
  );
}
