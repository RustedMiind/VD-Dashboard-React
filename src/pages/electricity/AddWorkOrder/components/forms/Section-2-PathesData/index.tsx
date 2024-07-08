import { useState } from "react";
import { Box, Button, Table, TableContainer } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PathesTablesHeaders from "./components/PathesTablesHeaders";
import PathesTableData from "./components/PathesTableData";
import AddPathDialog from "./components/AddPathDialog";

export default function WorkOrderPathedData() {
  // TODO::declare and define component state and variables
  const [openDialog, setOpenDialog] = useState(false);

  // TODO::declare and define component helper methods

  // * return component UI.
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          onClick={() => setOpenDialog(!openDialog)}
        >
          اضافة مسار
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <PathesTablesHeaders />
          <PathesTableData />
        </Table>
      </TableContainer>
      <AddPathDialog open={openDialog} setOpen={setOpenDialog} />
    </>
  );
}
