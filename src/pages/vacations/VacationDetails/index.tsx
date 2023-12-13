import { Button, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TableData from "./components/Table";
import PrintIcon from "@mui/icons-material/Print";
import { useEffect, useState } from "react";
import PopupVacations from "./components/SetDialog";
import axios from "axios";
import { Api } from "../../../constants";
import { useParams } from "react-router-dom";
import { EmployeeType } from "../../../types";

const VacationsTable = () => {
  const [open, setOpen] = useState(false);
  const { year, branchId } = useParams();
  const [vacationRequest, setVacationRequest] = useState<
    "post" | "put" | "null"
  >("null");
  const [employeeRequest, setEmployeeRequest] = useState<
    EmployeeType[] | undefined
  >();
  console.log(employeeRequest);
  const getEmployeeRequest = () => {
    branchId &&
      axios
        .get<{ employees: { data: EmployeeType[] } }>(
          Api("employee/employees/in-same-branch/" + branchId)
        )
        .then(({ data }) => {
          setEmployeeRequest(data.employees.data);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  useEffect(() => {
    getEmployeeRequest();
  }, []);
  return (
    <>
      <Stack>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1, width: "fit-content", alignSelf: "flex-end" }}
          onClick={() => {
            setVacationRequest("post");
            setOpen(true);
          }}
        >
          اضافة اجازة
        </Button>
        <TableData
          employeeRequest={employeeRequest}
          setVacationRequest={setVacationRequest}
          vacationRequest={vacationRequest}
        />
        <Stack direction={"row"} gap={1} sx={{ justifyContent: "flex-end" }}>
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
      </Stack>
      <PopupVacations
        vacationRequest={vacationRequest}
        open={open}
        handleClose={() => setOpen(!open)}
        title="اضافة اجازة"
        employeeRequest={employeeRequest}
      />
    </>
  );
};

export default VacationsTable;
