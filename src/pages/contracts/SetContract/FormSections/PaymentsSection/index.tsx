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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink } from "react-router-dom";

function Payments() {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          component={NavLink}
          to={"add"}
        >
          اضافة دفعه
        </Button>
      </Box>
      <Stack>
        <TableContainer sx={{ height: 500 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>كود الدفعه</TableCell>
                <TableCell>اسم الدفعه</TableCell>
                <TableCell>مده الدفعه</TableCell>
                <TableCell>قيمة الدفعه</TableCell>
                <TableCell>اختيار حاله الدفعه</TableCell>
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
                  <TableCell>بعد 60 يوم</TableCell>
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
    </>
  );
}

export default Payments;
