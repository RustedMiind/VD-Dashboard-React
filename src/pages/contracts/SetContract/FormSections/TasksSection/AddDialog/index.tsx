import Button from "@mui/material/Button";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, MenuItem } from "@mui/material";
import { useContext, useReducer, useState } from "react";
import { AddTaskFormInit, AddTaskFormType, reducer } from "./reducer";
import axios from "axios";
import { Api } from "../../../../../../constants";
import { ContractDetailsContext } from "../../../ContractDetailsContext";
import { LoadingButton } from "@mui/lab";

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

function AddDialog(props: PropsType) {
  const ContractDetails = useContext(ContractDetailsContext);
  const [sendState, setSendState] = useState<
    "loading" | "error" | "success" | "none"
  >("none");

  function handleSubmit() {
    setSendState("loading");
    axios
      .post(Api("employee/contract/task/store"), {
        contract_id: 13,
        ...state,
      })
      .then(() => {
        setSendState("success");
        props.handleClose();
        dispatch({ type: "SET_RESET", payload: undefined });
      })
      .catch((err) => {
        console.log(err);
        setSendState("error");
      });
  }

  const [state, dispatch] = useReducer(reducer, AddTaskFormInit);
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>اضافة مهمة</DialogTitle>
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
                dispatch({ type: "SET_EMPLOYEE_ID", payload: e.target.value });
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
          onClick={handleSubmit}
        >
          اضافة
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  open: boolean;
  handleClose: () => void;
};

export default AddDialog;
