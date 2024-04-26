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
import { CreateProcessingReplyContext } from "../CreateProcessingReplyContext";
import {
  storeContractProcessingReply,
  storeContractProcessingReplySchema,
  StoreContractProcessingReplySchemaType,
} from "../../../../../../../../methods/api/contracts/storeProcessingReply";

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
  } = useForm<StoreContractProcessingReplySchemaType>({
    resolver: zodResolver(storeContractProcessingReplySchema),
  });

  const { processingId } = useContext(CreateProcessingReplyContext);

  const submit = handleSubmit(async (data) => {
    if (!processingId) return;
    const storedProcessing = await storeContractProcessingReply(
      processingId,
      data
    );
    onSuccess(storedProcessing.data.comment_processing.id);
  });

  return (
    <Stack component={"form"} onSubmit={submit}>
      <DialogContent>
        <Grid container spacing={2}>
          <InputItem
            label={"الرد"}
            multiline
            minRows={2}
            {...register("comment")}
            schemaError={errors.comment?.message}
          />
          <InputItem
            label={"ملاحظة"}
            {...register("note")}
            schemaError={errors.note?.message}
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
