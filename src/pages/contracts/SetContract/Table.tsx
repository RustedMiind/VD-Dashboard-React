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
import { Contract } from "../../../types";
import TableHeader from "./topTable/TableHeader";
import { useContext, useEffect, useState } from "react";
import { ContractContext } from "../Context/Store";
import { IdListType } from "../../clients/data/Table";

function ContractsTable({ requests, value }: PropsType) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const tableContext = useContext(ContractContext);
  const chekedArray: number[] = selectedItems;
  console.log(chekedArray);
  useEffect(() => {
    console.log(chekedArray);

    tableContext?.setIndex(chekedArray);
  }, [selectedItems]);

  function CheckboxHandler(e: any) {
    let isSelect = e.target.checked;
    let value = parseInt(e.target.value);
    if (isSelect) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems((prevData) => {
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  }
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
                    <Checkbox
                      // disabled={request.Contract_status === "منتهي"}
                      checked={selectedItems.includes(request.id)}
                      value={request.id}
                      onChange={CheckboxHandler}
                    />
                  </TableCell>
                  <TableCell>{request.code}</TableCell>
                  <TableCell>{request.type.name}</TableCell>
                  <TableCell>{request.client?.name}</TableCell>
                  <TableCell>{request.branch.name}</TableCell>
                  <TableCell>{request.client?.phone}</TableCell>
                  <TableCell>{request.period}</TableCell>
                  <TableCell>{request.end_date_period}</TableCell>
                  <TableCell>{request.employee?.name}</TableCell>
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
  requests: Contract[] | null;
  value: number;
};

export default ContractsTable;
