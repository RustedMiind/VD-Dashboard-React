import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Chip,
  Typography,
} from "@mui/material";
import { EmployeeRequest } from "../../../types";
import { formatDate } from "../../../methods";
import { requestTypes } from "./RequestTypes";

/*
-1 pending
1 active
0 rejected
*/

function EmployeesRequestsTable(props: PropsType) {
  function generateChip(value: number, request: EmployeeRequest): JSX.Element {
    const variant = "outlined";
    const HAS_ACCESS = request.nextStep && request.nextStep.hasAccess;
    let chip: JSX.Element = <></>;

    switch (value) {
      case -1:
        if (HAS_ACCESS) {
          chip = (
            <Chip
              onClick={props.openModal(request)}
              color="primary"
              variant="filled"
              label="اتخاذ الاجراء"
            />
          );
        } else {
          chip = (
            <Chip color="primary" variant={variant} label="تحت المراجعة" />
          );
        }
        break;
      case 0:
        chip = <Chip color="error" variant={variant} label="مرفوض" />;
        break;
      case 1:
        chip = <Chip color="success" variant={variant} label="معتمد" />;
        break;

      default:
        break;
    }

    return chip;
  }

  return (
    <TableContainer sx={{ height: 500 }}>
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>رقم الطلب</TableCell>
            <TableCell>اسم الموظف</TableCell>
            <TableCell>تاريخ الورود</TableCell>
            <TableCell>نوع الطلب</TableCell>
            <TableCell>القسم</TableCell>
            <TableCell>حالة الطلب</TableCell>
            <TableCell>الملاحظات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.requests.map((request, index) => {
            const requsetType = requestTypes.find((x) =>
              request.requestable_type
                .toLowerCase()
                .includes(x.prefix.toLowerCase())
            )?.name;

            return (
              <TableRow>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.employee.name}</TableCell>
                <TableCell>{formatDate(request.created_at)}</TableCell>
                <TableCell>{requsetType}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{generateChip(request.status, request)}</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {props.requests.length === 0 && (
        <Typography variant="h5" textAlign="center" p={2} py={4}>
          لم يتم ايجاد اي من الطلبات المطلوبة
        </Typography>
      )}
    </TableContainer>
  );
}

type PropsType = {
  requests: EmployeeRequest[];
  openModal: (r: EmployeeRequest) => () => void;
};

export default EmployeesRequestsTable;
