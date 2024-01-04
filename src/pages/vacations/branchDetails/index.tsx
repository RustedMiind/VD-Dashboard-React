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
  const [dialogState, setDialogState] = useState<DialogState>("none");
  const breadcrump = useContext(BreadCrumbContext);
  const [vacationsData, setVacationsData] = useState<
    VacationsDetailsType[] | "loading" | "error"
  >("loading");
  const [filters, setFilters] = useState<{
    year: string | null;
    status: number;
  }>({ year: null, status: -1 });
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
  function setYearFilter(year: string | null) {
    setFilters({ ...filters, year });
  }
  function setStatusFilter(status: number) {
    setFilters({ ...filters, status });
  }
  useEffect(() => {
    breadcrump.addLast &&
      breadcrump.addLast({
        path: `react/datalib/vacations/${branchId}`,
        title: "اعدادات اجازات الفرع",
      });
  }, []);
  useEffect(setTableData, [filters.status, filters.year]);

  function setTableData() {
    setVacationsData("loading");
    axios
      .get<{ date: VacationsDetailsType[] }>(
        Api(`employee/vacation/${branchId}`),
        {
          params: {
            year: filters.year,
            status_id: filters.status === -1 ? null : filters.status,
          },
        }
      )
      .then((data) => {
        setVacationsData(data.data.date);
      })
      .catch((err) => {
        setVacationsData("error");
      });
  }

  return (
    <Stack>
      <FilterDetails
        dialogState={dialogState}
        closeDialog={closeDialog}
        openErrorDialog={openErrorDialog}
        openAddDialog={openAddDialog}
        setTableData={setTableData}
        statusFilter={filters.status}
        setStatusFilter={setStatusFilter}
        yearFilter={filters.year}
        setYearFilter={setYearFilter}
      />
      {vacationsData === "loading" && <LoadingTable rows={5} cols={5} />}
      {vacationsData === "error" && <NotFound title="حدث خطأ حاول مرة أخرى" />}
      {typeof vacationsData === "object" && (
        <DetailsTable
          vacationsData={vacationsData}
          dialogState={dialogState}
          closeDialog={closeDialog}
          openDetailsDialog={openDetailsDialog}
        />
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
