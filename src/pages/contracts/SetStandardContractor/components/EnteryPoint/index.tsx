import {
  Stack,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SetContractorData from "../forms/Section-1-ContractorData";
import ContractorRepresentatives from "../forms/Section-2-Representative";
import ContractEmployment from "../forms/Section-3-ContractEmployment";
import TableContractorAttachments from "../forms/Section-4-TableContractorAttachments";
import AddUserToContractor from "../AddUserToContractor";

export default function EntryPointOfSetStandardContractor() {
  return (
    <Stack spacing={3}>
      <Typography variant="h6" fontWeight={700}>
        اضافة بيانات مقاول
      </Typography>
      {/* Accordion */}
      <Box>
        {/* بيانات المقاول */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="subtitle1" fontWeight={700}>
              بيانات المقاول
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SetContractorData />
          </AccordionDetails>
        </Accordion>
        {/* اضافة مناديب */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography variant="subtitle1" fontWeight={700}>
              اضافة مناديب
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ContractorRepresentatives />
          </AccordionDetails>
        </Accordion>
        {/* العمالة المخططة في العقد */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography variant="subtitle1" fontWeight={700}>
              العمالة المخططة في العقد
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ContractEmployment />
          </AccordionDetails>
        </Accordion>
        {/* المرفقات */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography variant="subtitle1" fontWeight={700}>
              المرفقات
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContractorAttachments />
          </AccordionDetails>
        </Accordion>
      </Box>
      <AddUserToContractor />
    </Stack>
  );
}
