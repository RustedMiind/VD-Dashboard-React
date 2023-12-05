import Button from "@mui/material/Button";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Grid, MenuItem, Snackbar } from "@mui/material";
import { useContext, useEffect, useReducer, useState } from "react";
import { AddTaskFormInit, AddTaskFormType, reducer } from "./reducer";
import axios from "axios";
import { Api } from "../../../../../../constants";
import { ContractDetailsContext } from "../../../ContractDetailsContext";
import { LoadingButton } from "@mui/lab";
import { ContractTask } from "../../../../../../types";
import { ToasterType } from "../../../../../../types/other/ToasterStateType";

function FormTextField(props: TextfieldPropsType) {
  return <TextField {...props} size="small" fullWidth variant="outlined" />;
}

/*

Activate Delete Button
Activate Update Button
Add Toaster With State of Sending State 'error' || "success"
Get Contract Data After updating any of its sub fields

*/

type TextfieldPropsType = TextFieldProps;

function SetDialog(props: PropsType) {
  const ContractDetails = useContext(ContractDetailsContext);
  const [sendState, setSendState] = useState<
    "loading" | "error" | "success" | "none"
  >("none");
  const [state, dispatch] = useReducer(reducer, AddTaskFormInit);

  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    if (ContractDetails.contract?.id) {
      setSendState("loading");

      (props.edit
        ? axios.patch(Api(`employee/contract/task/${props.taskData.id}`), {
            amount: state.amount,
            employee_id: state.employee_id,
            name: state.name,
            period: state.period,
          })
        : axios.post(Api("employee/contract/task/store"), {
            contract_id: ContractDetails.contract?.id,
            ...state,
          })
      )
        .then(() => {
          setSendState("success");
          props.handleClose();
          dispatch({ type: "SET_RESET", payload: undefined });
          props.updateAndOpenToaster({
            message: "تم الحفظ بنجاح",
            severity: "success",
          });
          ContractDetails.refreshContract && ContractDetails.refreshContract();
        })
        .catch((err) => {
          console.log(err);
          setSendState("error");
          props.updateAndOpenToaster({
            message: "تعذر في الحفظ",
            severity: "error",
          });
        });
    }
  }
  useEffect(() => {
    if (props.edit) dispatch({ type: "SET_ALL", payload: props.taskData });
    else dispatch({ type: "SET_RESET", payload: undefined });
  }, [props.edit, props.open]);

  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={props.open}
        onClose={props.handleClose}
        component="form"
        onSubmit={handleSubmit}
      >
        <DialogTitle>
          {props.edit ? "تعديل المهمة" : "اضافة مهمة جديدة"}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid p={1} item md={6}>
              <FormTextField
                label="اسم المهمة"
                value={state.name}
                onChange={(e) => {
                  dispatch({ type: "SET_NAME", payload: e.target.value });
                }}
              />
            </Grid>
            <Grid p={1} item md={6}>
              <FormTextField
                label="مدة المهمة"
                value={state.period}
                onChange={(e) => {
                  dispatch({ type: "SET_PERIOD", payload: e.target.value });
                }}
              />
            </Grid>
            <Grid p={1} item md={6}>
              <FormTextField
                label="قيمة المهمة"
                value={state.amount}
                onChange={(e) => {
                  dispatch({ type: "SET_AMOUNT", payload: e.target.value });
                }}
              />
            </Grid>
            <Grid p={1} item md={6}>
              <FormTextField
                label="المسؤول عن المهمة"
                select
                value={state.employee_id}
                onChange={(e) => {
                  dispatch({
                    type: "SET_EMPLOYEE_ID",
                    payload: e.target.value,
                  });
                }}
              >
                {ContractDetails.use?.employees?.map((employee) => (
                  <MenuItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </MenuItem>
                ))}
                <MenuItem value="2">محمد</MenuItem>
                <MenuItem value="3">علي</MenuItem>
              </FormTextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.handleClose();
              dispatch({ type: "SET_RESET", payload: undefined });
            }}
          >
            الغاء
          </Button>
          <LoadingButton
            loading={sendState === "loading"}
            variant="contained"
            type="submit"
          >
            اضافة
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

type PropsType = {
  toaster: ToasterType;
  updateAndOpenToaster: (p: Partial<ToasterType>) => void;
  open: boolean;
  handleClose: () => void;
} & (
  | {
      edit: true;
      taskData: ContractTask;
    }
  | { edit?: false }
);

export default SetDialog;
