import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Checkbox,
  Stack,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import TableHeader from "./topTable/TableHeader";
import { useContext } from "react";
import { ContractContext } from "../Context/Store";
import { ContractsContext } from "../Context/ContractsContext";
import { NavLink } from "react-router-dom";
import GenerateStatusChip from "./StatusChips";


function ContractsTable(props: PropsType) {
  const selectedIdsContext = useContext(ContractContext);
  const { contracts, limit, setLimit } = useContext(ContractsContext);
  const toView = typeof contracts === "object" ? contracts?.data : undefined;

  function CheckboxHandler(id: number) {
    return function (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
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
      <TableContainer>
        <Table>
          <TableHeader value={props.value} />
          {props.value === 0 ? (
            <TableBody>
              {toView?.map((request) => {
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
                    <TableCell>{request.type?.name}</TableCell>
                    <TableCell>{request.client?.name}</TableCell>
                    <TableCell>{request.branch.name}</TableCell>
                    <TableCell>{request.client?.phone}</TableCell>
                    <TableCell>{request.period}</TableCell>
                    <TableCell>{request.end_date_period}</TableCell>
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
          ) : (
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
                          onChange={CheckboxHandler(request.id)}
                        />
                      </TableCell>
                      <TableCell>{request.code}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>{request.type?.name}</TableCell>
                      <TableCell>{request.client?.name}</TableCell>
                      <TableCell>{request.branch.name}</TableCell>
                      <TableCell>{request.management.name}</TableCell>
                      <TableCell>
                        <GenerateStatusChip
                          statusId={request.status_id}
                          contractStatus={request.Contract_status}
                        />
                      </TableCell>
                      <TableCell>{request.status_id}</TableCell>
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
          )}
        </Table>
      </TableContainer>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ position: "absolute", top: "100%", pb: 3 }}
      >
        <Typography> عدد العرض في الصفحة</Typography>
        <TextField
          size="small"
          value={limit}
          select
          onChange={(e) => {
            setLimit && setLimit(parseInt(e.target.value) || -1);
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={250}>250</MenuItem>
          <MenuItem value={500}>500</MenuItem>
          <MenuItem value={1000}>1000</MenuItem>
          <MenuItem value={10000}>10000</MenuItem>
          <MenuItem value={-1}>عرض الكل</MenuItem>
        </TextField>
      </Stack>
    </Stack>
  );
}

type PropsType = {
  value?: number;
  secondTabValue?: number;
};

export default ContractsTable;
