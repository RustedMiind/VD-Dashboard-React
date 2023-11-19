import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Chip,
  Checkbox,
  Stack,
} from "@mui/material";
import { ClientRequest } from "../../../types";
import SettingsIcon from "@mui/icons-material/Settings";
import { useContext, useState, useEffect } from "react";
import TableHeader from "./TableHeader/TableHeader";
import Row from "./Row/Row";
import { TableContext } from "../Context/Store";

export type IdListType = {
  id: number[];
};

function ClientRequestsTable(props: PropsType) {
  const tableContext = useContext(TableContext);
  // handler delete
  const chekedArray: IdListType = {
    id: [],
  };

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
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
    <Stack>
      <TableContainer sx={{ height: 500 }}>
        <Table aria-label="simple table" stickyHeader>
          <TableHeader
            requests={props.requests}
            setSelectedItems={setSelectedItems}
          />
          {props.requests && (
            <TableBody>
              {props.requests.map((request, index) => {
                return (
                  <TableRow key={index}>
                    <Row
                      text={
                        <Checkbox
                          checked={selectedItems.includes(request.id)}
                          value={request.id}
                          disabled={!!request.contracts?.length}
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
                    <Row text={request.card_id} sx={{ textAlign: "center" }} />
                    <Row text={request.branch?.name} />

                    <Row
                      text={
                        request.Contract_status === "منتهي" ? (
                          <Chip
                            color="error"
                            variant="outlined"
                            label="منتهي"
                          />
                        ) : request.Contract_status === "لا يوجد عقود" ? (
                          <Chip
                            color="primary"
                            variant="outlined"
                            label="لا يوجد عقود"
                          />
                        ) : (
                          <Chip
                            color="primary"
                            variant="outlined"
                            label="جاري العمل"
                          />
                        )
                      }
                    />
                    <Row text={request.agent_name} />
                    <Row text={<SettingsIcon />} />
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Stack>
  );
}

export type PropsType = {
  requests: ClientRequest[] | undefined;
  // openModal: (r: ClientRequest) => () => void;
};

export default ClientRequestsTable;
