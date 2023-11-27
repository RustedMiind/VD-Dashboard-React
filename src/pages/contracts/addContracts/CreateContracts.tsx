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
const bgTable = "#F3F5F7";

export default function CreateContracts() {
  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} mb={3}>
        انشاء عقد ادخال مباشر
      </Typography>
      <ContractData />
      <ContractTasks />
      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>دفعات العقد</Typography>
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
              اضافة دفعه
            </Button>
          </Box>
          <Stack sx={{ backgroundColor: bgTable }}>
            <TableContainer sx={{ height: 500 }}>
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: bgTable }}>
                      كود الدفعه
                    </TableCell>
                    <TableCell sx={{ backgroundColor: bgTable }}>
                      اسم الدفعه
                    </TableCell>
                    <TableCell sx={{ backgroundColor: bgTable }}>
                      مده الدفعه
                    </TableCell>
                    <TableCell sx={{ backgroundColor: bgTable }}>
                      قيمة الدفعه
                    </TableCell>
                    <TableCell sx={{ backgroundColor: bgTable }}>
                      اختيار حاله الدفعه
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
        </AccordionDetails>
      </Accordion>
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
          <Stack sx={{ backgroundColor: bgTable }}>
            <TableContainer sx={{ height: 500 }}>
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: bgTable }}>
                      كود المرفق
                    </TableCell>
                    <TableCell sx={{ backgroundColor: bgTable }}>
                      اسم المرفق
                    </TableCell>
                    <TableCell sx={{ backgroundColor: bgTable }}>
                      رقم المرفق
                    </TableCell>
                    <TableCell sx={{ backgroundColor: bgTable }}>
                      نوع المرفق
                    </TableCell>
                    <TableCell sx={{ backgroundColor: bgTable }}>
                      الملف المرفق
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
