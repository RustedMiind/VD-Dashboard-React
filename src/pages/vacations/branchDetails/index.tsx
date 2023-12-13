import { useParams } from "react-router-dom";
import DetailsTable from "./DetailsTable";
import FilterDetails from "./FilterDetails";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../constants";
import LoadingTable from "../../../components/LoadingTable";
import NotFound from "../../../components/NotFound";

function BranchDetails() {
  const { branchId } = useParams();

  const [vacationsData, setVacationsData] = useState<
    VacationsDetailsType[] | "loading" | "error"
  >("loading");

  // const setTableData = () => {
  //   setVacationsData("loading");
  //   axios
  //     .get<{ data: BranchDetailsType }>(Api(`empoloyee/vacation/${branchId}`))
  //     .then((data) => {
  //       console.log(data);
  //       // setVacationsData({});
  //     })
  //     .catch((error) => {
  //       // setVacationsData("error");
  //     });
  // };
  useEffect(() => {
    console.log("from use effect");
    setVacationsData("loading");
    axios
      .get<{ date: VacationsDetailsType[] }>(
        Api(`employee/vacation/${branchId}`)
      )
      .then((data) => {
        console.log(data.data.date);
        setVacationsData(data.data.date);
      })
      .catch((err) => {
        setVacationsData("error");
      });
  }, []);

  return (
    <Stack>
      <FilterDetails />
      {vacationsData === "loading" && <LoadingTable rows={5} cols={5} />}
      {vacationsData === "error" && <NotFound title="حدث خطأ حاول مرة أخرى" />}
      {typeof vacationsData === "object" && (
        <DetailsTable vacationsData={vacationsData} />
      )}
    </Stack>
  );
}

export default BranchDetails;

export type VacationsDetailsType = {
  id: number;
  branch_id: number;
  year: number;
  specific: null;
  status_id: number;
  created_at: null;
  updated_at: null;
};
