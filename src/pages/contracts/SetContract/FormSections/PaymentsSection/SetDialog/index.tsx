import Button from "@mui/material/Button";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Grid, ListItemIcon, MenuItem, Snackbar } from "@mui/material";
import { useContext, useEffect, useReducer, useState } from "react";
import { AddPaymentFormType, AddTaskFormInit, reducer } from "./reducer";
import axios from "axios";
import { Api } from "../../../../../../constants";
import { ContractDetailsContext } from "../../../ContractDetailsContext";
import { LoadingButton } from "@mui/lab";
import { ContractPayment, ContractTask } from "../../../../../../types";
import { ToasterType } from "../../../../../../types/other/ToasterStateType";

// Icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AxiosErrorType } from "../../../../../../types/Axios";
import { LaravelValidationError } from "../../../../../../types/LaravelValidationError";
import { ArrayToMultiline } from "../../../../../../methods";
import { ErrorTypography } from "../../../../../../components/ErrorTypography";

function FormTextField(props: TextfieldPropsType) {
  return <TextField {...props} size="small" fullWidth variant="outlined" />;
}

type TextfieldPropsType = TextFieldProps;

function SetDialog(props: PropsType) {
  const ContractDetails = useContext(ContractDetailsContext);
  const [errorState, setErrorState] = useState<Partial<AddPaymentFormType>>({});
  const [sendState, setSendState] = useState<
    "loading" | "error" | "success" | "none"
  >("none");
  const [state, dispatch] = useReducer(reducer, AddTaskFormInit);

  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    if (ContractDetails.contract?.id) {
      setSendState("loading");

      (props.edit
        ? axios.patch(
            Api(`employee/contract/payment/${props.paymentData.id}`),
            {
              amount: state.amount,
              status: state.status,
              name: state.name,
              period: state.period,
            }
          )
        : axios.post(Api("employee/contract/payment/store"), {
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
        .catch(
          (err: AxiosErrorType<LaravelValidationError<AddPaymentFormType>>) => {
            console.log(err);
            setSendState("error");
            props.updateAndOpenToaster({
              message: "تعذر في الحفظ",
              severity: "error",
            });
            if (err.response?.status === 422) {
              setErrorState({
                name: ArrayToMultiline(err.response.data?.data?.name),
                amount: ArrayToMultiline(err.response.data?.data?.amount),
                period: ArrayToMultiline(err.response.data?.data?.period),
                status: ArrayToMultiline(err.response.data?.data?.status),
              });
            }
          }
        );
    }
  }
  useEffect(() => {
    if (props.edit) dispatch({ type: "SET_ALL", payload: props.paymentData });
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
          {props.edit ? "تعديل الدفعة" : "اضافة دفعة جديدة"}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid p={1} item md={6}>
              <FormTextField
                label="اسم الدفعة"
                error={!!errorState.name}
                value={state.name}
                onChange={(e) => {
                  dispatch({ type: "SET_NAME", payload: e.target.value });
                }}
              />
              <ErrorTypography>{errorState.name}</ErrorTypography>
            </Grid>
            <Grid p={1} item md={6}>
              <FormTextField
                label="مدة الدفعة"
                error={!!errorState.period}
                value={state.period}
                onChange={(e) => {
                  dispatch({ type: "SET_PERIOD", payload: e.target.value });
                }}
              />
              <ErrorTypography>{errorState.period}</ErrorTypography>
            </Grid>
            <Grid p={1} item md={6}>
              <FormTextField
                label="قيمة الدفعة"
                error={!!errorState.amount}
                value={state.amount}
                onChange={(e) => {
                  dispatch({ type: "SET_AMOUNT", payload: e.target.value });
                }}
              />
              <ErrorTypography>{errorState.amount}</ErrorTypography>
            </Grid>
            <Grid p={1} item md={6}>
              <FormTextField
                label="اختيار حالة الدفعة"
                error={!!errorState.status}
                select
                value={state.status}
                onChange={(e) => {
                  dispatch({
                    type: "SET_STATUS",
                    payload: e.target.value,
                  });
                }}
              >
                <MenuItem value={"-30"}>بعد 30 يوم</MenuItem>
                <MenuItem value={"-60"}>بعد 60 يوم</MenuItem>
                <MenuItem value={undefined} disabled>
                  <ListItemIcon>
                    <ArrowDropDownIcon />
                  </ListItemIcon>
                  بعد انتهاء مهمة
                </MenuItem>
                {ContractDetails.contract?.tasks?.map((task) => (
                  <MenuItem value={task.id}> {task.name} </MenuItem>
                ))}
              </FormTextField>
              <ErrorTypography>{errorState.status}</ErrorTypography>
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
      paymentData: ContractPayment;
    }
  | { edit?: false }
);

export default SetDialog;
