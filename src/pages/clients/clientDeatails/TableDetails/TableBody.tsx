import { Table, TableBody, TableCell, TableContainer } from "@mui/material";
import { Checkbox, Stack, TableHead, TableRow } from "@mui/material";

export default function DataTable() {
  return (
    <Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>رقم العقد</TableCell>
              <TableCell>نوع العقد</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell>نسبة الانجاز</TableCell>
              <TableCell>موقع المشروع</TableCell>
              <TableCell>الفرع</TableCell>
              <TableCell>الوقت المتبقي</TableCell>
              <TableCell>المهندس</TableCell>
              <TableCell>الملف</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
