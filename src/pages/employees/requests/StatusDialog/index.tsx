import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { EmployeeRequest } from "../../../../types";

function StatusDialog(props: PropsType) {
  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
      <DialogTitle>حالة الطلب</DialogTitle>
      <DialogContent>
        <Paper elevation={3} sx={{ bgcolor: "Background" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>اسم الموظف</TableCell>
                  <TableCell>تاريخ الورود</TableCell>
                  <TableCell>تاريخ الانتهاء</TableCell>
                  <TableCell>القسم الوظيفي</TableCell>
                  <TableCell>حالة الطلب</TableCell>
                  <TableCell>الملاحظات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.request?.steps_of_approval?.map((step) => (
                  <TableRow>
                    <TableCell>{step.employee_id}</TableCell>
                    <TableCell>تاريخ الورود</TableCell>
                    <TableCell>تاريخ الانتهاء</TableCell>
                    <TableCell>القسم الوظيفي</TableCell>
                    <TableCell>حالة الطلب</TableCell>
                    <TableCell>الملاحظات</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" type="button" onClick={props.onClose}>
          الغاء
        </Button>
        <Button variant="contained" type="submit" autoFocus>
          ارسال
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  open: boolean;
  request: EmployeeRequest | null;
  onClose: () => void;
};

export default StatusDialog;
