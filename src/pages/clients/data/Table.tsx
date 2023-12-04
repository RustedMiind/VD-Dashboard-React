import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  Chip,
  Checkbox,
  Stack,
  Button,
  Typography,
  TextField,
  TableCell,
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

export type IdListType = {
  id: number[];
};

function ClientRequestsTable(props: PropsType) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const tableContext = useContext(TableContext);
  const [rowsCount, setRowsCount] = useState(5);
  const toView = props.requests?.slice(0, rowsCount);
  const isAllSelected = selectedItems.length === props.requests?.length;
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

  return (
    <>
      <Stack>
        <TableContainer>
          <Table ref={tableRef}>
            {props.requests?.length !== 0 ? (
              <TableHeader
                requests={props.requests}
                setSelectedItems={setSelectedItems}
                isAllSelected={isAllSelected}
              />
            ) : (
              <NotFound title="لا يوجد عملاء" />
            )}
            {props.requests && (
              <TableBody>
                {toView?.map((request, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox
                          disabled={request.Contract_status === "منتهي"}
                          checked={selectedItems.includes(request.id)}
                          value={request.id}
                          onChange={CheckboxHandler}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#F19B02",
                          textDecoration: "underline",
                          maxWidth: "100px",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {request.name}
                      </TableCell>

                      <TableCell>{request.phone}</TableCell>

                      <TableCell>{request.email} </TableCell>

                      <TableCell>
                        {request.register_number || request.card_id}
                      </TableCell>
                      <TableCell>{request.branch?.name}</TableCell>
                      <TableCell>
                        {request.Contract_status === "منتهي" ? (
                          <Chip
                            sx={{
                              color: "#CB1818",
                              background: "#EED4D4",
                              borderRadius: "9px",
                            }}
                            variant="outlined"
                            label="منتهي"
                          />
                        ) : request.Contract_status === "لا يوجد عقود" ? (
                          <Chip
                            sx={{
                              color: "#A7A7A7",
                              background: "#EBEBEB",
                              borderRadius: "9px",
                              textAlign: "center",
                            }}
                            variant="outlined"
                            label="لا يوجد عقود"
                          />
                        ) : (
                          <Chip
                            sx={{
                              color: "#18CB5F",
                              background: "#D4EEDE",
                              borderRadius: "9px",
                              textAlign: "center",
                            }}
                            variant="outlined"
                            label="جاري العمل"
                          />
                        )}
                      </TableCell>

                      <TableCell>
                        {request.agent_name ? request.agent_name : "-"}
                      </TableCell>
                      <TableCell>
                        <SettingsIcon />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Stack>
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
          value={rowsCount}
          select
          onChange={(e) => {
            setRowsCount(parseInt(e.target.value) || 10);
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={250}>250</MenuItem>
          <MenuItem value={500}>500</MenuItem>
          <MenuItem value={1000}>1000</MenuItem>
          <MenuItem value={10000}>10000</MenuItem>
          <MenuItem value={props.requests?.length}>عرض الكل</MenuItem>
        </TextField>
      </Stack>
      {props.requests?.length !== 0 && (
        <ReactToPrint
          trigger={() => (
            <Button
              variant="contained"
              startIcon={<PrintIcon />}
              sx={{
                width: "200px",
                position: "absolute",
                right: "40px",
                zIndex: "100000000",
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
};

export default ClientRequestsTable;
