import { Box, Button, Table, TableContainer } from "@mui/material";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TableHeaders from "./components/TableHeaders";
import TableBodyData from "./components/TableBodyData";
import SetDialog from "./components/SetDialog";

export default function TableContractorAttachments() {
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
          اضافة مرفق
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHeaders />
          <TableBodyData />
        </Table>
      </TableContainer>
      <SetDialog open={openDialog} setOpen={setOpenDialog} />
    </>
  );
}
