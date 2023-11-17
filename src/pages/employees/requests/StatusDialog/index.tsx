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
  Chip,
} from "@mui/material";
import { EmployeeRequest } from "../../../../types";
import { formatDate } from "../../../../methods";

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
                  <TableCell>تاريخ الصدور</TableCell>
                  <TableCell>القسم الوظيفي</TableCell>
                  <TableCell>حالة الطلب</TableCell>
                  <TableCell>الملاحظات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.request?.checked_steps?.map((step) => (
                  <TableRow key={step.id}>
                    <TableCell>{step.employeeName}</TableCell>
                    <TableCell>{formatDate(step.created_at)}</TableCell>
                    <TableCell>
                      {formatDate(step.model_details?.created_at)}
                    </TableCell>
                    <TableCell>{step.departmentName}</TableCell>
                    <TableCell>{generateChip(step.action)}</TableCell>
                    <TableCell>...</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </DialogContent>
      {/* <DialogActions>
        <Button variant="outlined" type="button" onClick={props.onClose}>
          الغاء
        </Button>
        <Button variant="contained" type="submit" autoFocus>
          ارسال
        </Button>
      </DialogActions> */}
    </Dialog>
  );

  function generateChip(value: number): JSX.Element {
    const variant = "outlined";
    let chip: JSX.Element = <></>;

    switch (value) {
      case -1:
        chip = <Chip color="primary" variant={variant} label="تحت الاجراء" />;

        break;
      case 0:
        chip = <Chip color="error" variant={variant} label="مرفوض" />;
        break;
      case 1:
        chip = <Chip color="success" variant={variant} label="مقبول" />;
        break;

      default:
        break;
    }

    return chip;
  }
}

type PropsType = {
  open: boolean;
  request: EmployeeRequest | null;
  onClose: () => void;
};

export default StatusDialog;
