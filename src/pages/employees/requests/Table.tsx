import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Chip,
} from "@mui/material";
import { EmployeeRequest } from "../../../types";
import { formatDate } from "../../../methods";

/*
-1 pending
1 active
0 rejected
2 rejected
*/

function generateChip(value: number): JSX.Element {
  let chip: JSX.Element = (
    <Chip color="primary" variant="outlined" label="تحت المراجعة" />
  );

  switch (value) {
    // case -1:
    //   chip = <Chip color="primary" label="تحت المراجعة" />
    //   break;
    case 0:
      chip = <Chip color="error" variant="outlined" label="مرفوض" />;
      break;
    case 1:
      chip = <Chip color="success" variant="outlined" label="معتمد" />;
      break;

    default:
      break;
  }

  return chip;
}

function EmployeesRequestsTable(props: PropsType) {
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
          {props.requests.map((request, index) => (
            <TableRow>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.employee.name}</TableCell>
              <TableCell>{formatDate(request.created_at)}</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>{generateChip(request.requestable_id)}</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

type PropsType = {
  requests: EmployeeRequest[];
};

export default EmployeesRequestsTable;
