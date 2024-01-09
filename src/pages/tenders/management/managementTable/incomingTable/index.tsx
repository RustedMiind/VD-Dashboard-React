import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import StatusChip from "../../../../../components/StatusChip";

export default function IncomingTable() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>الرقم المرجعي للمنافسة</TableCell>
          <TableCell>اسم المنافسة</TableCell>
          <TableCell>حالة الترسية</TableCell>
          <TableCell>عرض</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>
          <StatusChip label="جاري" color="success" />
        </TableCell>
        <TableCell>
          <IconButton size="small">
            <VisibilityOutlinedIcon />
          </IconButton>
        </TableCell>
      </TableBody>
    </Table>
  );
}
