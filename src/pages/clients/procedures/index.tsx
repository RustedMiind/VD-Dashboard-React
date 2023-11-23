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
import LevelsPlaceholder from "./LevelsPlaceholder";

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
  const [sendState, setSendState] = useState<SendStateType>("none");
  const [endpointStatus, setendpointStatus] =
    useState<EnpoindStateType>("none");
  const [proceduce, setProcedure] = useState<ProcedureType>({
    levels: [InitLevel],
  });
  const [departments, setDepartments] = useState();

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
              proceduce.levels.map((level, index, arr) => {
                const IS_LAST_ITEM = index === arr.length - 1;
                const MORE_THAN_ONE = arr.length > 1;
                return (
                  <LevelItem
                    key={level.id}
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
          <LoadingButton
            sx={{ px: 4 }}
            variant="contained"
            onClick={submitData}
            loading={sendState === "sending"}
            disabled={endpointStatus !== "none"}
          >
            ارسال التعديلات
          </LoadingButton>
        </Stack>
      </Paper>
      <Snackbar
        open={sendState === "success" || sendState === "error"}
        autoHideDuration={6000}
        onClose={snackbarClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert
          {...((sendState === "success" && {
            children: "تم الحفظ بنجاح",
            severity: "success",
          }) ||
            (sendState === "error" && {
              children: "تعذر في الحفظ تأكد من صحة المدخلات",
              severity: "error",
            }))}
          sx={{ width: 1 }}
        ></Alert>
      </Snackbar>
    </Stack>
  );

  function snackbarClose() {
    setSendState("none");
  }

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
    const data = proceduce.levels.map((r): Partial<Step> => {
      // return { ...t, type: currentTab };
      return {
        type: currentTab,
        action: r.action,
        duration: r.duration,
        employee_id: r.employee_id,
        department_id: r.department_id,
        model: r.model,
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
        setSendState("success");
      })
      .catch((err) => {
        console.log(err);
        setSendState("error");
      });
  }

  function loadLevels() {
    setLevels([]);
    setendpointStatus("loading");

    getDepartments().then(getLevels).catch(console.log);
  }
  function getDepartments() {
    return new Promise<void>((ressolve, reject) => {
      if (!departments) {
        axios
          .get(Api("employee/client/order/steps/use"))
          .then((res) => {
            console.log(res);
            console.log(res.data.Management);
            setDepartments(res.data.Management);
            // setDepartments()
            // console.log(
            //   "Departments : ",
            //   HandleDepartmentWithEmployees(res.data.employee)
            // );
            // setDepartments(HandleDepartmentWithEmployees(res.data.employee));
            // ressolve();
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
        .post(Api("employee/general-requests/steps"), { type: currentTab })
        .then(({ data }) => {
          setLevels(data.steps);
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

type SendStateType = "none" | "sending" | "success" | "error";
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
