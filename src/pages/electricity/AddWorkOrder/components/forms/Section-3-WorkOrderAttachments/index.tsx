import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Table, TableContainer } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TableHeaders from "./components/TableHeaders";
import TableBodyData from "./components/TableBodyData";

export default function WorkOrderAttachments() {
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
      {/* <SetDialog open={openDialog} setOpen={setOpenDialog} /> */}
    </>
  );
}
