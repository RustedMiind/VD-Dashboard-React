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
import axios from "axios";
import { Api } from "../../../../../../../constants";
import { objectToFormData } from "../../../../../../../methods";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { TenderItemStatus } from "../../../../../../../types/Tenders/Status.enum";
import { Department } from "../../../../../../../types";
import { TenderDataContext } from "../../../..";

const statusOptions: { value: TenderItemStatus; label: string }[] = [
  {
    value: TenderItemStatus.ENDED,
    label: "منتهي",
  },
  {
    value: TenderItemStatus.EXCLUDED,
    label: "مستعبد فني",
  },
  {
    value: TenderItemStatus.ONGOING,
    label: "جاري",
  },
  {
    value: TenderItemStatus.SENT,
    label: "مقدمة",
  },
];

const GridItem = (props: GridProps & { label: string }) => (
  <Grid item md={6} {...props}>
    <Typography variant="body1">{props.label}</Typography>
    {props.children}
  </Grid>
);

export default function BuyDialog(props: DialogProps) {
  const { register, handleSubmit, reset } = useForm({
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
  const { tender } = useContext(TenderDataContext);
  const { enqueueSnackbar } = useSnackbar();
  const [endDate, setEndDate] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [departments, setDepartments] = useState<Department[] | undefined>(
    undefined
  );

  const handleFormSubmit = handleSubmit((data) => {
    console.log("form data", data);
    if (typeof tender === "object") {
      setFormStatus(FetchStatusEnum.LOADING);
      axios
        .post(
          Api("employee/tender/form/status/" + id),
          objectToFormData({
            ...data,
            user_type: tender.user_type,
            image: file,
            end_date: endDate,
          })
        )
        .then(() => {
          enqueueSnackbar("تم اتخاذ الاجراء");
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
    reset();
  }, [props.open]);

  useEffect(() => {
    axios
      .get<{ departments: Department[] }>(Api("employee/all-departments"))
      .then((res) => {
        setDepartments(res.data.departments);
      })
      .catch(console.log);
  }, []);

  return (
    <Dialog
      {...props}
      maxWidth="md"
      component="form"
      onSubmit={handleFormSubmit}
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid display={"flex"} alignItems={"center"} mb={5} item xs={6}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              {"شراء المنافسة"}
            </Typography>
          </Grid>
          <Grid display={"flex"} alignItems={"center"} mb={5} item md={6}>
            <Typography sx={{ mr: 2 }}>الحاله </Typography>
            <TextField {...register("status")} fullWidth size="small" select>
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <GridItem label="قيمة المنافسة">
            <TextField fullWidth size="small" />
          </GridItem>
          <GridItem label="تاريخ الانتهاء">
            <DatePicker
              value={dayjs(endDate)}
              onChange={(date) => {
                setEndDate(date?.format() || "");
              }}
              slotProps={{ textField: { size: "small", fullWidth: true } }}
              sx={{ w: 1 }}
            />
          </GridItem>
          <GridItem {...register("iban")} label="الحساب البنكي">
            <TextField fullWidth size="small" />
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
              {departments?.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              ))}
            </TextField>
          </GridItem>
          <GridItem label="ارفاق ملف">
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
          loading={formStatus === FetchStatusEnum.LOADING}
          variant="contained"
          type="submit"
        >
          حفظ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
