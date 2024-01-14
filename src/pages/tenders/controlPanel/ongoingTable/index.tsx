import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
export default function OngoingTable() {
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
        <TableCell>
          <IconButton aria-label="delete" size="small">
            <VisibilityOutlinedIcon />
          </IconButton>
        </TableCell>
      </TableBody>
    </Table>
  );
}
