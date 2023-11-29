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
import IconButton from "@mui/material/IconButton";
import TableHeader from "./topTable/TableHeader";
import { useContext, useEffect, useState } from "react";
import { ContractContext } from "../Context/Store";
import { ContractsContext } from "../Context/ContractsContext";
import { NavLink } from "react-router-dom";

function ContractsTable({ value }: PropsType) {
  const selectedIdsContext = useContext(ContractContext);
  const { contracts } = useContext(ContractsContext);
  function CheckboxHandler(id: number) {
    return function (e: any, checked: boolean) {
      const idIndex = selectedIdsContext?.selectedIds?.findIndex(
        (itemId) => itemId === id
      );
      const idFound = typeof idIndex === "number" && idIndex >= 0;

      if (checked) {
        selectedIdsContext?.selectedIds &&
          selectedIdsContext?.setSelectedIds([
            ...selectedIdsContext?.selectedIds,
            id,
          ]);
      } else if (
        selectedIdsContext?.selectedIds &&
        idFound &&
        typeof idIndex === "number"
      ) {
        const instance = [...selectedIdsContext?.selectedIds];
        instance.splice(idIndex, 1);
        selectedIdsContext?.setSelectedIds(instance);
      }
    };
  }

  return (
    <Stack>
      <TableContainer sx={{ height: 500 }}>
        <Table aria-label="simple table" stickyHeader>
          <TableHeader value={value} />
          <TableBody>
            {contracts?.data?.map((request) => {
              return (
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={selectedIdsContext?.selectedIds?.includes(
                        request.id
                      )}
                      value={request.id}
                      onChange={CheckboxHandler(request.id)}
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
                    <IconButton
                      color="primary"
                      aria-label="add to shopping cart"
                      component={NavLink}
                      to={`${request.id}/edit`}
                      size="small"
                    >
                      <SettingsIcon />
                    </IconButton>
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
  value: number;
};

export default ContractsTable;
