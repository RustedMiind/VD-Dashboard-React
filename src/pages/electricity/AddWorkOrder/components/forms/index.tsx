import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkOrderFormData from "../forms/Section-1-WorkOrderData";
import WorkOrderPathedData from "../forms/Section-2-PathesData";
import WorkOrderAttachments from "../forms/Section-3-WorkOrderAttachments";

export default function WorkOrderFormsIndex() {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          بيانات امر العمل
        </AccordionSummary>
        <AccordionDetails>
          <WorkOrderFormData />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          بيانات المسار
        </AccordionSummary>
        <AccordionDetails>
          <WorkOrderPathedData />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          مرفقات
        </AccordionSummary>
        <AccordionDetails>
          <WorkOrderAttachments />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
