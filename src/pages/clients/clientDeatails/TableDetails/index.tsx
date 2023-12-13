import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Checkbox,
  Stack,
  TableHead,
  TableRow,
} from "@mui/material";
import TableHeader from "./TableHeader";
import { ClientDetailsType } from "../../../../types/Clients";

function TableDetails(props: PropsType) {
  return (
    <Stack>
      <TableHeader />
      {/* Table */}
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
type PropsType = {
  ClientData: ClientDetailsType | null;
};
export default TableDetails;
