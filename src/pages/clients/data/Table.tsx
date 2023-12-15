import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  Checkbox,
  Stack,
  Button,
  Typography,
  TextField,
  TableCell,
  IconButton,
} from "@mui/material";
import { ClientRequest } from "../../../types";
import SettingsIcon from "@mui/icons-material/Settings";
import { useContext, useState, useEffect, useRef } from "react";
import TableHeader from "./TableHeader/TableHeader";
import { TableContext } from "../Context/Store";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";
import NotFound from "../../../components/NotFound";
import { MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import StatusChip from "../../../components/StatusChip";
import { NavLink } from "react-router-dom";

export const NotPrintableTableCell = styled(TableCell)({
  "@media print": {
    display: "none",
  },
});
export type IdListType = {
  id: number[];
};

function ClientRequestsTable(props: PropsType) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const tableContext = useContext(TableContext);
  const chekedArray: IdListType = {
    id: [],
  };
  const tableRef: React.RefObject<HTMLTableElement> =
    useRef<HTMLTableElement>(null);
  const handlePrint = () => {
    if (tableRef.current) {
      window.print();
    }
  };
  chekedArray.id = selectedItems;
  useEffect(() => {
    tableContext?.setIndex(chekedArray);
  }, [selectedItems]);

  function CheckboxHandler(e: React.ChangeEvent<HTMLInputElement>) {
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
  const isAllSelected =
    props.requests?.filter((req) => {
      return req.contracts_count === 0;
    }).length === selectedItems.length && selectedItems.length;
  function checkAllHandler(checked: boolean) {
    const allChecked: number[] = checked
      ? (props.requests
          ?.map((request) => request.contracts_count === 0 && request.id)
          .filter((id) => typeof id === "number") as number[])
      : [];
    setSelectedItems(allChecked);
  }
  return (
    <>
      <TableContainer>
        <Table ref={tableRef}>
          {props.requests?.length !== 0 ? (
            <TableHeader
              checkAllHandler={checkAllHandler}
              requests={props.requests}
              isAllSelected={!!isAllSelected}
            />
          ) : (
            <NotFound title="لا يوجد عملاء" />
          )}
          {props.requests && (
            <TableBody>
              {props.requests?.map((client, index) => {
                return (
                  <TableRow key={index}>
                    <NotPrintableTableCell>
                      <Checkbox
                        disabled={client.contracts_count !== 0}
                        checked={selectedItems.includes(client.id)}
                        value={client.id}
                        onChange={CheckboxHandler}
                      />
                    </NotPrintableTableCell>

                    <TableCell>
                      <Typography
                        variant="body1"
                        color={"secondary.main"}
                        sx={{
                          textDecoration: "underline",
                          maxWidth: "100px",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                        component={NavLink}
                        to={`details/${client.id}`}
                      >
                        {client.name}
                      </Typography>
                    </TableCell>

                    <TableCell>{client.phone}</TableCell>

                    <TableCell>{client.email} </TableCell>

                    <TableCell>
                      {client.register_number || client.card_id}
                    </TableCell>
                    <TableCell>{client.branch?.name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {client.contract_status_id === 2 ? (
                        <StatusChip color="error" label="منتهي" />
                      ) : client.contract_status_id === 0 ? (
                        <StatusChip color="primary" label="لا يوجد عقود" />
                      ) : (
                        <StatusChip color="success" label="جاري العمل" />
                      )}
                    </TableCell>
                    <TableCell>
                      {client.agent_name ? client.agent_name : "-"}
                    </TableCell>
                    <NotPrintableTableCell>
                      <IconButton>
                        <SettingsIcon />
                      </IconButton>
                    </NotPrintableTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Stack
        p={2}
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          position: "absolute",
          left: "250px",
        }}
      >
        <Typography> عدد العرض في الصفحة</Typography>
        <TextField
          size="small"
          value={props.limit}
          select
          onChange={(e) => {
            props.setLimit(e.target.value);
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={250}>250</MenuItem>
          <MenuItem value={500}>500</MenuItem>
          <MenuItem value={1000}>1000</MenuItem>
          <MenuItem value={10000}>10000</MenuItem>
          <MenuItem value={"-1"}>عرض الكل</MenuItem>
        </TextField>
      </Stack>
      {props.limit !== "-1" && (
        <Stack
          p={2}
          sx={{
            position: "absolute",
            right: "20px",
          }}
        >
          <Typography
            sx={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => {
              props.setLimit("-1");
            }}
          >
            عرض الكل
          </Typography>
        </Stack>
      )}
      {props.requests?.length !== 0 && props.limit === "-1" && (
        <ReactToPrint
          trigger={() => (
            <Button
              variant="contained"
              startIcon={<PrintIcon />}
              sx={{
                width: "200px",
                position: "absolute",
                right: "40px",
                zIndex: "1",
                mt: 3,
              }}
              onClick={handlePrint}
            >
              طباعه العملاء
            </Button>
          )}
          content={() => tableRef.current}
        />
      )}
    </>
  );
}

export type PropsType = {
  requests: ClientRequest[] | null;
  limit: string;
  setLimit: React.Dispatch<React.SetStateAction<string>>;
};

export default ClientRequestsTable;
