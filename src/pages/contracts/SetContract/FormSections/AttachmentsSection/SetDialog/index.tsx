import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useContext, useEffect, useReducer, useState } from "react";

import axios from "axios";
import { Api } from "../../../../../../constants";
import { ContractDetailsContext } from "../../../ContractDetailsContext";
import { LoadingButton } from "@mui/lab";
import { ChangeTypeValues } from "../../../../../../types";

// Icons
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
import RequiredSymbol from "../../../../../../components/RequiredSymbol";
import { useSnackbar } from "notistack";
import { FormControl } from "@mui/material";
import { useParams } from "react-router-dom";

function SetDialog(props: PropsType) {
  const { contract, refreshContract, use } = useContext(ContractDetailsContext);
  const [sendState, setSendState] = useState<
    "loading" | "error" | "success" | "none"
  >("none");
  const [state, dispatch] = useReducer(reducer, AddAttachmentFormInit);
  const [errorState, setErrorState] = useState<
    ChangeTypeValues<Partial<AddAttachmentFormType>, string>
  >({});
  const { enqueueSnackbar } = useSnackbar();

  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    if (contract?.id) {
      setSendState("loading");
      console.log("Data in state::", state);
      (props.edit
        ? axios.post(
            Api(`employee/contract/lever/${props.attachmentData.id}`),
            objectToFormData({
              contract_id: contract.id,
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
              contract_id: contract?.id,
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
          enqueueSnackbar("تم الحفظ بنجاح");
          refreshContract?.();
        })
        .catch(
          (
            err: AxiosErrorType<{
              data: ChangeTypeValues<
                Partial<AddAttachmentFormType & { card_image: string }>,
                string[]
              >;
            }>
          ) => {
            setSendState("error");
            enqueueSnackbar("تعذر في الحفظ", { variant: "error" });
            if (err.response?.status === 422) {
              setErrorState({
                name: ArrayToMultiline(err.response.data?.data?.name),
                code: ArrayToMultiline(err.response.data?.data?.code),
                file: ArrayToMultiline(err.response.data?.data?.card_image),
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
              <Typography>
                وصف المرفق
                {"  "}
                <RequiredSymbol />
              </Typography>
              <TextField
                size="small"
                fullWidth
                placeholder="رقم المرفق"
                error={!!errorState.code}
                value={state.code}
                onChange={(e) => {
                  dispatch({ type: "SET_CODE", payload: e.target.value });
                }}
              />
              <ErrorTypography>{errorState.code}</ErrorTypography>
            </Grid>
            <Grid p={1} item md={6}>
              <Typography>
                اسم المرفق
                {"  "}
                <RequiredSymbol />
              </Typography>
              <TextField
                placeholder="اسم المرفق"
                fullWidth
                size="small"
                error={!!errorState.name}
                value={state.name}
                onChange={(e) => {
                  dispatch({ type: "SET_NAME", payload: e.target.value });
                }}
              />
              <ErrorTypography>{errorState.name}</ErrorTypography>
            </Grid>
            <Grid p={1} item md={6}>
              <Typography>نوع المرفق</Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={state.type}
                  onChange={(e) => {
                    dispatch({ type: "SET_TYPE", payload: e.target.value });
                  }}
                >
                  {use?.attachments_types?.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ErrorTypography>{errorState.type}</ErrorTypography>
            </Grid>
            <Grid p={1} item md={6}>
              <Typography>ارفاق ملف</Typography>

              <UploadFileInput
                size="sm"
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
