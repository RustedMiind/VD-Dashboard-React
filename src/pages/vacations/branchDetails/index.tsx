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

  const [yearFilter, setYearFilter] = useState<string>("الكل");
  const [statusFilter, setStatusFilter] = useState<number>(-1);

  function getYearFromDateStr(dateStr: string): number | null {
    const parsedDate = new Date(dateStr);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.getFullYear();
    }
    return null;
  }

  useEffect(() => {
    let year = null;
    let status_id = null;

    if (statusFilter !== -1) {
      status_id = statusFilter;
    }
    if (yearFilter !== "الكل") {
      year = getYearFromDateStr(yearFilter);
    }

    axios
      .get<{ date: VacationsDetailsType[] }>(
        Api(`employee/vacation/${branchId}`),
        {
          params: {
            status_id: status_id || null,
            year: year || null,
          },
        }
      )
      .then((data) => {
        setVacationsData(data.data.date);
      })
      .catch((err) => {
        setVacationsData("error");
      });

    console.log(yearFilter);
    console.log(statusFilter);
  }, [yearFilter, statusFilter]);

  const filterDetailsProps = {
    setTableData,
    statusFilter,
    setStatusFilter,
    yearFilter,
    setYearFilter,
    dialogState,
    closeDialog,
    openErrorDialog,
    openAddDialog,
  };
  return (
    <Stack>
      <FilterDetails {...filterDetailsProps} />
      {vacationsData === "loading" && <LoadingTable rows={5} cols={5} />}
      {vacationsData === "error" && <NotFound title="حدث خطأ حاول مرة أخرى" />}
      {typeof vacationsData === "object" && (
        <DetailsTable
          vacationsData={vacationsData}
          openDetailsDialog={openDetailsDialog}
          closeDialog={closeDialog}
          dialogState={dialogState}
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
