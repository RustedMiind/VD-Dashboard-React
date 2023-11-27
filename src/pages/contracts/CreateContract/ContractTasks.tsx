import * as React from "react";
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

const bgTable = "#F3F5F7";

function ContractTasks() {
  return (
    <Accordion sx={{ mb: 3 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography>بنود ومهام العقد</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            sx={{ mb: 1 }}
            component={NavLink}
            to={"add"}
          >
            اضافة مهمه
          </Button>
        </Box>
        <Stack sx={{ backgroundColor: bgTable }}>
          <TableContainer sx={{ height: 500 }}>
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: bgTable }}>
                    كود المهمه
                  </TableCell>
                  <TableCell sx={{ backgroundColor: bgTable }}>
                    اسم المهمه
                  </TableCell>
                  <TableCell sx={{ backgroundColor: bgTable }}>
                    مده المهمه
                  </TableCell>
                  <TableCell sx={{ backgroundColor: bgTable }}>
                    قيمة المهمه
                  </TableCell>
                  <TableCell sx={{ backgroundColor: bgTable }}>
                    المسؤول عن المهمه
                  </TableCell>
                  <TableCell sx={{ backgroundColor: bgTable }}>
                    الاعدادات
                  </TableCell>
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
                      <EditNoteIcon sx={{}} />{" "}
                      <DeleteIcon sx={{ color: "red" }} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              }
            </Table>
          </TableContainer>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default ContractTasks;
