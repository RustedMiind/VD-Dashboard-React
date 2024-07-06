import { Stack, Table, TableContainer } from "@mui/material";
import TableHeaders from "./components/TableHeaders";
import TableBodyData from "./components/TableBodyData";
import AddButton from "./components/AddButton";
import { useState } from "react";
import SetDialog from "./components/SetDialog";

export default function ContractEmployment() {
  // TODO::declare and define component state and variables
  const [openDialog, setOpenDialog] = useState(false);
  // TODO::declare and define component helper methods
  // * return component ui.
  return (
    <Stack>
      <AddButton setOpen={setOpenDialog}/>
      <TableContainer>
        <Table>
          <TableHeaders />
          <TableBodyData />
        </Table>
      </TableContainer>
      <SetDialog open={openDialog} setOpen={setOpenDialog} />
    </Stack>
  );
}
