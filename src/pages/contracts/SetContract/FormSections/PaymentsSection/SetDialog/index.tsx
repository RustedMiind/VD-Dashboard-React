import Button from "@mui/material/Button";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, ListItemIcon, MenuItem, Typography } from "@mui/material";
import { useContext, useEffect, useReducer, useState } from "react";
import { AddPaymentFormType, AddTaskFormInit, reducer } from "./reducer";
import axios from "axios";
import { Api } from "../../../../../../constants";
import { ContractDetailsContext } from "../../../ContractDetailsContext";
import { LoadingButton } from "@mui/lab";
import {
  ChangeTypeValues,
  Contract,
  ContractPayment,
} from "../../../../../../types";

// Icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AxiosErrorType } from "../../../../../../types/Axios";
import { LaravelValidationError } from "../../../../../../types/LaravelValidationError";
import { ArrayToMultiline } from "../../../../../../methods";
import { ErrorTypography } from "../../../../../../components/ErrorTypography";
import RequiredSymbol from "../../../../../../components/RequiredSymbol";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

function FormTextField(props: TextfieldPropsType) {
  return <TextField {...props} size="small" fullWidth variant="outlined" />;
}

export enum PayementsStatusPrefix {
  DAYS = "-",
  MAIN_ITEM = "MI_",
  SUB_ITEM = "SI_",
}

type TextfieldPropsType = TextFieldProps;

export function getOptions(contract?: Contract) {
  const options: { name: string; value: string }[] = [];
  if (contract?.contract_items) {
    [15, 30, 60].forEach((days) =>
      options.push({
        name: `بعد ${days} يوم`,
        value: `${PayementsStatusPrefix.DAYS}${days}`,
      })
    );
    contract.contract_items.forEach((item) => {
      options.push({
        name: `بعد بند رئيسي  (${item.name})`,
        value: `${PayementsStatusPrefix.MAIN_ITEM}${item.id}`,
      });
      if (item.contract_sub_items)
        item.contract_sub_items.forEach((subItem) => {
          options.push({
            name: `بعد انتهاء بند فرعي (${subItem.name})`,
            value: `${PayementsStatusPrefix.SUB_ITEM}${subItem.id}`,
          });
        });
    });
  }
  return options;
}

function SetDialog(props: PropsType) {
  const { contract, refreshContract } = useContext(ContractDetailsContext);
  const [errorState, setErrorState] = useState<
    ChangeTypeValues<Partial<AddPaymentFormType>, string>
  >({});
  const [sendState, setSendState] = useState<
    "loading" | "error" | "success" | "none"
  >("none");
  const [state, dispatch] = useReducer(reducer, AddTaskFormInit);
  const { enqueueSnackbar } = useSnackbar();

  const options = getOptions(contract);

  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();

    if (contract?.id) {
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
            contract_id: contract.id,
            ...state,
          })
      )
        .then(() => {
          setSendState("success");
          props.handleClose();
          dispatch({ type: "SET_RESET", payload: undefined });
          enqueueSnackbar("تم الحفظ بنجاح");
          refreshContract?.();
        })
        .catch(
          (err: AxiosErrorType<LaravelValidationError<AddPaymentFormType>>) => {
            setSendState("error");

            if (err.response?.status === 422) {
              setErrorState({
                name: ArrayToMultiline(err.response.data?.data?.name),
                amount: ArrayToMultiline(err.response.data?.data?.amount),
                period: ArrayToMultiline(err.response.data?.data?.period),
                status: ArrayToMultiline(err.response.data?.data?.status),
              });
            } else if (err.response?.status === 406) {
              enqueueSnackbar(err.response?.data?.msg, { variant: "error" });
            } else {
              enqueueSnackbar("تعذر في الحفظ", { variant: "error" });
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
              <Typography>
                اسم الدفعة
                {"  "}
                <RequiredSymbol />
              </Typography>
              <FormTextField
                placeholder="اسم الدفعة"
                error={!!errorState.name}
                value={state.name}
                onChange={(e) => {
                  dispatch({ type: "SET_NAME", payload: e.target.value });
                }}
              />
              <ErrorTypography>{errorState.name}</ErrorTypography>
            </Grid>
            <Grid p={1} item md={6}>
              <Typography>
                مدة الدفعة
                {"  "}
                <RequiredSymbol />
              </Typography>
              <FormTextField
                placeholder="مدة الدفعة"
                error={!!errorState.period}
                value={state.period}
                onChange={(e) => {
                  dispatch({ type: "SET_PERIOD", payload: e.target.value });
                }}
              />
              <ErrorTypography>{errorState.period}</ErrorTypography>
            </Grid>
            <Grid p={1} item md={6}>
              <Typography>قيمة الدفعة</Typography>
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
              <Typography>اختيار حالة الدفعة</Typography>
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
                {options?.map((option) => (
                  <MenuItem value={option.value} key={option.value}>
                    {option.name}
                  </MenuItem>
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
