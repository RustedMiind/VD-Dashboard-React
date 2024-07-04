import { AccordionDetails, AccordionSummary } from "@mui/material";
import { Accordion } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContructData from "../forms/Section-1-FormContructData";
import AmountAndValueOfTable from "../forms/Section-2-TableAmountAndValue";
import TableContractAttachments from "../forms/Section-3-TableContractAttachments";
import { useContext } from "react";
import { StandredContractContext } from "../context/StandredContractContext";

export default function EntryPointStandredContract() {
  // todo::declare and define component state and variables
  const { isExtended, isEdit } = useContext(StandredContractContext);
  // todo::declare and define component helper methods
  // *return component ui
  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} mb={3}>
        {isEdit ? "تعديل" : "انشاء"} عقد موحد
      </Typography>
      {/* Form num 1 Contract Data */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          بيانات العقد
        </AccordionSummary>
        <AccordionDetails>
          <ContructData />
        </AccordionDetails>
      </Accordion>
      {/* Form num 2 Quantities, financial value and items */}
      <Accordion disabled={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          الكميات والقيمة المالية والبنود
        </AccordionSummary>
        <AccordionDetails>
          <AmountAndValueOfTable />
        </AccordionDetails>
      </Accordion>
      {/* Form num 3 Contract Attachments */}
      <Accordion disabled={!isExtended}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          مرفقات العقد
        </AccordionSummary>
        <AccordionDetails>
          {/* <TableAttachmentContruct /> */}
          <TableContractAttachments />
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}
