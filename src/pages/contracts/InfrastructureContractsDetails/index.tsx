import { createContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import TopCards from "./components/TopCards";
import { Backdrop, Button, Grid, Stack } from "@mui/material";
import TabsButtons from "./components/TabsButtons";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import axios from "axios";
import { Api } from "../../../constants";
import Loader from "../../../components/Loading/Loader";
import TabsContainer from "./Tabs";
import { Contract } from "../../../types";
import { useSnackbar } from "notistack";
import LoadingBackdrop from "../../../components/Loading/LoadingBackdrop";
import { DbOptionType } from "../../../types/other/DbOptionType";
import { getUseData, returnedUsedData } from "../../../methods/getUseData";

export const ContractDetailsContext = createContext<ContractDetailsContextType>(
  {
    refresh() {},
    status: "loading",
    refreshToggler: false,
  }
);

export interface ContractDetailsContextType {
  contract?: Contract;
  status: Status;
  refresh: (soft?: boolean) => void;
  refreshToggler: boolean;
  use?: returnedUsedData;
}

type Status = "loading" | "loaded" | "error";

export default function InfrastructureContractsDetails() {
  // TODO::Declare our component state.
  const [status, setStatus] = useState<Status>("loading");
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [refreshToggler, setRefreshToggler] = useState(false);
  const [attatchmentFileTypes, setAttatchmentFileTypes] = useState<
    DbOptionType[]
  >([]);

  // fetch data for attatchmentFileTypes
  const SetAttatchmentFileTypesArray = async () => {
    let useData = await getUseData();
    setAttatchmentFileTypes(useData.attachments_types);
  };
  useEffect(() => {
    SetAttatchmentFileTypesArray();
  }, []);
  let { id } = useParams(); //contract id
  const { enqueueSnackbar } = useSnackbar();

  function getContract(soft?: boolean) {
    if (!soft) setStatus("loading");
    axios
      .get<{ data: Contract }>(Api(`employee/contract-details/${id}`))
      .then(({ data }) => {
        setStatus("loaded");
        setContract(data.data);
        //setRefreshToggler((prevState) => !prevState);
      })
      .catch(() => {
        enqueueSnackbar("تعذر في تحميل بيانات العقد", { variant: "error" });
        setStatus("error");
      });
  }

  useEffect(getContract, [id]);

  // *Loading case
  // *normal case
  return (
    <ContractDetailsContext.Provider
      value={{
        contract,
        refresh: getContract,
        status,
        refreshToggler,
        use: { attachments_types: attatchmentFileTypes },
      }}
    >
      <LoadingBackdrop open={status === "loading"} />
      <Stack spacing={4}>
        <Grid container>
          {/* row - top headers containers */}
          <TopCards />
        </Grid>
        <TabsContainer />
      </Stack>
    </ContractDetailsContext.Provider>
  );
}
