import {
  Dialog,
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
  Box,
} from "@mui/material";
import { EmployeeRequest } from "../../../../types";
import { formatDate } from "../../../../methods";
import NonRoundedChip from "../../../../components/NonRoundedChip";

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
                {props.request?.checkedSteps?.map((step) => {
                  const note = step.model_details?.note;
                  return (
                    <TableRow key={step.id}>
                      <TableCell>{step.employeeName}</TableCell>
                      <TableCell>
                        {formatDate(props.request?.created_at)}
                      </TableCell>
                      <TableCell>
                        {formatDate(step.model_details?.updated_at)}
                      </TableCell>
                      <TableCell>{step.departmentName}</TableCell>
                      <TableCell>
                        {generateChip(step.model_details?.status)}
                      </TableCell>
                      <TableCell>
                        <Box
                          component="span"
                          sx={{
                            display: "inline-block",
                            maxWidth: 150,
                            overflow: "hidden",
                          }}
                        >
                          {note || "..."}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {/* Next Step */}
                {props.request?.nextStep && (
                  <TableRow>
                    <TableCell>{props.request.nextStep.employeeName}</TableCell>
                    <TableCell>
                      {formatDate(props.request?.created_at)}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      {props.request.nextStep.departmentName}
                    </TableCell>
                    <TableCell> {generateChip(-1)} </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
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

  function generateChip(value?: number): JSX.Element {
    const variant = "outlined";
    let chip: JSX.Element = <></>;

    switch (value) {
      case -1:
        chip = (
          <NonRoundedChip
            color="primary"
            variant={variant}
            label="تحت الاجراء"
          />
        );

        break;
      case 0:
        chip = <NonRoundedChip color="error" variant={variant} label="مرفوض" />;
        break;
      case 1:
        chip = (
          <NonRoundedChip color="success" variant={variant} label="مقبول" />
        );
        break;
      case 2:
        chip = (
          <NonRoundedChip color="success" variant={variant} label="معتمد" />
        );
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
