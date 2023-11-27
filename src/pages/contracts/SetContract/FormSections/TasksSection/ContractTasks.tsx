import {
  Box,
  Button,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { NavLink } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FormDialog from "./Dialog";
import { useState } from "react";

function ContractTasks() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  return (
    <>
      <FormDialog open={dialogOpen} handleClose={handleCloseDialog} />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          onClick={handleOpenDialog}
        >
          اضافة مهمه
        </Button>
      </Box>
      <Stack>
        <TableContainer sx={{ height: 500 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>كود المهمه</TableCell>
                <TableCell>اسم المهمه</TableCell>
                <TableCell>مده المهمه</TableCell>
                <TableCell>قيمة المهمه</TableCell>
                <TableCell>المسؤول عن المهمه</TableCell>
                <TableCell>الاعدادات</TableCell>
              </TableRow>
            </TableHead>
            {
              <TableBody>
                <TableRow>
                  <TableCell>002</TableCell>
                  <TableCell>مهمة انشاء مباني معماريه</TableCell>
                  <TableCell>شهرين</TableCell>
                  <TableCell>2000رس</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <EditNoteIcon />
                    <DeleteIcon color="error" />
                  </TableCell>
                </TableRow>
              </TableBody>
            }
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
}

export default ContractTasks;
