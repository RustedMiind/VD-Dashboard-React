import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Chip,
} from "@mui/material";

const temp = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

function EmployeesRequestsTable() {
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
          {temp.map((row, index) => (
            <TableRow>
              <TableCell>{index}</TableCell>
              <TableCell>علي سليمان</TableCell>
              <TableCell>12/12/2012</TableCell>
              <TableCell>اداري</TableCell>
              <TableCell>في ميديا</TableCell>
              <TableCell>
                <Chip
                  color="success"
                  //
                  variant="outlined"
                  label="نشط"
                />
              </TableCell>
              <TableCell>هذا النص هو مثال لنص يمكن..</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeesRequestsTable;
