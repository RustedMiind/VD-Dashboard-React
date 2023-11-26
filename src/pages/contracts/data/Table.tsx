import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Checkbox,
  Stack,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { ContractRequest } from "../../../types/ContractRequest";
import TableHeader from "./topTable/TableHeader";

function ContractsTable({ requests, value }: PropsType) {
  console.log(value);

  return (
    <Stack>
      <TableContainer sx={{ height: 500 }}>
        <Table aria-label="simple table" stickyHeader>
          <TableHeader value={value} />
          <TableBody>
            {requests?.map((request) => {
              return (
                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{request.code}</TableCell>
                  <TableCell>
                    {value === 0 ? request.type.name : request.date}
                  </TableCell>
                  <TableCell>
                    {value === 0 ? request.client?.name : request.date}
                  </TableCell>
                  <TableCell></TableCell>
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
  value: number;
};

export default ContractsTable;
