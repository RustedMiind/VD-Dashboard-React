import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Checkbox,
  Stack,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TableHeader from "./TableHeader";
import { ClientDetailsType } from "../../../../types/Clients";
import StatusChip from "../../../../components/StatusChip";

function TableDetails({ ClientData }: PropsType) {
  return (
    <Stack>
      <TableHeader />
      {/* Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>رقم العقد</TableCell>
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
              {ClientData?.data.map((item) => {
                return (
                  <>
                    <TableRow>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>{item.code}</TableCell>
                      <TableCell>
                        <StatusChip
                          color="success"
                          label={item.Contract_status}
                        />
                      </TableCell>
                      <TableCell>----</TableCell>
                      <TableCell>----</TableCell>
                      <TableCell>{item.branch.name}</TableCell>
                      <TableCell>----</TableCell>
                      <TableCell>{item.employee?.name}</TableCell>
                      <TableCell>-----</TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
}
type PropsType = {
  ClientData: ClientDetailsType | null;
};
export default TableDetails;
