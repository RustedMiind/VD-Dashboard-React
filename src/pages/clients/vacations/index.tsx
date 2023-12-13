import { Button, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TableData from "./components/Table";
import PrintIcon from "@mui/icons-material/Print";
import { useEffect, useState } from "react";
import PopupVacations from "./components/PopupVacations";
import { EmployeeExcType } from "./types";
import axios from "axios";
import { Api } from "../../../constants";

const VacationsTable = () => {
  const [open, setOpen] = useState(false);
  const [employeeRequest, setEmployeeRequest] = useState<
    EmployeeExcType[] | undefined
  >();
  console.log(employeeRequest);
  const getEmployeeRequest = () => {
    axios
      .get<{ employees: { data: EmployeeExcType[] } }>(
        Api("employee/employees/in-same-branch/39")
      )
      .then(({ data }) => {
        // console.log(data);
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
          onClick={() => setOpen(!open)}
        >
          اضافة اجازة
        </Button>
        <TableData employeeRequest={employeeRequest} />
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
        open={open}
        handleClose={() => setOpen(!open)}
        title="اضافة اجازة"
        employeeRequest={employeeRequest}
      />
    </>
  );
};

export default VacationsTable;
