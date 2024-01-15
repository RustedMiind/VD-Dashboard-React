import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import StatusChip from "../../../components/StatusChip";
export default function ThirdDailog() {
  return (
    <Dialog open={true} onClose={() => {}} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "800" }}>
        حالة العرض
      </DialogTitle>
      <DialogContent>
        <Paper elevation={3} sx={{ bgcolor: "Background" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>المهندس المسؤول </TableCell>
                  <TableCell>تاريخ التقديم</TableCell>
                  <TableCell>تاريخ الانتهاء</TableCell>
                  <TableCell> الحالة</TableCell>
                  <TableCell>الملاحظات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <StatusChip label={"جاري"} color="success" />
                  </TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </DialogContent>
    </Dialog>
  );
}
