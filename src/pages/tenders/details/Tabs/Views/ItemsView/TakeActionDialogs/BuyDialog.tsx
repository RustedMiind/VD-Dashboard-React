import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  Grid,
  GridProps,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";
import UploadFileInput from "../../../../../../../components/UploadFileInput";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { FetchStatus } from "../../../../../../../types/FetchStatus";
import { FetchStatusEnum } from "../../../../../../../types/FetchStatusEnum";
import axios, { AxiosError } from "axios";
import { Api } from "../../../../../../../constants";
import { objectToFormData } from "../../../../../../../methods";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import {
  TenderItemStatus,
  TenderPay,
  TenderStep,
} from "../../../../../../../types/Tenders/Status.enum";
import {
  Department,
  Management,
  Media,
  TenderPayment,
} from "../../../../../../../types";
import { TenderDataContext } from "../../../..";
import { DtoType } from "./DtoType";
import SubmitTypeDialog from "./SubmitTypeDialog";
import CustomFilePond from "../../../../../../../components/CustomFilepond";
import { FileBondState } from "../../../../../../../types/FileBondState";
import MediaMenuList from "../MediaMenu";
import { uploadFileInChunks } from "../../../../../../../methods/uploadChunks";
import AddLabelToEl from "../../../../../../../components/AddLabelToEl";

export const statusOptions: { value: TenderItemStatus; label: string }[] = [
  {
    value: TenderItemStatus.ENDED,
    label: "منتهي",
  },

  {
    value: TenderItemStatus.ONGOING,
    label: "جاري",
  },
];

export const buyOptions: { value: TenderPay; label: string }[] = [
  {
    value: TenderPay.PAYED,
    label: "تأكيد الدفع",
  },
  {
    value: TenderPay.NOTPAYED,
    label: "رفض الدفع",
  },
];

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

export default function BuyDialog({
  close,
  uploadedFile,
  status,
  buyTender,
  onDeleteMedia,
  ...props
}: PropsType) {
  const { register, handleSubmit, reset } = useForm<DtoType>({
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
  const { id } = useParams();
  const { tender, refresh } = useContext(TenderDataContext);
  const { enqueueSnackbar } = useSnackbar();
  const [endDate, setEndDate] = useState("");
  const [file, setFile] = useState<FileBondState>([]);
  const [managements, setManagements] = useState<Management[] | undefined>(
    undefined
  );

  const [checkDialogOpen, setCheckDialogOpen] = useState(false);
  const submitWithoutStatus = handleSubmit((data) => {
    let instance = { ...data };
    delete instance.status;
    sendData(instance);
  });
  const submitWithStatus = handleSubmit((data) => {
    sendData(data);
  });

  function sendImage(dto?: Record<string, unknown>) {
    return new Promise((resolve, reject) => {
      // if (!file[0]) reject("");
      file[0]
        ? uploadFileInChunks(
            file[0] as File,
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
      const obj = {
        ...dto,
        user_type: TenderStep.PURCHASE,
      };
      console.log(obj);

      sendImage(obj)
        .then((res) => {
          // axios
          //   .post(
          //     Api("employee/tender/form/status/" + id),

          //     objectToFormData(obj)
          //   )
          //   .then((res) => {
          console.log(res);
          close();
          enqueueSnackbar("تم اتخاذ الاجراء");
          refresh();
          // });
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

  const handleFormSubmit = handleSubmit((data) => {
    console.log("form data", data);
    if (typeof tender === "object") {
      setFormStatus(FetchStatusEnum.LOADING);
      axios
        .post(
          Api("employee/tender/form/status/" + id),
          objectToFormData({
            ...data,
            user_type: props.userType,
            image: file,
            end_date: endDate,
          })
        )
        .then(() => {
          enqueueSnackbar("تم اتخاذ الاجراء");
          refresh();
        })
        .catch(() => {
          enqueueSnackbar("تعذر في اتخاذ الاجراء", { variant: "error" });
        })
        .finally(() => {
          setFormStatus(FetchStatusEnum.NONE);
        });
    }
  });

  useEffect(() => {
    reset({
      status: status?.toString(),
      iban: buyTender?.bank_account,
      reciept_number: buyTender?.payment_number,
      department_id: buyTender?.department_id?.toString(),
    });
  }, [props.open]);

  useEffect(() => {
    axios
      .get<{ managements: Management[] }>(Api("employee/all-managements"))
      .then((res) => {
        setManagements(res.data.managements);
      })
      .catch(console.log);
  }, []);

  let staticData = { value: "", endDate: "" };
  if (typeof tender === "object") {
    staticData = {
      endDate: tender.tender_tasks?.dete_buy_tender || "",
      value: `${tender.tenderdata?.price}` || "",
    };
  }

  return (
    <Dialog
      {...props}
      maxWidth="md"
      component="form"
      onSubmit={handleFormSubmit}
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
              {"شراء المنافسة"}
            </Typography>
          </Grid>
          <Grid display={"flex"} alignItems={"center"} mb={5} item md={6}>
            <Typography sx={{ mr: 2 }}>الحاله </Typography>
            <TextField
              {...register("status")}
              defaultValue={status}
              fullWidth
              size="small"
              select
            >
              {buyOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <GridItem label="قيمة المنافسة">
            <TextField value={staticData.value} fullWidth size="small" />
          </GridItem>
          <GridItem label="تاريخ الانتهاء">
            <TextField fullWidth size="small" value={staticData.endDate} />
          </GridItem>
          <GridItem label="الحساب البنكي">
            <TextField {...register("iban")} fullWidth size="small" />
          </GridItem>
          <GridItem label="رقم السداد">
            <TextField {...register("reciept_number")} fullWidth size="small" />
          </GridItem>
          <GridItem label="مركز التكلفة">
            <TextField
              {...register("department_id")}
              fullWidth
              size="small"
              select
            >
              {managements?.map((management) => (
                <MenuItem key={management.id} value={management.id?.toString()}>
                  {management.name}
                </MenuItem>
              ))}
            </TextField>
          </GridItem>
          <GridItem label="ارفاق ملف" required>
            <MediaMenuList media={uploadedFile} onDeleteMedia={onDeleteMedia} />
            <CustomFilePond
              files={file}
              onupdatefiles={(fileItems) => {
                setFile(fileItems.map((fileItem) => fileItem.file));
              }}
            />
            {/* <UploadFileInput
              size="sm"
              value={file}
              subTitle=""
              setValue={(file) => setFile(file)}
            /> */}
          </GridItem>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <LoadingButton
          loading={formStatus === FetchStatusEnum.LOADING}
          variant="contained"
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
  close: () => void;
  userType: TenderStep;
  uploadedFile?: Media[];
  status?: number;
  buyTender?: TenderPayment;
  onDeleteMedia: (mediaId: number) => void;
} & DialogProps;
