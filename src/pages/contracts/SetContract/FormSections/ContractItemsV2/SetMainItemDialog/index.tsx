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

// TODO::define helpers variables ans subcomponents
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
type EngineeOptionType = { id: number; full_name: string };

//* Main Component
function SetMainItemDialog({ onClose, open }: PropsType) {
  //TODO:: Declare ansd define component state and variables
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
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
          <Stack
            direction={"row"}
            margin={"3rem 1.3rem"}
            spacing={2}
            width={"95%"}
            padding={"2rem 1rem 1rem"}
            borderRadius={"12px"}
          >
            <Stack spacing={1} width={"48%"} alignItems={"start"}>
              <Typography>تاريخ البداية</Typography>
              <DatePicker
                //defaultValue={dayjs("2024-04-17")}
                maxDate={dayjs("2024-04-25")} //for validation cant choose date > maxDate
                value={startDate}
                onChange={(newValue) => {
                  setValue("start_date", newValue?.format("DD/MM/YYYY") || "");
                  setStartDate(newValue);
                }}
                sx={{ width: "90%" }}
              />
            </Stack>
            <Stack spacing={1} width={"48%"} alignItems={"start"}>
              <Typography>تاريخ الانتهاء</Typography>
              <DatePicker
                //defaultValue={dayjs("2024-04-17")}
                maxDate={dayjs("2024-04-25")} //for validation cant choose date > maxDate
                value={endDate}
                onChange={(newValue) => {
                  setValue("end_date", newValue?.format("DD/MM/YYYY") || "");
                  setEndDate(newValue);
                }}
                sx={{ width: "90%" }}
              />
            </Stack>
          </Stack>
          {/* Add users */}
          <Stack
            spacing={2}
            width={"95%"}
            p={2}
            margin={"3rem 1.3rem"}
            borderRadius={"12px"}
            justifyContent="center"
            alignItems="start"
          >
            <Typography variant="h6">اضافة مستخدمين للمهام</Typography>
            <ContractAddUsersSelect
              disabled={loading}
              users={engineers}
              selectedUsers={setselectedEngineeras}
              setValue={setSetselectedEngineeras}
            />
          </Stack>

          {/* Attachments */}
          <Stack
            spacing={2}
            sx={{
              width: "70%",
              padding: "1rem",
              marginBottom: "2rem",
              borderRadius: "12px",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <Typography variant="h6">المرفقات</Typography>
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
          </Stack>

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
