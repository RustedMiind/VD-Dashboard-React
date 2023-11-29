import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  Chip,
  Checkbox,
  Stack,
  Button,
} from "@mui/material";

import { ClientRequest } from "../../../types";
import SettingsIcon from "@mui/icons-material/Settings";
import { useContext, useState, useEffect, useRef } from "react";
import TableHeader from "./TableHeader/TableHeader";
import Row from "./Row/Row";
import { TableContext } from "../Context/Store";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";
import NotFound from "../../../components/NotFound";

export type IdListType = {
  id: number[];
};

function ClientRequestsTable(props: PropsType) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const tableContext = useContext(TableContext);
  const tableRef: any = useRef();
  const chekedArray: IdListType = {
    id: [],
  };
  const handlePrint = () => {
    tableRef.current.print();
  };
  chekedArray.id = selectedItems;
  useEffect(() => {
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
    <>
      <Stack>
        <TableContainer>
          <Table sx={{ overflow: "hidden" }} stickyHeader ref={tableRef}>
            {props.requests?.length !== 0 ? (
              <TableHeader
                requests={props.requests}
                setSelectedItems={setSelectedItems}
              />
            ) : (
              <NotFound title="لا يوجد عملاء" />
            )}
            {props.requests && (
              <TableBody>
                {props.requests.map((request, index) => {
                  return (
                    <TableRow key={index}>
                      <Row
                        text={
                          <Checkbox
                            disabled={request.Contract_status === "منتهي"}
                            checked={selectedItems.includes(request.id)}
                            value={request.id}
                            onChange={CheckboxHandler}
                          />
                        }
                      />
                      <Row
                        text={request.name}
                        sx={{
                          color: "#F19B02",
                          textDecoration: "underline",
                          maxWidth: "100px",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      />
                      <Row text={request.phone} />
                      <Row text={request.email} />
                      <Row text={request.register_number || request.card_id} />
                      <Row text={request.branch?.name} />

                      <Row
                        text={
                          request.Contract_status === "منتهي" ? (
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
                          )
                        }
                      />
                      <Row
                        text={request.agent_name ? request.agent_name : "-"}
                      />
                      <Row text={<SettingsIcon />} />
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
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
                mt: "20px",
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
