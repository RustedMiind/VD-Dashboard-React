import {
  Alert,
  Button,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TableData from "./components/Table";
import PrintIcon from "@mui/icons-material/Print";
import { useContext, useEffect, useRef, useState } from "react";
import SetDialog from "./SetDialog";
import axios from "axios";
import { Api } from "../../../constants";
import { useParams } from "react-router-dom";
import { EmployeeType, Vacation } from "../../../types";
import LoadingTable from "../../../components/LoadingTable";
import { BreadCrumbContext } from "../../../layout/main-layout/BreadCrumbContext";
import { LoadingButton } from "@mui/lab";
import { ToasterType } from "../../../types/other/ToasterStateType";
import ReactToPrint from "react-to-print";

const VacationsTable = () => {
  const { yearId, branchId } = useParams();
  const breadcrump = useContext(BreadCrumbContext);
  const [vacationSetDialog, setVacationSetDialog] = useState<
    "add" | "update" | null
  >(null);
  const [vacationToEdit, setVacationToEdit] = useState<undefined | Vacation>(
    undefined
  );
  const [employeesInBranch, setemployeesInBranch] = useState<
    EmployeeType[] | undefined
  >();
  const tableRef: React.RefObject<HTMLTableElement> =
    useRef<HTMLTableElement>(null);
  const handlePrint = () => {
    if (tableRef?.current) {
    }
  };
  const [vacations, setVacations] = useState<"loading" | "error" | Vacation[]>(
    "loading"
  );
  const [sendState, setSendState] = useState<
    "loading" | "error" | "success" | "none"
  >("none");
  const [toaster, setToaster] = useState<ToasterType>({
    open: false,
    message: "",
    severity: "success",
  });
  function updateToaster(partial: Partial<ToasterType>) {
    setToaster({ ...toaster, ...partial });
  }
  function updateAndOpenToaster(partial: Partial<ToasterType>) {
    updateToaster({ ...partial, open: true });
  }
  function handleCloseToaster() {
    updateToaster({ open: false });
  }
  function Delete() {
    setSendState("loading");
    axios
      .post(Api(`employee/vacation-day/${yearId}`), {})
      .then((res) => {
        console.log(res);
        setSendState("success");
        updateAndOpenToaster({
          severity: "success",
          message: "تم اعتماد محدد اجازات السنويه بنجاح",
        });
      })
      .catch((err) => {
        setSendState("error");
        updateAndOpenToaster({
          severity: "error",
          message: "تعذر في اعتماد محدد اجازات السنويه",
        });
      });
  }

  useEffect(() => {
    getEmployeeRequest();
    yearId && getYearVacations(yearId);
  }, []);
  useEffect(() => {
    breadcrump.addLast &&
      breadcrump.addLast(
        {
          path: `react/datalib/vacations/${branchId}`,
          title: "اعدادات اجازات الفرع",
        },
        {
          path: `react/datalib/vacations/${branchId}/${yearId}`,
          title: "اعدادات السنة",
        }
      );
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
          tableRef={tableRef}
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
        <ReactToPrint
          trigger={() => (
            <Button
              sx={{
                mt: 1,
                width: "fit-content",
                alignSelf: "flex-end",
                px: 5,
                py: 1,
              }}
              variant="outlined"
              type="button"
              color="primary"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
            >
              طباعة
            </Button>
          )}
          content={() => tableRef.current}
        />

        <LoadingButton
          loading={sendState === "loading"}
          variant="contained"
          sx={{
            mt: 1,
            width: "fit-content",
            alignSelf: "flex-end",
            px: 5,
            py: 1,
          }}
          onClick={Delete}
        >
          حفظ
        </LoadingButton>
      </Stack>
      <SetDialog
        openToaster={updateAndOpenToaster}
        setTableDate={setTableData}
        open={!!vacationSetDialog}
        InitialVacationData={vacationToEdit}
        onClose={handleCloseSetDialog}
        title="اضافة اجازة"
        employeesInBranch={employeesInBranch}
      />
      <Snackbar
        open={toaster.open}
        autoHideDuration={6000}
        onClose={handleCloseToaster}
        // action={action}
      >
        <Alert
          onClose={handleCloseToaster}
          severity={toaster.severity}
          sx={{ width: "100%" }}
        >
          {toaster.message}
        </Alert>
      </Snackbar>
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
