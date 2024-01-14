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
import { useState } from "react";

const options = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

const GridItem = (props: GridProps & { label: string }) => (
  <Grid item md={6} {...props}>
    <Typography variant="body1">{props.label}</Typography>
    {props.children}
  </Grid>
);

export default function BuyDialog(dialogProps: DialogProps) {
  const { register, handleSubmit } = useForm();

  const [endDate, setEndDate] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleFormSubmit = (data: unknown) => {
    console.log("form data", data);
  };

  return (
    <Dialog
      {...dialogProps}
      maxWidth="md"
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
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
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <GridItem label="قيمة المنافسة">
            <TextField {...register("price")} fullWidth size="small" />
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
            <TextField {...register("payment_number")} fullWidth size="small" />
          </GridItem>
          <GridItem label="مركز التكلفة">
            <TextField
              {...register("department_id")}
              fullWidth
              size="small"
              select
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
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
        <LoadingButton variant="contained" type="submit">
          حفظ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  title: string;
};
