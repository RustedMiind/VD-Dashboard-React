import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import RequiredSymbol from "../../../../../components/RequiredSymbol";
import { RadioGroup } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Api } from "../../../../../constants";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
type FormFields = {
  title: string;
  phone: string;
  inside_saudi: 0 | 1;
};
export default function AddDialog({
  open,
  handleClose,
  CommunicationData,
  type,
  idToEdit,
}: PropsType) {
  const snackbar = useSnackbar();
  const [editData, setEditData] = useState<CardDataType | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await axios.post(
        Api(
          type === "add"
            ? "employee/client/contact-us/store"
            : `employee/client/contact-us/${idToEdit}`
        ),
        data
      );
      snackbar.enqueueSnackbar("تم حفظ ");
      CommunicationData();
      handleClose();
    } catch (err) {
      snackbar.enqueueSnackbar(" تعذر في حفظ  ", {
        variant: "error",
      });
    }
  };
  useEffect(() => {
    if (idToEdit) {
      axios
        .get<{ contact_us: CardDataType }>(
          Api(`employee/client/contact-us/${idToEdit}`)
        )
        .then((res) => {
          setEditData(res.data.contact_us);
        })
        .catch((err) => {})
        .finally(() => {});
    }
  }, [idToEdit]);
  useEffect(() => {
    if (editData && type == "edit") {
      reset({
        title: editData?.title,
        phone: editData?.phone,
        inside_saudi: editData?.inside_saudi,
      });
    } else {
      reset({
        title: "",
        phone: "",
      });
    }
  }, [type, editData]);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={"sm"}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle> {type === "add" ? "اضافة" : "تعديل"}</DialogTitle>
        <DialogContent>
          <Grid container p={1} spacing={4}>
            <Grid item md={6}>
              <Typography>
                العنوان
                <RequiredSymbol />
              </Typography>
              <TextField
                {...register("title")}
                placeholder="العنوان"
                type="text"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item md={6}>
              <Typography>
                رقم التليفون
                <RequiredSymbol />
              </Typography>
              <TextField
                {...register("phone")}
                placeholder="رقم التليفون"
                type="number"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item md={6}>
              <Controller
                control={control}
                name="inside_saudi"
                defaultValue={editData?.inside_saudi ? 0 : 1}
                render={({ field }) => {
                  return (
                    <FormControl>
                      <FormLabel>المنطقة</FormLabel>
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label="داخل السعودية"
                        />
                        <FormControlLabel
                          value={0}
                          control={<Radio />}
                          label="خارج السعودية"
                        />
                      </RadioGroup>
                    </FormControl>
                  );
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ display: "flex ", justifyContent: "center" }}>
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            type="submit"
          >
            {type === "add" ? "اضافة" : "تعديل"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

type PropsType = {
  open: boolean;
  type: "add" | "edit";
  handleClose: () => void;
  CommunicationData: () => void;
  idToEdit: number | undefined;
};
type CardDataType = {
  id: number;
  inside_saudi: 0 | 1;
  phone: string;
  title: string;
  type: string;
  created_at: string;
  updated_at: string;
};
