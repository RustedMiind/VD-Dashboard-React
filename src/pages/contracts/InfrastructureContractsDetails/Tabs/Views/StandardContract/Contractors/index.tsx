import { Stack, Table, TableContainer } from "@mui/material";
import AddButton from "./components/AddButton";
import TableHeaders from "./components/TableHeaders";
import TableBodyData from "./components/TableBodyData";

export default function StandardContractDetailsContracts() {
  return (
    <Stack>
      {/* add button */}
      <AddButton />
      {/* table */}
      <TableContainer>
        <Table>
          <TableHeaders />
          <TableBodyData />
        </Table>
      </TableContainer>
    </Stack>
  );
}
