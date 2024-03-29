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
import { useEffect, useState } from "react";
import ContractDetailsContextProvider from "./ContractDetailsContext";
import { Accordion } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddLabelToEl from "../../../components/AddLabelToEl";
import { Select } from "@mui/material";
import ProjectWorkDetails from "./FormSections/ProjectWorkDetails";
import axios from "axios";
import { Api } from "../../../constants";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Loading/Loader";
import TermsAndTasksOFContract from "./FormSections/TermsAndTasks";

type WorkType = {
  id: number;
  name: string;
};

type workSubType = {
  id: number;
  direct_entry_type_id: number;
  name: string;
};

type contractT = {
  contract_type: number;
  id: number;
};

export default function CreateContracts(props: PropsType) {
  // TODO::declare our component
  const isCreate = props.type === "create";
  const [expanded, setExpanded] = useState("panel0");
  const [workTypes, setWorkTypes] = useState<WorkType[]>([]);
  const [workSubTypes, setWorkSubTypes] = useState<workSubType[]>([]);
  const [selectedWorkType, setSelectedWorkType] = useState<number>();
  const [selectedSubWorkType, setSelectedSubWorkType] = useState<number>();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [createdContract, setCreatedContract] = useState<contractT>();
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

  /**
   * handleSaveWorkType:: function for save contract type.
   */
  const handleSaveWorkType = async () => {
    (isCreate
      ? axios.post<{ contract: contractT }>(
          Api("employee/contract/store-type"),
          {
            contract_type: selectedSubWorkType,
          }
        )
      : axios.post<{ contract: contractT }>(
          Api(`employee/contract/update-type/${id}`),
          {
            contract_type: selectedSubWorkType,
          }
        )
    )
      .then((res) => {
        console.log("response101", res);
        setCreatedContract(res.data.contract);
        let arr = enabledTabs;
        arr.push("panel1");
        setEnabledTabs([...arr]);
        if (isCreate) enqueueSnackbar("تم الأضافة بنجاح");
        else enqueueSnackbar("تم التعديل بنجاح");
      })
      .catch((err) => {
        console.log("Error101 :-", err);
        enqueueSnackbar("تعذر الحفظ", { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // TODO::Decide what approarch u will take create or update
  useEffect(() => {
    if (isCreate) console.log("Breakpoint101 Create Approach .. . .");
    else {
      //TODO::fetch contract Data
      setLoading(true);
      setSaveStatment("تعديل");
      axios
        .get(Api(`employee/contract/${id}`))
        .then((res) => {
          setSelectedWorkType(res.data.data.contract_type);
          if (res.data.data.contract_direct_entry_sub_type.id) {
            setSelectedSubWorkType(
              res.data.data.contract_direct_entry_sub_type.id
            );
          }
        })
        .catch((err) => {
          console.log("Error101 :-", err);
          enqueueSnackbar("تعذر الحفظ", { variant: "error" });
        })
        .finally(() => {
          setLoading(false);
        });
      console.log("Breakpoint101 Edit Approach .. id:", id);
    }

    console.log("createdContract", createdContract);
  }, [createdContract]);

  useEffect(() => {
    axios
      .get<{ types: WorkType[] }>(Api("employee/contract/types"))
      .then(({ data }) => {
        console.log("data.types", data);
        setWorkTypes(data.types);
      })
      .catch((err) => {
        console.log("Error in fetch data:", err);
        enqueueSnackbar("تعذر في تحميل بيانات", { variant: "error" });
      });
  }, []);

  useEffect(() => {
    axios
      .get<{ sub_types: workSubType[] }>(
        Api(`employee/contract/types/${selectedWorkType}`)
      )
      .then(({ data }) => {
        setWorkSubTypes(data.sub_types);
      })
      .catch((err) => {
        console.log("Error in fetch data:", err);
      });
  }, [selectedWorkType]);

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
                <Grid container xs={12}>
                  {/* main type */}
                  <Grid item xs={selectedWorkType ? 6 : 12} paddingX={3}>
                    <AddLabelToEl label={"اختر نوع العقد"} required>
                      <Select
                        required
                        color="primary"
                        defaultValue={!isCreate ? selectedWorkType : 0}
                        size={"small"}
                        onChange={(e) => {
                          setSelectedWorkType(+e.target.value);
                        }}
                      >
                        {workTypes.map((item, idx) => (
                          <MenuItem
                            key={`CT_${idx}_${item.name}`}
                            value={item.id}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </AddLabelToEl>
                  </Grid>
                  {/* sub type */}
                  <Grid
                    item
                    xs={6}
                    paddingX={3}
                    display={selectedWorkType ? "block" : "none"}
                  >
                    <AddLabelToEl label={"اختر تصنيف العقد"} required>
                      <Select
                        required
                        color="primary"
                        defaultValue={!isCreate ? selectedSubWorkType : 0}
                        size={"small"}
                        onChange={(e) => {
                          setSelectedSubWorkType(+e.target.value);
                        }}
                      >
                        {workSubTypes.map((item, idx) => (
                          <MenuItem
                            key={`CT_${idx}_${item.name}`}
                            value={item.id}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </AddLabelToEl>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    marginTop: "2rem",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleSaveWorkType()}
                    size="large"
                  >
                    {saveStatment}
                  </Button>
                </Box>
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
                  edit={true}
                  setEnabledTabs={setEnabledTabs}
                  enabledTabs={enabledTabs}
                  contractId={createdContract?.id}
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
                <ProjectWorkDetails
                  edit={!isCreate}
                  contractId={
                    isCreate ? createdContract?.id : id ? +id : undefined
                  }
                  saveStatment={saveStatment}
                />
              </AccordionDetails>
            </Accordion>
            {/* Contract Terms and Tasks */}
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
                <TermsAndTasksOFContract
                  edit={!isCreate}
                  contractId={
                    isCreate ? createdContract?.id : id ? +id : undefined
                  }
                />
                {/* <ContractItems
                  edit={!isCreate}
                  Contract_ID={createdContract?.id}
                /> */}
              </AccordionDetails>
            </Accordion>
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
