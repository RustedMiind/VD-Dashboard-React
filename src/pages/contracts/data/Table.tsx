import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Checkbox,
  Stack,
  Button,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { EmployeeRequest } from "../../../types";
import { requestTypes } from "./RequestTypes";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import { Api } from "../../../constants";
import { useEffect } from "react";

function ContractsTable(props: PropsType) {
  //   useEffect(() => {
  //     axios.get(Api('employee/client'))
  //     .then(({data}))=>{
  //       console.log(data);

  //  } }, [])

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
                نوع العقد <Button startIcon={<FilterListIcon />} />
              </TableCell>
              <TableCell>اسم العميل</TableCell>
              <TableCell>تليفون العميل</TableCell>
              <TableCell>مدة العقد</TableCell>
              <TableCell>تاريخ انتهاء العقد</TableCell>
              <TableCell>المهندس المسؤول</TableCell>
              <TableCell></TableCell>
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
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>1234568</TableCell>
                  <TableCell>+966 543 23456 53</TableCell>
                  <TableCell>youremail@domain.com</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
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
  requests: EmployeeRequest[];
  selectedData: number[];
  setSelectedData: React.Dispatch<React.SetStateAction<number[]>>;
};

export default ContractsTable;
