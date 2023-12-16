import { useParams } from "react-router-dom";
import DetailsTable from "./DetailsTable";
import FilterDetails from "./FilterDetails";
import { Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../constants";
import LoadingTable from "../../../components/LoadingTable";
import NotFound from "../../../components/NotFound";
import { BreadCrumbContext } from "../../../layout/main-layout/BreadCrumbContext";

function BranchDetails() {
  const { branchId } = useParams();

  const breadcrump = useContext(BreadCrumbContext);
  const [vacationsData, setVacationsData] = useState<
    VacationsDetailsType[] | "loading" | "error"
  >("loading");

  useEffect(() => {
    breadcrump.addLast &&
      breadcrump.addLast({
        path: `react/datalib/vacations/${branchId}`,
        title: "اعدادات اجازات الفرع",
      });
  }, []);

  const [dialogState, setDialogState] = useState<DialogState>("none");

  const closeDialog = () => {
    setDialogState("none");
  };
  const openErrorDialog = () => {
    setDialogState("error");
  };
  const openAddDialog = () => {
    setDialogState("add");
  };
  const openDetailsDialog = () => {
    setDialogState("details");
  };

  const setTableData = () => {
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
  };
  useEffect(() => {
    setTableData();
  }, []);

  return (
    <Stack>
      <FilterDetails setTableData={setTableData} />
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
  vacationNumber: number;
  vacationDayNumber: number;
  vacationDayNumberUsed: number;
  vacationDayNumberstay: number;
  status: {
    id: number;
    name: string;
    type: string;
    color: null;
    active: number;
    created_at: null;
    updated_at: null;
    deleted_at: null;
  };
};

type DialogState = "none" | "error" | "add" | "details";
