import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  FormControlLabel,
  Grid,
  GridProps,
  IconButton,
  Paper,
  Stack,
  Checkbox,
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import AddLabelToEl from "../../../../../../components/AddLabelToEl";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  storeContractItemSchema,
  StoreContractItemSchemaType,
} from "../../../../../../methods/api/contracts";
import React from "react";

const ErrorMessage = (props: TypographyProps) => (
  <Typography variant="body2" color="error" {...props} />
);

const GridItem = ({
  schemaError,
  ...props
}: GridProps & { schemaError?: string }) => (
  <Grid item xs={12} lg={6} {...props}>
    {props.children}
    {schemaError && <ErrorMessage>{schemaError}</ErrorMessage>}
  </Grid>
);

const textFieldDefaultProps: TextFieldProps = {
  fullWidth: true,
};

function SetMainItemDialog({ onClose, open }: PropsType) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<StoreContractItemSchemaType>({
    // resolver: zodResolver(storeContractItemSchema),
  });

  const { append, remove, fields } = useFieldArray({
    control,
    name: "sub_items",
  });

  const submit = handleSubmit((data) => console.log("form data", data));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      component={"form"}
      onSubmit={submit}
      // maxWidth="lg"
      // fullWidth
      fullScreen
    >
      <DialogTitle>اضافة بند جديد</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <GridItem>
            <AddLabelToEl label="عنوان البند">
              <TextField label="عنوان البند" />
            </AddLabelToEl>
          </GridItem>
          <GridItem>
            <AddLabelToEl label="وصف البند">
              <TextField label="وصف البند" />
            </AddLabelToEl>
          </GridItem>
          <Grid item xs={12}>
            <Stack spacing={1} component={Paper} bgcolor={"Background"} p={2}>
              <Typography fontWeight={700} gutterBottom>
                البنود الفرعية
              </Typography>
              {fields.map((field, index) => (
                <Paper key={field.id} sx={{ py: 2, px: 1 }}>
                  <Typography gutterBottom>بند فرعي {index + 1}</Typography>
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={5.5}>
                      <TextField
                        label={"اسم البند الفرعي"}
                        size="small"
                        {...textFieldDefaultProps}
                        {...register(`sub_items.${index}.name`)}
                      />
                      <ErrorMessage>
                        {errors.sub_items?.[index]?.name?.message}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={5.5}>
                      <TextField
                        label={"مسرول البند الفرعي"}
                        size="small"
                        {...textFieldDefaultProps}
                        {...register(`sub_items.${index}.employee_id`)}
                      />
                      <ErrorMessage>
                        {errors.sub_items?.[index]?.name?.message}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack alignItems={"center"}>
                        <IconButton color="error" onClick={() => remove(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Stack direction={"row"} spacing={1}>
                    <Controller
                      control={control}
                      name={`sub_items.${index}.is_processing`}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value}
                              onChange={(e, checked) => field.onChange(checked)}
                            />
                          }
                          label="معاملات"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`sub_items.${index}.is_progress_bar`}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value}
                              onChange={(e, checked) => field.onChange(checked)}
                            />
                          }
                          label="النسبة المئوية"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`sub_items.${index}.is_attachment`}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value}
                              onChange={(e, checked) => field.onChange(checked)}
                            />
                          }
                          label="مرفقات"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`sub_items.${index}.is_mission`}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value}
                              onChange={(e, checked) => field.onChange(checked)}
                            />
                          }
                          label="المهمات"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`sub_items.${index}.is_letter`}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value}
                              onChange={(e, checked) => field.onChange(checked)}
                            />
                          }
                          label="خطابات"
                        />
                      )}
                    />
                  </Stack>
                </Paper>
              ))}
              <Button
                variant="outlined"
                onClick={() =>
                  append({
                    name: "",
                    is_attachment: false,
                    is_processing: false,
                    is_progress_bar: false,
                    employee_id: -1,
                  })
                }
              >
                اضافة بند فرعي
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          الغاء
        </Button>
        <Button color="primary" type="submit" variant="contained">
          حفظ
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  onClose: () => void;
  open: boolean;
};

export default SetMainItemDialog;
