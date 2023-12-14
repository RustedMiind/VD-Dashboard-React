import { Button, Paper, Stack, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TableData from "./components/Table";
import PrintIcon from "@mui/icons-material/Print";
import { useEffect, useState } from "react";
import SetDialog from "./SetDialog";
import axios from "axios";
import { Api } from "../../../constants";
import { useParams } from "react-router-dom";
import { EmployeeType, Vacation } from "../../../types";
import LoadingTable from "../../../components/LoadingTable";

const VacationsTable = () => {
  const { yearId, branchId } = useParams();
  const [vacationSetDialog, setVacationSetDialog] = useState<
    "add" | "update" | null
  >(null);
  const [vacationToEdit, setVacationToEdit] = useState<undefined | Vacation>(
    undefined
  );
  const [employeesInBranch, setemployeesInBranch] = useState<
    EmployeeType[] | undefined
  >();
  const [vacations, setVacations] = useState<"loading" | "error" | Vacation[]>(
    "loading"
  );

  console.log(employeesInBranch);

  useEffect(() => {
    getEmployeeRequest();
    yearId && getYearVacations(yearId);
  }, []);
  return (
    <Stack>
      <Button
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        sx={{ mb: 1, width: "fit-content", alignSelf: "flex-end" }}
        onClick={handleOpenAddDialog}
      >
        اضافة اجازة
      </Button>
      {Array.isArray(vacations) && (
        <TableData
          vacations={vacations}
          openUpdateDialog={handleOpenUpdateDialog}
        />
      )}
      {vacations === "loading" && (
        <Paper>
          <LoadingTable rows={5} cols={5} />
        </Paper>
      )}

      {vacations === "error" && (
        <Typography variant="h5" color={"error"}>
          حدث خطا في تحميل بيانات السنة
        </Typography>
      )}
      <Stack direction={"row"} gap={1} justifyContent="flex-end">
        <Button
          startIcon={<PrintIcon />}
          color="primary"
          variant="outlined"
          sx={{
            mt: 1,
            width: "fit-content",
            alignSelf: "flex-end",
            px: 5,
            py: 1,
          }}
        >
          طباعة
        </Button>
        <Button
          variant="contained"
          sx={{
            mt: 1,
            width: "fit-content",
            alignSelf: "flex-end",
            px: 5,
            py: 1,
          }}
        >
          حفظ
        </Button>
      </Stack>
      <SetDialog
        setTableDate={setTableData}
        open={!!vacationSetDialog}
        InitialVacationData={vacationToEdit}
        onClose={handleCloseSetDialog}
        title="اضافة اجازة"
        employeesInBranch={employeesInBranch}
      />
    </Stack>
  );

  function handleCloseSetDialog() {
    setVacationSetDialog(null);
  }
  function handleOpenUpdateDialog(vacation: Vacation) {
    return () => {
      setVacationToEdit(vacation);
      setVacationSetDialog("update");
    };
  }
  function handleOpenAddDialog() {
    setVacationToEdit(undefined);
    setVacationSetDialog("add");
  }

  function getEmployeeRequest() {
    branchId &&
      axios
        .get<{ employees: EmployeeType[] }>(
          Api("employee/employees/in-same-branch/" + branchId)
        )
        .then(({ data }) => {
          setemployeesInBranch(data.employees);
        })
        .catch((err) => {
          console.log(err);
        });
  }
  function setTableData() {
    yearId && getYearVacations(yearId);
  }
  function getYearVacations(yearId: string) {
    setVacations("loading");
    axios
      .get<{ vacations: Vacation[] }>(Api(`employee/vacation-day/${yearId}`))
      .then((res) => {
        setVacations(res.data.vacations);
      })
      .catch((err) => {
        console.log("Error Fetching Vacations");
        setVacations("error");
      });
  }
};

export default VacationsTable;
