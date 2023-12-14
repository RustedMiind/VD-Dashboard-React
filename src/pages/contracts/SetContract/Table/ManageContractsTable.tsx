import {
  Checkbox,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import GenerateStatusChip from "../Components/StatusChips";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
import { ChangeEvent, useContext } from "react";
import { ContractContext } from "../../Context/Store";
import { ContractsContext } from "../../Context/ContractsContext";

function ManageContractTable(props: PropsType) {
  const selectedIdsContext = useContext(ContractContext);
  const { contracts } = useContext(ContractsContext);
  const toView = typeof contracts === "object" ? contracts?.data : undefined;
  return (
    <TableBody>
      {props.secondTabValue === 0 &&
        toView?.map((request) => {
          return (
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectedIdsContext?.selectedIds?.includes(
                    request.id
                  )}
                  value={request.id}
                  onChange={props.CheckboxHandler(request.id)}
                />
              </TableCell>
              <TableCell>{request.code}</TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell>{request.type?.name}</TableCell>
              <TableCell>{request.client?.name}</TableCell>
              <TableCell>{request.branch.name}</TableCell>
              <TableCell>{request.management?.name}</TableCell>
              <TableCell>
                <GenerateStatusChip
                  statusId={request.status_id}
                  contractStatus={request.Contract_status}
                />
              </TableCell>
              <TableCell>{request.last_status}</TableCell>
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
      {/* {props.secondTabValue === 1 && <ContractsNotFound />} */}
    </TableBody>
  );
}

export default ManageContractTable;

type PropsType = {
  secondTabValue: 0 | 1 | undefined;
  CheckboxHandler: (
    id: number
  ) =>
    | ((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
};
