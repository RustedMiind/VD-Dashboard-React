import {
  Stack,
  Typography,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";

import LevelItem from "./LevelItem/LevelItem";
import { ProceduresModelsType, Step } from "./types";
import axios from "axios";
import HandleDepartmentWithEmployees, {
  DepartmentWithEmployeesType,
} from "../../../methods/HandleData/HandleDepartmentWithEmployees";
import { Api } from "../../../constants";
import TabsAndAdd from "./TabsAndAdd";

const InitLevel: Step = {
  action: 0,
  department_id: 0,
  id: 0,
  type: 0,
  duration: 0,
  employee_id: 1,
  model: 1,
};

function EmploeesRequestsProcedures() {
  const [currentTab, setCurrentTab] = useState(1);
  const [toaster, setToaster] = useState<{
    type: "error" | "success" | "null";
  }>({ type: "error" });
  const [proceduce, setProcedure] = useState<ProcedureType>({
    levels: [InitLevel],
  });
  const [departments, setDepartments] = useState<
    DepartmentWithEmployeesType[] | null
  >();

  useEffect(() => {
    setLevels([]);
    axios
      .get<{ employee: [] }>(Api("employee/getDepartmentWithEmployee"))
      .then((res) => {
        axios
          .post(Api("employee/general-requests/steps"), { type: currentTab })
          .then(({ data }) => {
            setLevels(data.steps);
            console.log("steps", data);
          })
          .catch(console.log);
        console.log(res);
        console.log(
          "Handled",
          HandleDepartmentWithEmployees(res.data.employee)
        );
        setDepartments(HandleDepartmentWithEmployees(res.data.employee));
      })
      .catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} mb={3}>
        اعدادات اجراءات الطلبات
      </Typography>

      <TabsAndAdd
        addLevel={addLevel}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      <Paper sx={{ p: 2 }}>
        {departments && (
          <Stack>
            {proceduce.levels.map((level, index, arr) => {
              const IS_LAST_ITEM = index === arr.length - 1;
              const MORE_THAN_ONE = arr.length > 1;
              return (
                <LevelItem
                  level={level}
                  updateLevel={updateLevel(index)}
                  name={`المرحلة ${index + 1}`}
                  onDelete={
                    IS_LAST_ITEM && MORE_THAN_ONE
                      ? () => {
                          removeLevel(index);
                        }
                      : undefined
                  }
                  departments={departments}
                />
              );
            })}
          </Stack>
        )}
        <Stack mt={2} direction={"row-reverse"}>
          <Button sx={{ px: 4 }} variant="contained" onClick={submitData}>
            ارسال التعديلات
          </Button>
        </Stack>
      </Paper>

      <Snackbar
        open={toaster.type === "success"}
        autoHideDuration={6000}
        onClose={() => {
          setToaster({ type: "null" });
        }}
        message="Note archived"
      >
        <Alert
          {...(toaster.type === "success"
            ? { severity: "success" }
            : { severity: "error" })}
          sx={{ width: "100%" }}
        >
          {toaster.type === "success"
            ? "تم الحفظ بنجاح"
            : "تعذر في الحفظ, تأكد من ادخال البيانات بالشكل الصحيح"}
        </Alert>
      </Snackbar>
    </Stack>
  );

  function setLevels(payload: Step[]) {
    setProcedure({ ...proceduce, levels: payload });
  }

  function addLevel() {
    const instance = [...proceduce.levels];
    instance.push(InitLevel);
    setLevels(instance);
  }

  function removeLevel(val: number) {
    const instance = [...proceduce.levels];

    instance.splice(val, 1);
    // const filtered = instance.filter((v) => v !== val);
    // setLevels(filtered);
    setLevels(instance);
  }

  function updateLevel(index: number) {
    return (payload: Step) => {
      const instance = [...proceduce.levels];
      instance.splice(index, 1, payload);
      // const filtered = instance.filter((v) => v !== val);
      // setLevels(filtered);
      setLevels(instance);
    };
  }

  function submitData() {
    const data = proceduce.levels.map((r) => {
      const { created_at, deleted_at, updated_at, id, ...t } = r;
      return { ...t, type: currentTab };
    });
    console.log("levels", data);
    axios
      .post(Api("employee/general-requests/steps/create"), {
        data,
      })
      .then((res) => {
        console.log(res);
        setToaster({ type: "success" });
      })
      .catch((err) => {
        console.log(err);
        setToaster({ type: "error" });
      });
  }
}

export interface ProcedureType {
  levels: Step[];
}

export interface LevelType {
  departmentManagerId: number;
  employeeId: number;
  accepted: boolean;
  approval: boolean;
  duration: string;
  model: ProceduresModelsType;
}

export default EmploeesRequestsProcedures;
