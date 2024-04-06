import {
  Checkbox,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import GenerateStatusChip from "../Components/StatusChips";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, NavLink } from "react-router-dom";
import { ChangeEvent, useContext } from "react";
import { ContractContext } from "../../Context/Store";
import { ContractsContext } from "../../Context/ContractsContext";

function ManageContractTable(props: PropsType) {
  const selectedIdsContext = useContext(ContractContext);
  const { contracts } = useContext(ContractsContext);
  const toView = typeof contracts === "object" ? contracts?.data : undefined;
  console.log("ASD 2::", toView);
  return (
    <TableBody>
      {props.secondTabValue === 0 &&
        toView?.map((request) => {
          return (
            <TableRow key={`TR_${request.id}`}>
              <TableCell>
                <Checkbox
                  checked={selectedIdsContext?.selectedIds?.includes(
                    request.id
                  )}
                  value={request.id}
                  onChange={props.CheckboxHandler(request.id)}
                />
              </TableCell>
              <Typography
                component={NavLink}
                to={`details/${request.id}`}
                variant="body2"
                color={"primary.main"}
                fontWeight={700}
              >
                {request.code}
              </Typography>
              <TableCell>{request.date}</TableCell>
              <TableCell>{request.type?.name}</TableCell>
              <TableCell>{request.client?.name}</TableCell>
              <TableCell>{request.branch?.name}</TableCell>
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
