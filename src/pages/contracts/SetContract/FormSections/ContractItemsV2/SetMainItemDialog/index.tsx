import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
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
  MenuItem,
} from "@mui/material";
import AddLabelToEl from "../../../../../../components/AddLabelToEl";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  storeContractItemSchema,
  StoreContractItemSchemaType,
} from "../../../../../../methods/api/contracts";
import React, { useEffect, useState } from "react";
import SelectWithFilter from "../../../../../../components/SelectWithFilter";
import { DbOptionType } from "../../../../../../types/other/DbOptionType";
import axios from "axios";
import { Api } from "../../../../../../constants";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import ContractAddUsersSelect from "../../TermsAndTasks/SelectFromUsers";
import CustomFilePond from "../../../../../../components/CustomFilepond";
import { DateOnlyFormatString } from "../../../../../../constants/DateFormat";
import { LoadingButton } from "@mui/lab";

// TODO::define helpers variables ans subcomponents
const ErrorMessage = (props: TypographyProps) => (
  <Typography variant="body2" color="error" {...props} />
);
const GridItem = ({
  schemaError,
  fullWidth,
  ...props
}: GridProps & { schemaError?: string; fullWidth?: boolean }) => (
  <Grid item xs={12} lg={fullWidth ? undefined : 6} {...props}>
    {props.children}
    {schemaError && <ErrorMessage>{schemaError}</ErrorMessage>}
  </Grid>
);

const Separator = () => <GridItem fullWidth />;

const textFieldDefaultProps: TextFieldProps = {
  fullWidth: true,
};
type EngineeOptionType = { id: number; full_name: string };

//* Main Component
function SetMainItemDialog({ onClose, open }: PropsType) {
  //TODO:: Declare ansd define component state and variables
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<StoreContractItemSchemaType>({
    // resolver: zodResolver(storeContractItemSchema),
  });
  const [engineers, setEngineers] = useState<EngineeOptionType[]>([]);
  const [setselectedEngineeras, setSetselectedEngineeras] = useState<
    EngineeOptionType[]
  >([]);

  const { append, remove, fields } = useFieldArray({
    control,
    name: "sub_items",
  });

  // TODO::fetch data of selects
  useEffect(() => {
    setLoading(true);
    axios
      .post<{ data: EngineeOptionType[] }>(Api(`employee/employees`))
      .then((res) => {
        console.log("Engineer Date::", res?.data?.data);
        setEngineers(res?.data?.data);
      })
      .catch((err) => {
        setEngineers([]);
        console.log("Error in fetch data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Todo::handle form submit
  const submit = handleSubmit((data) => {
    // prepare our form data
    let employees = setselectedEngineeras.map((ele) => ele.id);
    let bodyData = { ...data, employees };

    console.log("bodyData", bodyData);
  });

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
          {/* Main Item Data title,description and manager */}
          {/* Title */}
          <GridItem>
            <AddLabelToEl label="عنوان البند">
              <TextField {...register("name")} label="عنوان البند" />
            </AddLabelToEl>
          </GridItem>
          {/* Description */}
          <GridItem>
            <AddLabelToEl label="وصف البند">
              <TextField {...register("description")} label="وصف البند" />
            </AddLabelToEl>
          </GridItem>
          {/* Manager */}
          <GridItem>
            <AddLabelToEl label="اختيار مدير المهمة">
              {loading ? (
                <Typography color={"info"}>جاري تحميل البيانات </Typography>
              ) : (
                <SelectWithFilter
                  select
                  onChange={(e) => {
                    setValue("manager_id", +e.target.value);
                  }}
                  options={engineers?.map((engineer) => ({
                    label: engineer.full_name ?? "",
                    value: engineer.id,
                  }))}
                ></SelectWithFilter>
              )}
            </AddLabelToEl>
          </GridItem>

          {/* Start/end Dates */}
          <Separator />
          <GridItem>
            <AddLabelToEl label="تاريخ البداية">
              <Controller
                control={control}
                name="start_date"
                render={({ field }) => (
                  <DatePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(newValue) => {
                      field.onChange(newValue?.format(DateOnlyFormatString));
                    }}
                  />
                )}
              />
            </AddLabelToEl>
          </GridItem>
          <GridItem>
            <AddLabelToEl label="تاريخ النهاية">
              <Controller
                control={control}
                name="end_date"
                render={({ field }) => (
                  <DatePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(newValue) => {
                      field.onChange(newValue?.format(DateOnlyFormatString));
                    }}
                  />
                )}
              />
            </AddLabelToEl>
          </GridItem>
          {/* Add users */}
          <Separator />
          <GridItem>
            <AddLabelToEl label="اضافة مستخدمين للمهام">
              <ContractAddUsersSelect
                disabled={loading}
                users={engineers}
                selectedUsers={setselectedEngineeras}
                setValue={setSetselectedEngineeras}
              />
            </AddLabelToEl>
          </GridItem>

          {/* Attachments */}
          <Separator />
          <GridItem>
            <AddLabelToEl label="المرفقات">
              <Controller
                name="attachments"
                control={control}
                render={({ field }) => (
                  <Box width={"100%"}>
                    <CustomFilePond
                      {...field}
                      maxFiles={4}
                      onupdatefiles={(files) => {
                        field.onChange(files.map((file) => file.file));
                      }}
                      allowMultiple={true}
                      imagePreviewMinHeight={200}
                    />
                  </Box>
                )}
              />
            </AddLabelToEl>
          </GridItem>

          {/* Subitems of main item */}
          <Grid item xs={12}>
            <Stack spacing={1} component={Paper} bgcolor={"Background"} p={2}>
              <Typography fontWeight={700} gutterBottom>
                البنود الفرعية
              </Typography>
              {fields.map((field, index) => (
                <Paper key={field.id} sx={{ py: 2, px: 1 }}>
                  <Typography gutterBottom>بند فرعي {index + 1}</Typography>
                  <Grid container spacing={1} alignItems={"center"}>
                    {/* Sub item title */}
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
                    {/* Sub item engineer */}
                    <Grid item xs={5.5}>
                      <TextField
                        disabled={loading}
                        placeholder={"المهندس المسئول عن البند الفرعي"}
                        size="small"
                        select
                        variant="outlined"
                        fullWidth
                        {...register(`sub_items.${index}.employee_id`)}
                      >
                        {setselectedEngineeras?.map((employee) => (
                          <MenuItem key={employee.id} value={employee.id}>
                            {employee.full_name}
                          </MenuItem>
                        ))}
                      </TextField>
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
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ width: "fit-content" }}
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
        <Button color="error" onClick={onClose} disabled={isSubmitting}>
          الغاء
        </Button>
        <LoadingButton
          loading={isSubmitting}
          color="primary"
          type="submit"
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{ px: 4 }}
        >
          حفظ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  onClose: () => void;
  open: boolean;
};

export default SetMainItemDialog;
