import {
  AccordionDetails,
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import ContractData from "./FormSections/ContractDataSection";
import ContractTasks from "./FormSections/TasksSection/ContractTasks";
import ContractItems from "./FormSections/ContractItems/ContractItems";
import Payments from "./FormSections/PaymentsSection";
import Attachments from "./FormSections/AttachmentsSection";
import SectionAccordion from "./Components/SectionAccordion";
import { useContext, useEffect, useState } from "react";
import ContractDetailsContextProvider, {
  ContractDetailsContext,
} from "./ContractDetailsContext";
import { Accordion } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProjectWorkDetails from "./FormSections/ProjectWorkDetails";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loading/Loader";
import TermsAndTasksOFContract from "./FormSections/TermsAndTasks";
import ContractTypeSection from "./FormSections/ContractTypeSection";
import ContractItemsV2 from "./FormSections/ContractItemsV2";

export default function CreateContracts(props: PropsType) {
  // TODO::declare our component
  const isCreate = props.type === "create";
  const [expanded, setExpanded] = useState("panel0");
  const [loading, setLoading] = useState(false);
  const [enabledTabs, setEnabledTabs] = useState(
    isCreate ? ["panel0"] : ["panel0", "panel1"]
  );
  let { id } = useParams();
  const [saveStatment, setSaveStatment] = useState("حفظ");
  //TODO::define our helpers functions
  //* handle change
  const HandleChangeExpanded = (str: string) => {
    if (expanded === str) setExpanded("");
    else setExpanded(str);
  };

  return (
    <ContractDetailsContextProvider>
      <Stack sx={{ position: "relative" }}>
        {loading && (
          <Box>
            <Loader title="جاري التحميل بيانات العقد" h="80vh" />
          </Box>
        )}
        {!loading && (
          <>
            <Typography variant="h5" fontWeight={600} mb={3}>
              {isCreate ? "انشاء عقد ادخال مباشر" : "تعديل بيانات العقد"}
            </Typography>
            {/* Contract Type */}
            <Accordion
              expanded={expanded === "panel0"}
              onChange={() => HandleChangeExpanded("panel0")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel0-content"
                id="panel0-header"
              >
                <Typography>نوع العقد</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ContractTypeSection
                  enabledTabs={enabledTabs}
                  setEnabledTabs={setEnabledTabs}
                />
              </AccordionDetails>
            </Accordion>
            {/* Contract main Data */}
            <Accordion
              disabled={isCreate && enabledTabs.indexOf("panel1") == -1}
              expanded={expanded === "panel1"}
              onChange={() => HandleChangeExpanded("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>بيانات العقد</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ContractData
                  setEnabledTabs={setEnabledTabs}
                  enabledTabs={enabledTabs}
                />
              </AccordionDetails>
            </Accordion>
            {/* Contract Data Details */}
            <Accordion
              disabled={isCreate && enabledTabs.indexOf("panel1.5") == -1}
              expanded={expanded === "panel1.5"}
              onChange={() => HandleChangeExpanded("panel1.5")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1.5-content"
                id="panel1-header"
              >
                <Typography>تفاصيل عمل المشروع</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ProjectWorkDetails saveStatment={saveStatment} />
              </AccordionDetails>
            </Accordion>
            {/* Contract Items */}
            <Accordion
              disabled={isCreate && enabledTabs.indexOf("panel1.5") == -1}
              expanded={expanded === "panel2"}
              onChange={() => HandleChangeExpanded("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>بنود ومهام العقد</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* <ContractTasks /> */}
                <ContractItemsV2 />
              </AccordionDetails>
            </Accordion>
            {/* Payments */}
            <Accordion
              disabled={isCreate && enabledTabs.indexOf("panel1.5") == -1}
              expanded={expanded === "panel3"}
              onChange={() => HandleChangeExpanded("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography>دفعات العقد</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Payments />
              </AccordionDetails>
            </Accordion>
            {/* Attachments */}
            <Accordion
              disabled={isCreate && enabledTabs.indexOf("panel1.5") == -1}
              expanded={expanded === "panel4"}
              onChange={() => HandleChangeExpanded("panel4")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4-content"
                id="panel4-header"
              >
                <Typography>مرفقات العقد</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Attachments />
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </Stack>
    </ContractDetailsContextProvider>
  );
}

type PropsType = {
  type: "create" | "edit";
};
