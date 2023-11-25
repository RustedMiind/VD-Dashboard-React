import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Checkbox,
  Stack,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { EmployeeRequest } from "../../../types";
import SettingsIcon from "@mui/icons-material/Settings";
import { ContractRequest } from "../../../types/ContractRequest";

function ContractsTable({ requests }: PropsType) {
  return (
    <Stack>
      <TableContainer sx={{ height: 500 }}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>رقم العقد</TableCell>
              <TableCell>
                نوع العقد{" "}
                <IconButton aria-label="SwapVertIcon" color="primary">
                  <SwapVertIcon />
                </IconButton>
              </TableCell>
              <TableCell>اسم العميل</TableCell>
              <TableCell>اسم الفرع</TableCell>
              <TableCell>تليفون العميل</TableCell>
              <TableCell>مدة العقد</TableCell>
              <TableCell>تاريخ انتهاء العقد</TableCell>
              <TableCell>المهندس المسؤول</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests?.map((request) => {
              return (
                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{request.code}</TableCell>
                  <TableCell>{request.type.name}</TableCell>
                  <TableCell>{request.client.name}</TableCell>
                  <TableCell>{request.branch.name}</TableCell>
                  <TableCell>{request.employee.phone}</TableCell>
                  <TableCell>{request.period}</TableCell>
                  <TableCell>{request.end_date_period}</TableCell>
                  <TableCell>{request.employee.name}</TableCell>
                  <TableCell>
                    <SettingsIcon />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

type PropsType = {
  requests: ContractRequest[] | null;
};

export default ContractsTable;
