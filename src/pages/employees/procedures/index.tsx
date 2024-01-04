import { Stack, Typography, Paper, Snackbar, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";

import LevelItem from "./LevelItem/LevelItem";
import { ProceduresModelsType, Step } from "./types";
import axios from "axios";
import HandleDepartmentWithEmployees, {
  DepartmentWithEmployeesType,
} from "../../../methods/HandleData/HandleDepartmentWithEmployees";
import { Api } from "../../../constants";
import TabsAndAdd from "./TabsAndAdd";
import LevelsPlaceholder from "../../../components/PlaceHolder/LevelsPlaceholder";
import { EmployeeType } from "../../../types";
import { conversions } from "../../../methods/conversions";
import { useSnackbar } from "notistack";

const InitLevel: Step = {
  action: 0,
  department_id: conversions.idOrNullToInt(null),
  id: 0,
  type: 0,
  duration: 0,
  employee_id: conversions.idOrNullToInt(null),
  model: 1,
};

function EmploeesRequestsProcedures() {
  const [currentTab, setCurrentTab] = useState(1);
  const [sendState, setSendState] = useState<SendStateType>("none");
  const [endpointStatus, setendpointStatus] =
    useState<EnpoindStateType>("none");
  const [procedure, setProcedure] = useState<ProcedureType>({
    levels: [InitLevel],
  });
  const [departments, setDepartments] = useState<
    DepartmentWithEmployeesType[] | null
  >();
  const { enqueueSnackbar } = useSnackbar();
  const [employees, setEmployees] = useState<Partial<EmployeeType>[] | null>(
    null
  );
  useEffect(loadLevels, [currentTab]);

  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} mb={3}>
        اعدادات اجراءات الطلبات
      </Typography>

      <TabsAndAdd
        addLevel={addLevel}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        disabled={endpointStatus !== "none"}
      />

      <Paper sx={{ p: 2 }}>
        {endpointStatus === "loading" && (
          <Stack>
            <LevelsPlaceholder />
          </Stack>
        )}
        {endpointStatus === "error" && (
          <Stack>
            <Typography variant="h5" py={4} color="error" textAlign="center">
              حدث خطأ في تحميل المراحل, برجاء المحاولة مرة اخري
            </Typography>
          </Stack>
        )}
        {departments && (
          <Stack>
            {endpointStatus === "none" &&
              procedure.levels.map((level, index, arr) => {
                const IS_LAST_ITEM = index === arr.length - 1;
                const MORE_THAN_ONE = arr.length > 1;
                return (
                  <LevelItem
                    key={level.id}
                    level={level}
                    employees={employees}
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
          <LoadingButton
            sx={{ px: 4 }}
            variant="contained"
            onClick={submitData}
            loading={sendState === "sending"}
            disabled={endpointStatus !== "none"}
          >
            حفظ
          </LoadingButton>
        </Stack>
      </Paper>
    </Stack>
  );

  function setLevels(payload: Step[]) {
    setProcedure({ ...procedure, levels: payload });
  }

  function addLevel() {
    const instance = [...procedure.levels];
    instance.push(InitLevel);
    setLevels(instance);
  }

  function removeLevel(val: number) {
    const instance = [...procedure.levels];

    instance.splice(val, 1);
    // const filtered = instance.filter((v) => v !== val);
    // setLevels(filtered);
    setLevels(instance);
  }

  function updateLevel(index: number) {
    return (payload: Step) => {
      const instance = [...procedure.levels];
      instance.splice(index, 1, payload);
      // const filtered = instance.filter((v) => v !== val);
      // setLevels(filtered);
      setLevels(instance);
    };
  }

  function submitData() {
    const data = procedure.levels.map((dto): Partial<Step> => {
      // return { ...t, type: currentTab };
      return {
        type: currentTab,
        action: dto.action,
        duration: dto.duration,
        employee_id: conversions.toValidId(dto.employee_id),
        department_id: conversions.toValidId(dto.department_id),
        model: dto.model,
      };
    });
    console.log(data);
    setSendState("sending");
    axios
      .post(Api("employee/general-requests/steps/create"), {
        data,
      })
      .then((res) => {
        console.log(res);
        enqueueSnackbar("تم حفظ الاجراءات بنجاح");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(
          err?.response?.data?.msg || "تعذر في حفظ اجراءات الطلبات"
        );
      })
      .finally(() => {
        setSendState("none");
      });
  }

  function loadLevels() {
    setLevels([]);
    setendpointStatus("loading");

    getDepartments().then(getEmoloyees).then(getLevels).catch(console.log);
  }
  function getDepartments() {
    return new Promise<void>((ressolve, reject) => {
      if (!departments) {
        axios
          .get<{ employee: [] }>(Api("employee/getDepartmentWithEmployee"))
          .then((res) => {
            console.log(res);
            console.log(
              "Departments : ",
              HandleDepartmentWithEmployees(res.data.employee)
            );
            setDepartments(HandleDepartmentWithEmployees(res.data.employee));
            ressolve();
          })
          .catch((err) => {
            console.log(err);
            setendpointStatus("error");
            reject(err);
          });
      } else ressolve();
    });
  }
  function getEmoloyees() {
    return new Promise<void>((ressolve, reject) => {
      if (!employees) {
        axios
          .post<{ data: Partial<EmployeeType>[] }>(Api("employee/employees"))
          .then((res) => {
            console.log(res);
            console.log("employees : ", res);
            setEmployees(res.data.data);
            ressolve();
          })
          .catch((err) => {
            console.log(err);
            setendpointStatus("error");
            reject(err);
          });
      } else ressolve();
    });
  }

  function getLevels() {
    return new Promise<void>((ressolve, reject) => {
      axios
        .post<{ steps: Step[] }>(Api("employee/general-requests/steps"), {
          type: currentTab,
        })
        .then(({ data }) => {
          setLevels(
            data.steps.map((step) => ({
              ...step,
              department_id:
                step.department_id === null ? -1 : step.department_id,
              employee_id: step.employee_id === null ? -1 : step.employee_id,
            }))
          );
          console.log("Steps : ", data);
          setendpointStatus("none");
          ressolve();
        })
        .catch((err) => {
          console.log(err);
          setendpointStatus("error");
          ressolve(err);
        });
    });
  }
}

export interface ProcedureType {
  levels: Step[];
}

type SendStateType = "none" | "sending";
type EnpoindStateType = "none" | "loading" | "error";

export interface LevelType {
  departmentManagerId: number;
  employeeId: number;
  accepted: boolean;
  approval: boolean;
  duration: string;
  model: ProceduresModelsType;
}

export default EmploeesRequestsProcedures;
