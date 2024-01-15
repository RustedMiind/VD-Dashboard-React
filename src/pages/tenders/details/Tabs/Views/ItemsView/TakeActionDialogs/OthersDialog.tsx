import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  Grid,
  GridProps,
  MenuItem,
  Typography,
} from "@mui/material";

import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";
import UploadFileInput from "../../../../../../../components/UploadFileInput";
import { DtoType } from "./DtoType";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { statusOptions } from "./BuyDialog";
import axios from "axios";
import { Api } from "../../../../../../../constants";
import SubmitTypeDialog from "./SubmitTypeDialog";
import { FetchStatus } from "../../../../../../../types/FetchStatus";
import { FetchStatusEnum } from "../../../../../../../types/FetchStatusEnum";
import { useSnackbar } from "notistack";
import { TenderDataContext } from "../../../..";
import { useParams } from "react-router-dom";
import { objectToFormData } from "../../../../../../../methods";

const GridItem = (props: GridProps & { label: string }) => (
  <Grid item md={6} {...props}>
    <Typography variant="body1">{props.label}</Typography>
    {props.children}
  </Grid>
);

export default function OthersDialog({
  title,
  onSubmit,
  close,
  ...dialogProps
}: PropsType) {
  const { register, handleSubmit } = useForm<DtoType>({
    defaultValues: {
      status: "-1",
      iban: "",
      reciept_number: "",
      department_id: "",
    },
  });
  const [formStatus, setFormStatus] = useState<FetchStatus>(
    FetchStatusEnum.NONE
  );
  const [file, setFile] = useState<File | undefined>(undefined);
  const { tender, refresh } = useContext(TenderDataContext);
  const { id } = useParams();
  const [checkDialogOpen, setCheckDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const submitWithoutStatus = handleSubmit((data) => {
    let instance = { ...data };
    delete instance.status;
    sendData(instance);
  });
  const submitWithStatus = handleSubmit((data) => {
    sendData(data);
  });

  function sendData(dto: DtoType) {
    if (typeof tender === "object") {
      setFormStatus(FetchStatusEnum.LOADING);
      setCheckDialogOpen(false);
      axios
        .post(
          Api("employee/tender/form/status/" + id),
          objectToFormData({ ...dto, image: file, user_type: tender.user_type })
        )
        .then((res) => {
          console.log(res);
          close();
          enqueueSnackbar("تم اتخاذ الاجراء");
          refresh();
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar("تعذر في اتخاذ الاجراء", { variant: "error" });
        })
        .finally(() => {
          setFormStatus(FetchStatusEnum.NONE);
        });
    }
  }
  return (
    <Dialog
      maxWidth="md"
      component="form"
      onSubmit={function openCheckDialog() {}}
      {...dialogProps}
    >
      <SubmitTypeDialog
        open={checkDialogOpen}
        onClose={() => {
          setCheckDialogOpen(false);
        }}
        submitWithStatus={submitWithStatus}
        submitWithoutStatus={submitWithoutStatus}
      />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid display={"flex"} alignItems={"center"} mb={5} item xs={6}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              {title}
            </Typography>
          </Grid>
          <Grid display={"flex"} alignItems={"center"} mb={5} item md={6}>
            <Typography sx={{ mr: 2 }}>الحاله </Typography>
            <TextField fullWidth size="small" select {...register("status")}>
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <GridItem label="اسم البند">
            <TextField fullWidth size="small" />
          </GridItem>
          <GridItem label="تاريخ الانتهاء">
            <DatePicker
              slotProps={{ textField: { size: "small", fullWidth: true } }}
              sx={{ w: 1 }}
            />
          </GridItem>
          <GridItem label="ارفق عرض التقديم">
            <UploadFileInput
              size="sm"
              value={file}
              subTitle=""
              setValue={(file) => setFile(file)}
            />
          </GridItem>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <LoadingButton
          variant="contained"
          loading={formStatus === FetchStatusEnum.LOADING}
          type="button"
          onClick={() => {
            setCheckDialogOpen(true);
          }}
        >
          حفظ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  title: string;
  close: () => void;
} & DialogProps;