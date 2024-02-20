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
} from "@mui/material";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import { Envoy } from "../../../../types/Envoys/Envoy";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Api } from "../../../../constants";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Contractor } from "../../../../types/Contractors/Contractor";
import { LoadingButton } from "@mui/lab";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./CreateEditDialog.css";

// TODO::define helper variable
const GridItem = (props: GridProps) => (
  <Grid item sx={{ p: 1 }} md={6} xs={12} {...props} />
);
const textFieldProps: TextFieldProps = {
  size: "small",
  fullWidth: true,
};
type Form = {
  name: string | undefined;
  email: string | undefined | null;
  phone: string | undefined;
};

function CreateAndUpdateDialog({ dialogProps }: PropsType) {
  const { register, reset, handleSubmit, control } = useForm<Form>({});
  const { enqueueSnackbar } = useSnackbar();
  const [phone, setPhone] = useState("");

  const submit = handleSubmit((data) => {});

  return (
    <Dialog {...dialogProps} component={"form"} onSubmit={submit}>
      <DialogTitle fontWeight={600}>المهام</DialogTitle>
      <DialogContent>
        {/* <DialogContentText color={"error.main"}>{error}</DialogContentText> */}
        <Grid container>
          <GridItem>
            <AddLabelToEl label="اسم المندوب" required>
              <TextField
                {...textFieldProps}
                {...register("name")}
                placeholder="اسم المقاول"
              />
            </AddLabelToEl>
          </GridItem>

          <GridItem>
            <AddLabelToEl label="رقم الجوال" required>
              <PhoneInput
                defaultCountry="eg"
                value={phone}
                inputStyle={{ backgroundColor: "inherit" }}
                onChange={(phone) => setPhone(phone)}
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
        <LoadingButton variant="contained" type="submit">
          حفظ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  isCreate: boolean;
  dialogProps: DialogProps;
  contractorToEdit?: Contractor;
  addContractor: (contractor: Contractor, isEdit?: boolean) => void;
};

export default CreateAndUpdateDialog;
