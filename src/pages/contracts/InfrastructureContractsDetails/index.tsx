import { createContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import TopCards from "./components/TopCards";
import { Button, Grid, Stack } from "@mui/material";
import TabsButtons from "./components/TabsButtons";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import BandInformation from "./Tabs-old/BandInformation";
import axios from "axios";
import { Api } from "../../../constants";
import Loader from "../../../components/Loading/Loader";
import TabsContainer from "./Tabs";

export const ContractDetailsContext = createContext<
  ContractIncomeDataType | undefined
>(undefined);

export default function InfrastructureContractsDetails() {
  // TODO::Declare our component state.
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState();
  const [contractData, setContractData] = useState<ContractIncomeDataType>();
  let { id } = useParams(); //contract id
  // TODO::fetch Contract Data
  useEffect(() => {
    setLoading(true);
    axios
      .get(Api(`employee/contract-details/${id}`))
      .then((data) => {
        console.log("Response101 Contract Items::", data?.data?.data, data);
        // * prepare users
        let _user = [];
        if (
          data?.data?.data?.contract_items &&
          data?.data?.data?.contract_items?.length > 0
        ) {
          if (data?.data?.data?.contract_items[0]?.contract_item_employees) {
            let arr =
              data?.data?.data?.contract_items[0]?.contract_item_employees;
            for (let i = 0; i < arr.length; i++) {
              const element = arr[i];
              _user.push({
                id: +arr[i]?.employee?.id,
                name: arr[i]?.employee?.name,
              });
            }
          }
        }
        // * define ways of show contract
        let showWays = "";
        if (data?.data?.data?.contract_details?.website) {
          showWays += " الموقع ";
        }
        if (data?.data?.data?.contract_details?.application) {
          if (showWays.length) showWays += " - ";
          showWays += " التطبيق ";
        }
        if (data?.data?.data?.contract_details?.online_service) {
          if (showWays.length) showWays += " - ";
          showWays += " خدمة الكترونية ";
        }
        setContractData({
          id: +data?.data?.data?.id,
          name: data?.data?.data?.details,
          contractNumber: data?.data?.data?.code,
          contractPeriod: data?.data?.data?.period,
          contractDate: data?.data?.data?.date,
          contractAmount: data?.data?.data?.amount,
          branchName: data?.data?.data?.branch?.name,
          managementName: data?.data?.data?.management?.name,
          clientName: data?.data?.data?.client?.name,
          engineerName: data?.data?.data?.employee?.full_name,
          area: data?.data?.data?.contract_details?.area,
          location: data?.data?.data?.contract_details?.location,
          numberOfPieces: data?.data?.data?.contract_details?.number_parts,
          wayOfShow: showWays,
          card_image: data?.data?.data?.card_image,
          users: _user,
          ManagerId: data?.data?.data?.employee_id,
          contractMainItems: data?.data?.data?.contract_items,
        });
      })
      .catch((err) => {
        console.log("Error in fetch contract Data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // *Loading case
  if (loading) return <Loader title="جاري تحميل بيانات العقد" />;
  // *normal case
  return (
    <ContractDetailsContext.Provider value={contractData}>
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

// contract sub item type
export type ContractSubItemType = {
  contract_item_id: number;
  created_at: string;
  employee_id: number;
  id: number;
  is_attachment: number;
  is_letter: number;
  is_mission: number;
  is_processing: number;
  is_progress_bar: number;
  name: string;
  updated_at: string;
};
// contract main items users type
export type MainContractItemUserType = {
  contract_item_id: number;
  created_at: string;
  employee: { id: number; name: string };
  employee_id: number;
  id: number;
  updated_at: string;
};
// Contract main Items Type
export type ContractMainType = {
  contract_id: number;
  contract_item_employees: MainContractItemUserType[];
  contract_sub_items: ContractSubItemType[];
  created_at: string;
  description: string;
  end_date: string;
  id: number;
  manager_id: number;
  name: string;
  start_date: string;
  updated_at: string;
};
// define incomming contract data
export type ContractIncomeDataType = {
  id: number;
  name: string;
  contractNumber: string;
  contractPeriod: string;
  contractDate: string;
  contractAmount: string;
  branchName: string;
  managementName: string;
  clientName: string;
  engineerName: string;
  area: string;
  location: string;
  numberOfPieces: string;
  wayOfShow: string;
  card_image: string;
  ManagerId: number;
  users: { id: number; name: string }[];
  contractMainItems: ContractMainType[];
};
