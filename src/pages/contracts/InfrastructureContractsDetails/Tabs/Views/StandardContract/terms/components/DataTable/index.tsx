import { Button, Table, TableContainer } from "@mui/material";
import TableHeaders from "./components/TableHeaders";
import StandardContractTermsBodyOfDataTable from "./components/TableBodyData";
import { useState } from "react";

export default function DataTabelOfStandardContractTerms() {
  // TODO::declare and define compoent state and variables
  const [rows, setRows] = useState([1]);
  // TODO::declare and define compoent helper methods
  const handleClick = () => {
    setRows((prev) => [...prev, rows.length + 1]);
  };
  // * return component UI
  return (
    <>
      <TableContainer>
        <Table>
          <TableHeaders />
          <StandardContractTermsBodyOfDataTable rows={rows} />
        </Table>
      </TableContainer>
      <Button
        onClick={handleClick}
        fullWidth
        sx={{
          bgcolor: "#d2dcea",
          ":hover": {
            bgcolor: "#d2dcea",
          },
        }}
      >
        اضافة مهام
      </Button>
    </>
  );
}
