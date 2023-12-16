import Button from "@mui/material/Button";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Grid, ListItemIcon, MenuItem, Snackbar } from "@mui/material";
import { useContext, useEffect, useReducer, useState } from "react";

import axios from "axios";
import { Api } from "../../../../../../constants";
import { ContractDetailsContext } from "../../../ContractDetailsContext";
import { LoadingButton } from "@mui/lab";
import {
  ChangeTypeValues,
  ContractPayment,
  ContractTask,
} from "../../../../../../types";
import { ToasterType } from "../../../../../../types/other/ToasterStateType";

// Icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import UploadFileInput from "../../../../../../components/UploadFileInput";
import { ContractAttachment } from "../../../../../../types/Contracts/ContractAttachment";
import { ArrayToMultiline, objectToFormData } from "../../../../../../methods";
import {
  AddAttachmentFormInit,
  AddAttachmentFormType,
  reducer,
} from "./reducer";
import { AxiosErrorType } from "../../../../../../types/Axios";
import { ErrorTypography } from "../../../../../../components/ErrorTypography";

function FormTextField(props: TextfieldPropsType) {
  return <TextField {...props} size="medium" fullWidth variant="outlined" />;
}

type TextfieldPropsType = TextFieldProps;

function SetDialog(props: PropsType) {
  const ContractDetails = useContext(ContractDetailsContext);
  const [sendState, setSendState] = useState<
    "loading" | "error" | "success" | "none"
  >("none");
  const [state, dispatch] = useReducer(reducer, AddAttachmentFormInit);
  const [errorState, setErrorState] = useState<
    ChangeTypeValues<Partial<AddAttachmentFormType>, string>
  >({});

  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    if (ContractDetails.contract?.id) {
      setSendState("loading");

      (props.edit
        ? axios.post(
            Api(`employee/contract/lever/${props.attachmentData.id}`),
            objectToFormData({
              contract_id: ContractDetails.contract?.id,
              card_image: state.file,
              name: state.name,
              type: state.type,
              code: state.code,
            }),
            {
              params: {
                _method: "PATCH",
              },
            }
          )
        : axios.post(
            Api("employee/contract/lever/store"),
            objectToFormData({
              contract_id: ContractDetails.contract?.id,
              card_image: state.file,
              name: state.name,
              type: state.type,
              code: state.code,
            })
          )
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
          (
            err: AxiosErrorType<{
              data: ChangeTypeValues<Partial<AddAttachmentFormType>, string[]>;
            }>
          ) => {
            console.log(err);
            setSendState("error");
            props.updateAndOpenToaster({
              message: "تعذر في الحفظ",
              severity: "error",
            });
            if (err.response?.status === 422) {
              setErrorState({
                name: ArrayToMultiline(err.response.data?.data?.name),
                code: ArrayToMultiline(err.response.data?.data?.code),
                file: ArrayToMultiline(err.response.data?.data?.file),
                type: ArrayToMultiline(err.response.data?.data?.type),
              });
            }
          }
        );
    }
  }
  useEffect(() => {
    if (props.edit)
      dispatch({ type: "SET_ALL", payload: props.attachmentData });
    else dispatch({ type: "SET_RESET", payload: undefined });
  }, [props.edit, props.open]);

  return (
    <>
      <Dialog
        maxWidth="md"
        fullWidth
        open={props.open}
        onClose={props.handleClose}
        component="form"
        onSubmit={handleSubmit}
      >
        <DialogTitle>
          {props.edit ? "تعديل المرفق" : "اضافة مرفق جديدة"}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid p={1} item md={6}>
              <FormTextField
                label="رقم المرفق"
                error={!!errorState.code}
                value={state.code}
                onChange={(e) => {
                  dispatch({ type: "SET_CODE", payload: e.target.value });
                }}
              />
              <ErrorTypography>{errorState.code}</ErrorTypography>
            </Grid>
            <Grid p={1} item md={6}>
              <FormTextField
                label="اسم المرفق"
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
                label="نوع المرفق"
                error={!!errorState.type}
                value={state.type}
                onChange={(e) => {
                  dispatch({ type: "SET_TYPE", payload: e.target.value });
                }}
              />
              <ErrorTypography>{errorState.type}</ErrorTypography>
            </Grid>
            <Grid p={1} item md={6}>
              <UploadFileInput
                value={state.file}
                subTitle=""
                setValue={(file) => {
                  dispatch({ type: "SET_FILE", payload: file });
                }}
              />
              <ErrorTypography>{errorState.file}</ErrorTypography>
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
      attachmentData: ContractAttachment;
    }
  | { edit?: false }
);

export default SetDialog;
