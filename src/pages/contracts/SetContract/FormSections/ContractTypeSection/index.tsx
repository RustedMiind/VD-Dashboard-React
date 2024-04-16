import { Box, Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Api } from "../../../../../constants";
import { useSnackbar } from "notistack";
import { ContractDetailsContext } from "../../ContractDetailsContext";

// define some helpers types
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

export default function ContractTypeSection({
  enabledTabs,
  setEnabledTabs,
}: PropsType) {
  // TODO::Declare and define component state and variables
  const [loading, setLoading] = useState(false);
  const [selectedWorkType, setSelectedWorkType] = useState<number>();
  const [selectedSubWorkType, setSelectedSubWorkType] = useState<number>();
  const [workTypes, setWorkTypes] = useState<WorkType[]>([]);
  const [workSubTypes, setWorkSubTypes] = useState<workSubType[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { contract, forceId } = useContext(ContractDetailsContext);
  const isCreate = !contract;

  //TODO::handle side effects
  useEffect(() => {
    // TODO::Decide what approarch u will take create or update
    if (isCreate) console.log("Breakpoint101 Create Approach .. . .");
    else {
      console.log("Breakpoint101 Edit Approach .. . .");
      //TODO::fetch contract Data

      console.log("Breakpoint101 Edit Data::", contract);
      setSelectedWorkType(contract.contract_type);
      if (contract.contract_direct_entry_sub_type?.id) {
        setSelectedSubWorkType(contract.contract_direct_entry_sub_type.id);
      }
    }
  }, [contract?.id, contract?.contract_type]);

  useEffect(() => {
    axios
      .get<{ types: WorkType[] }>(Api("employee/contract/types"))
      .then(({ data }) => {
        setWorkTypes(data.types);
      })
      .catch((err) => {
        console.log("Error in fetch data:", err);
        enqueueSnackbar("تعذر في تحميل بيانات", { variant: "error" });
      });
  }, []);

  useEffect(() => {
    if (selectedWorkType)
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

  //TODO::define and declare helper methods
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
          Api(`employee/contract/update-type/${contract?.id}`),
          {
            contract_type: selectedSubWorkType,
          }
        )
    )
      .then((res) => {
        console.log("Breakpoint1002 created contract data::", res);
        let arr = enabledTabs;
        arr.push("panel1");
        forceId?.(res.data.contract.id);
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

  //*return ui
  return (
    <>
      <Grid container xs={12}>
        {!loading && (
          <>
            {/* main type */}
            <Grid item xs={selectedWorkType ? 6 : 12} paddingX={3}>
              <AddLabelToEl label={"اختر نوع العقد"} required>
                <Select
                  key={selectedWorkType}
                  required
                  color="primary"
                  value={selectedWorkType}
                  size={"small"}
                  onChange={(e) => {
                    setSelectedWorkType(+e.target.value);
                  }}
                >
                  {workTypes.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
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
                  key={selectedSubWorkType}
                  required
                  color="primary"
                  value={selectedSubWorkType}
                  size={"small"}
                  onChange={(e) => {
                    setSelectedSubWorkType(+e.target.value);
                  }}
                >
                  {workSubTypes.map((item, idx) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </AddLabelToEl>
            </Grid>
          </>
        )}
        {/* {loading && (
          <Typography color={"InfoText"}>جاري تحميل البيانات . . .</Typography>
        )} */}
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
          حفظ
        </Button>
      </Box>
    </>
  );
}

type PropsType = {
  enabledTabs: string[];
  setEnabledTabs: React.Dispatch<React.SetStateAction<string[]>>;
};
