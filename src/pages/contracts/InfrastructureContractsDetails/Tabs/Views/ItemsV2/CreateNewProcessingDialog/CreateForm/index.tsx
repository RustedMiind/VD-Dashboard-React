import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  GridProps,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  storeContractProcessing,
  storeContractProcessingSchema,
  StoreContractProcessingSchemaType,
} from "../../../../../../../../methods/api/contracts/storeProcessing";
import { forwardRef, useContext } from "react";
import AddLabelToEl from "../../../../../../../../components/AddLabelToEl";
import { LoadingButton } from "@mui/lab";
import { OpenCreateProcessingContext } from "../CreateProcessingContextProvider";

const GridItem = (props: GridProps) => <Grid item xs={12} md={6} {...props} />;

const ErrorTypography = (props: TypographyProps) => (
  <Typography variant="caption" color="error" {...props} />
);

const InputItem = forwardRef<
  HTMLInputElement,
  TextFieldProps & {
    label?: string;
    gridProps?: GridProps;
    schemaError?: string;
  }
>(({ gridProps, schemaError, ...props }, ref) => {
  return (
    <GridItem {...gridProps}>
      <AddLabelToEl label={props.label || ""}>
        <TextField fullWidth placeholder={props.label} ref={ref} {...props} />
        {schemaError && <ErrorTypography>{schemaError}</ErrorTypography>}
      </AddLabelToEl>
    </GridItem>
  );
});

function CreateForm({ onClose, onSuccess }: PropsType) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<StoreContractProcessingSchemaType>({
    resolver: zodResolver(storeContractProcessingSchema),
  });

  const { refreshProcessing, contractSubItemId } = useContext(
    OpenCreateProcessingContext
  );

  const submit = handleSubmit(async (data) => {
    if (!contractSubItemId) return;
    const storedProcessing = await storeContractProcessing(
      contractSubItemId,
      data
    );
    onSuccess(storedProcessing.data.processing.id);
  });

  return (
    <Stack component={"form"} onSubmit={submit}>
      <DialogContent>
        <Grid container spacing={2}>
          <InputItem
            label={"رقم الطلب"}
            {...register("order_num")}
            schemaError={errors.order_num?.message}
          />
          <InputItem
            label={"رقم الخطاب"}
            {...register("letter_num")}
            schemaError={errors.letter_num?.message}
          />
          <InputItem
            label={"موضوع المعاملة"}
            multiline
            minRows={2}
            {...register("subject")}
            schemaError={errors.subject?.message}
          />
          <InputItem
            label={"الجهة المرسل لها المعاملة"}
            {...register("receiver")}
            schemaError={errors.receiver?.message}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          الغاء
        </Button>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          الحفظ
        </LoadingButton>
      </DialogActions>
    </Stack>
  );
}

type PropsType = {
  onClose: () => void;
  onSuccess: (processingId: number) => void;
};

export default CreateForm;
