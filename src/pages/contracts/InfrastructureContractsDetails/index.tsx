import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import TopCards from "./components/TopCards";
import { Button, Grid } from "@mui/material";
import TabsButtons from "./components/TabsButtons";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import BandInformation from "./Tabs/BandInformation";
import axios from "axios";
import { Api } from "../../../constants";
import Loader from "../../../components/Loading/Loader";

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
        console.log("Response101::", data?.data?.data, data);
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
    <Grid container xl={12}>
      {/* row - top headers containers */}
      <TopCards  contractData={contractData}  />
      {/* Tabs Buttons */}
      <TabsButtons />
      {/* Add new pand */}
      <Grid item xs={12} textAlign={"right"} marginY={"1rem"}>
        <Button
          sx={{
            bgcolor: "primary.main",
            color: "#fff",
            borderRadius: "12px",
            fontSize: "13px",
            fontWeight: "600",
            marginX: "10px",
            paddingX: "1.2rem",
            marginRight: "auto",
            transition: "all 0.5s ease-in-out",
            ":hover": {
              bgcolor: "#fff",
              color: "primary.main",
              transform: "scale(1.056)",
              boxShadow: "1px 1px 3px 3px lightgray",
            },
          }}
          startIcon={<AddBoxOutlinedIcon />}
          component={NavLink}
          to="#"
        >
          انشاء بند
        </Button>
      </Grid>
      {/* Show Active Tab */}
      <BandInformation contractData={contractData} />
    </Grid>
  );
}

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
  users: { id: number; name: string }[];
};
