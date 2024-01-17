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
import { TypeDisplayData, generateTenderItemStatus } from "../TableBody";
import { formatDate } from "../../../../../methods";

export default function DialogData({ open, setOpen, displayData }: PropsType) {
  function handleClose() {
    setOpen(!open);
  }
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
                  <TableCell>{displayData.eng}</TableCell>
                  <TableCell>{displayData.startDate}</TableCell>
                  <TableCell>{formatDate(displayData.endDate || "")}</TableCell>
                  <TableCell>{displayData.status}</TableCell>
                  <TableCell>{displayData.note}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </DialogContent>
    </Dialog>
  );
}

type PropsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayData: TypeDisplayData;
};
