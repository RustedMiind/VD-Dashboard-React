import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  DialogActions,
  GridProps,
  TextField,
  TextFieldProps,
  Button,
  DialogProps,
  MenuItem,
} from "@mui/material";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import { Envoy } from "../../../../types/Envoys/Envoy";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { Api } from "../../../../constants";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Contractor } from "../../../../types/Contractors/Contractor";
import { LoadingButton } from "@mui/lab";

const GridItem = (props: GridProps) => (
  <Grid item sx={{ p: 1 }} md={6} xs={12} {...props} />
);

const textFieldProps: TextFieldProps = {
  size: "small",
  fullWidth: true,
};

type Form = {
  name: string;
  email: string;
  phone: string;
  contractor_id: string;
};

function SetDialog({ addEnvoy, dialogProps, envoyToEdit }: PropsType) {
  const isEdit = !!envoyToEdit;

  const { register, reset, handleSubmit, control } = useForm<Form>({});
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<
    "disabled" | "none" | "error" | "loading"
  >("none");
  const submit = handleSubmit((data) => {
    setStatus("loading");
    (isEdit
      ? axios.put<{ representative: Envoy }>(
          Api(`employee/representative/update/${envoyToEdit.id}`),
          data
        )
      : axios.post<{ representative: Envoy }>(
          Api("employee/representative"),
          data
        )
    )
      .then(({ data }) => {
        addEnvoy(data.representative, isEdit);
        enqueueSnackbar("تم اضافة المندوب بنجاح");
        dialogProps?.onClose && dialogProps.onClose({}, "backdropClick");
        setStatus("none");
      })
      .catch((err) => {
        setStatus("error");
        enqueueSnackbar(
          err.response.data.msg ||
            err.response.message ||
            "تعذر في حفظ بيانات المندوب",
          {
            variant: "error",
          }
        );
      });
  });

  const [contractors, setContractors] = useState<undefined | Contractor[]>(
    undefined
  );

  // Fetch Constructors options
  useEffect(() => {
    setStatus("disabled");
    axios
      .get<{ contractors: Contractor[] }>(Api("employee/contractor"))
      .then(({ data }) => {
        console.log(data);
        setContractors(data.contractors);
        setStatus("none");
      })
      .catch((err) => {
        console.log(err);
        setContractors(undefined);
      });
  }, []);

  // Reset form inputs
  useEffect(() => {
    reset(
      isEdit
        ? {
            contractor_id: envoyToEdit.contractor_id?.toString(),
            email: envoyToEdit.email,
            name: envoyToEdit.name,
            phone: envoyToEdit.phone,
          }
        : {}
    );
  }, [dialogProps.open, isEdit, !contractors]);

  return (
    <Dialog {...dialogProps} component={"form"} onSubmit={submit}>
      <DialogTitle fontWeight={600}>
        {isEdit ? "تعديل مندوب" : "اضافة مندوب"}
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText color={"error.main"}>{error}</DialogContentText> */}
        <Grid container>
          <GridItem>
            <AddLabelToEl label="اسم المندوب" required>
              <TextField
                {...textFieldProps}
                {...register("name")}
                placeholder="اسم المندوب"
              />
            </AddLabelToEl>
          </GridItem>

          <GridItem>
            <AddLabelToEl label="رقم الجوال" required>
              <TextField
                {...textFieldProps}
                {...register("phone")}
                type="tel"
                placeholder="رقم الجوال"
              />
            </AddLabelToEl>
          </GridItem>

          <GridItem>
            <AddLabelToEl label="البريد الالكتروني">
              <TextField
                {...textFieldProps}
                {...register("email")}
                type="email"
                placeholder="البريد الالكتروني"
              />
            </AddLabelToEl>
          </GridItem>

          <GridItem>
            <AddLabelToEl label="المقاول" required>
              <Controller
                name="contractor_id"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...textFieldProps}
                    {...field}
                    select
                    placeholder="المقاول"
                  >
                    {contractors?.map((contractor) => (
                      <MenuItem key={contractor.id} value={contractor.id}>
                        {contractor.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </AddLabelToEl>
          </GridItem>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            dialogProps?.onClose && dialogProps.onClose({}, "backdropClick");
          }}
        >
          الغاء
        </Button>
        <LoadingButton
          loading={status === "loading"}
          disabled={status === "disabled"}
          variant="contained"
          type="submit"
        >
          حفظ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  dialogProps: DialogProps;
  envoyToEdit?: Envoy;
  addEnvoy: (envoy: Envoy, isEdit?: boolean) => void;
};

export default SetDialog;
