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
import { useContext, useEffect, useState } from "react";
import { statusOptions } from "./BuyDialog";
import axios, { AxiosError } from "axios";
import { Api } from "../../../../../../../constants";
import SubmitTypeDialog from "./SubmitTypeDialog";
import { FetchStatus } from "../../../../../../../types/FetchStatus";
import { FetchStatusEnum } from "../../../../../../../types/FetchStatusEnum";
import { useSnackbar } from "notistack";
import { TenderDataContext } from "../../../..";
import { useParams } from "react-router-dom";
import { objectToFormData } from "../../../../../../../methods";
import { TenderStep } from "../../../../../../../types/Tenders/Status.enum";
import { Media } from "../../../../../../../types";
import MediaMenuList from "../MediaMenu";
import { uploadFileInChunks } from "../../../../../../../methods/uploadChunks";
import AddLabelToEl from "../../../../../../../components/AddLabelToEl";

const GridItem = (props: GridProps & { label: string; required?: boolean }) => (
  <Grid item md={6} {...props}>
    <AddLabelToEl
      label={props.label}
      required={props.required}
      labelTypographyProps={{ gutterBottom: false }}
    >
      {props.children}
    </AddLabelToEl>
  </Grid>
);

export default function OthersDialog({
  title,
  onSubmit,
  close,
  endDate,
  userType,
  uploadedFile,
  status,
  onDeleteMedia,
  ...dialogProps
}: PropsType) {
  const { register, handleSubmit, reset } = useForm<DtoType>({
    defaultValues: {
      status: "-1",
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

  useEffect(() => {
    reset({
      status: status?.toString(),
    });
  }, [dialogProps.open]);

  function sendImage(dto?: Record<string, unknown>) {
    return new Promise((resolve, reject) => {
      // if (!file[0]) reject("");
      file
        ? uploadFileInChunks(
            file as File,
            1024 ** 2 * 10,
            Api("employee/tender/form/status/" + id),
            dto
          )
            .then(resolve)
            .catch(reject)
        : axios
            .post(Api("employee/tender/form/status/" + id), dto)
            .then(resolve)
            .catch(reject);
    });
  }

  function sendData(dto: DtoType) {
    if (typeof tender === "object") {
      setFormStatus(FetchStatusEnum.LOADING);
      setCheckDialogOpen(false);
      sendImage({
        ...dto,
        user_type: userType,
      })
        // axios
        //   .post(
        //     Api("employee/tender/form/status/" + id),
        //     objectToFormData({
        //       ...dto,
        //       user_type: userType,
        //     })
        //   )
        .then((res) => {
          console.log(res);
          close();
          enqueueSnackbar("تم اتخاذ الاجراء");
          refresh();
        })
        .catch((err: AxiosError<{ msg?: string }>) => {
          console.log(err);
          enqueueSnackbar(err.response?.data?.msg || "تعذر في اتخاذ الاجراء", {
            variant: "error",
          });
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
            <TextField value={title} disabled fullWidth size="small" />
          </GridItem>
          <GridItem label="تاريخ الانتهاء">
            <TextField value={endDate} disabled fullWidth size="small" />
          </GridItem>
          <GridItem label="ارفق عرض التقديم" required>
            <MediaMenuList media={uploadedFile} onDeleteMedia={onDeleteMedia} />
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
  endDate?: string;
  userType: TenderStep;
  uploadedFile?: Media[];
  status?: number;
  onDeleteMedia: (mediaId: number) => void;
} & DialogProps;
