import { Checkbox, IconButton, Typography } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableBody, TableRow } from "@mui/material";
import { ChangeEvent, useContext } from "react";
import { ContractContext } from "../../Context/Store";
import { ContractsContext } from "../../Context/ContractsContext";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, NavLink } from "react-router-dom";

function ContractsDataTable(props: PropsType) {
  const selectedIdsContext = useContext(ContractContext);
  const { contracts } = useContext(ContractsContext);
  const toView = typeof contracts === "object" ? contracts?.data : undefined;
  console.log("ASD 1::", toView);
  return (
    <TableBody>
      {toView?.map((request) => {
        return (
          <TableRow>
            <TableCell>
              <Checkbox
                checked={selectedIdsContext?.selectedIds?.includes(request.id)}
                value={request.id}
                onChange={props.CheckboxHandler(request.id)}
              />
            </TableCell>
            <TableCell>
              <TableCell>
                <Typography
                  component={NavLink}
                  to={`details/${request.id}`}
                  variant="body2"
                  color={"primary.main"}
                  fontWeight={700}
                >
                  {request.code}
                </Typography>
              </TableCell>
            </TableCell>
            <TableCell>{request.type?.name}</TableCell>
            <TableCell>{request.client?.name}</TableCell>
            <TableCell>{request.branch?.name}</TableCell>
            <TableCell>{request.client?.phone}</TableCell>
            <TableCell>{request.period} يوم</TableCell>
            <TableCell>{request.end_date_period} يوم</TableCell>
            <TableCell
              sx={{
                maxWidth: "50px",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {request.employee?.name}
            </TableCell>
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
  );
}

export default ContractsDataTable;

type PropsType = {
  CheckboxHandler: (
    id: number
  ) =>
    | ((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
};
