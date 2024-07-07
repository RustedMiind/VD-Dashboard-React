import { Button, Paper, Stack, Table, TableContainer } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableHeaders from "./components/TableHeaders";
import TableBodyData from "./components/TableBody";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SetDialog from "../SetDialog";
import { useState } from "react";
import EmptyTable from "../EmptyTable";

export default function IndexOfDataTable() {
  // TODO::declare and define component state and variables
  const [openDialog, setOpenDialog] = useState(false);
  const isEmpty = false;
  // TODO::declare and define component helper methods
  // * empty case
  // * return component ui.
  return (
    <>
      {isEmpty && <EmptyTable setOpenDialog={setOpenDialog} />}
      {!isEmpty && (
        <Paper
          sx={{
            overflow: "hidden",
            mb: 7,
            marginTop: "5rem",
          }}
          elevation={4}
        >
          <Stack
            justifyContent="space-between"
            direction="row"
            flexWrap="wrap"
            alignItems="end"
            padding={3}
          >
            <Button
              variant="contained"
              onClick={() => setOpenDialog(true)}
              startIcon={<AddBoxOutlinedIcon />}
            >
              اضافة مستخدمين
            </Button>
            <Stack direction="row" spacing={2}>
              <Button
                // disabled={selectedItems?.length !== 1}
                variant="outlined"
                onClick={() => {}}
                startIcon={<EditIcon />}
              >
                تعديل
              </Button>
              <Button
                color="error"
                variant="outlined"
                // disabled={!selectedItems?.length}
                startIcon={<DeleteIcon />}
                onClick={() => {}}
              >
                حذف
              </Button>
            </Stack>
          </Stack>
          <TableContainer sx={{ marginTop: "0.5rem" }}>
            <Table>
              {/* Table Headers */}
              <TableHeaders />
              {/* Table body */}
              <TableBodyData />
            </Table>
          </TableContainer>
        </Paper>
      )}
      <SetDialog open={openDialog} setOpen={setOpenDialog} />
    </>
  );
}
