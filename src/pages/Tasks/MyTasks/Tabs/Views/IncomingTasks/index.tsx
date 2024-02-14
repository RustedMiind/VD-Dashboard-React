import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext } from "react";
import { tasksContext } from "../../../context";
import CommonTableHead from "../CommonTableHead";
import LoadingTable from "../../../../../../components/LoadingTable";

function IncomingTasks() {
  const { incomingTasks } = useContext(tasksContext);

  const { status } = useContext(tasksContext);

  return (
    <Stack>
      {status === "loading" && <LoadingTable height={600} />}
      {status === "none" && (
        <TableContainer component={Paper} sx={{ minHeight: 600 }}>
          <Table stickyHeader sx={{ maxHeight: 600 }}>
            <CommonTableHead />
            <TableBody>
              <TableRow>
                <TableCell>رقم الوارد</TableCell>
                <TableCell>نوع الخدمة</TableCell>
                <TableCell>الرقم المرجعي</TableCell>
                <TableCell>رقم العميل</TableCell>
                <TableCell>اسم العميل</TableCell>
                <TableCell>تاريخ الورود</TableCell>
                <TableCell>تاريخ الانتهاء</TableCell>
                <TableCell>الحالة السابقة</TableCell>
                <TableCell>اسم المسؤول</TableCell>
                <TableCell>عرض</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}

export default IncomingTasks;
