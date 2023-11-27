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
import { NavLink, useParams } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ContractData from "./ContractData";
import ContractTasks from "./ContractTasks";

export default function CreateContracts() {
  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} mb={3}>
        انشاء عقد ادخال مباشر
      </Typography>
      <ContractData />
      <ContractTasks />

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>مرفقات العقد</Typography>
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
              اضافة مرفق
            </Button>
          </Box>
          <Stack sx={{ backgroundColor: "background.paper" }}>
            <TableContainer sx={{ height: 500 }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>كود المرفق</TableCell>
                    <TableCell>اسم المرفق</TableCell>
                    <TableCell>رقم المرفق</TableCell>
                    <TableCell>نوع المرفق</TableCell>
                    <TableCell>الملف المرفق</TableCell>
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
                      <TableCell>
                        <DescriptionIcon sx={{ mt: 1 }} /> عرض الملف{" "}
                      </TableCell>
                      <TableCell>
                        <LocalPrintshopIcon />
                        <EditNoteIcon sx={{}} />
                        <DeleteIcon sx={{}} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                }
              </Table>
            </TableContainer>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}
