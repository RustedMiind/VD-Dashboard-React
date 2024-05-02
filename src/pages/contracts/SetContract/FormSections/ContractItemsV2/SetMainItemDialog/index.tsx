import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
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
  MenuList,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddLabelToEl from "../../../../../../components/AddLabelToEl";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contractItemSchemaInitial,
  contractItemToStoreSchema,
  contractSubItemInital,
  deleteContractItemMedia,
  storeContractItem,
  storeContractItemSchema,
  StoreContractItemSchemaType,
} from "../../../../../../methods/api/contracts";
import React, { useContext, useEffect, useState } from "react";
import SelectWithFilter from "../../../../../../components/SelectWithFilter";
import axios from "axios";
import { Api } from "../../../../../../constants";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import ContractAddUsersSelect from "../../TermsAndTasks/SelectFromUsers";
import CustomFilePond from "../../../../../../components/CustomFilepond";
import { DateOnlyFormatString } from "../../../../../../constants/DateFormat";
import { LoadingButton } from "@mui/lab";
import { ContractDetailsContext } from "../../../ContractDetailsContext";
import { useSnackbar } from "notistack";
import { getContractItem } from "../../../../../../methods/api/contracts/getItem";
import { ContractItem } from "../../../../../../types/Contracts/ContractItems";
import { onlyDateBetween } from "../../../../../../methods/DayjsDatePicker";

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
function SetMainItemDialog({ onClose, open, itemId }: PropsType) {
  const isEdit = !!itemId;
  //TODO:: Declare ansd define component state and variables
  const [loading, setLoading] = useState(false);
  const [contractItem, setContractItem] = useState<undefined | ContractItem>(
    undefined
  );
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StoreContractItemSchemaType>({
    resolver: zodResolver(storeContractItemSchema),
  });
  const [engineers, setEngineers] = useState<EngineeOptionType[]>([]);
  const [setselectedEngineers, setSetSelectedEngineers] = useState<
    EngineeOptionType[]
  >([]);
  const { contract, refreshContract } = useContext(ContractDetailsContext);
  const { append, remove, fields } = useFieldArray({
    control,
    name: "sub_items",
  });
  const { enqueueSnackbar } = useSnackbar();

  console.log("errors ", errors);

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

  const fetchItemData = async (itemId: number) => {
    try {
      const {
        data: { contract_item },
      } = await getContractItem(itemId);
      if (!contract_item) throw new Error("Couldn't get the item details");
      setContractItem(contract_item);
      setSetSelectedEngineers(
        contract_item?.contract_item_employees?.map(({ employee }) => ({
          full_name: employee?.full_name || "",
          id: employee?.id || NaN,
        })) || []
      );
      reset(contractItemToStoreSchema(contract_item));
    } catch (error) {
      enqueueSnackbar("تعذر في تحميل بيانات البند للتعديل", {
        variant: "error",
      });
      setContractItem(undefined);
      onClose();
    }
  };

  useEffect(() => {
    setContractItem(undefined);
    reset(contractItemSchemaInitial);
    setSetSelectedEngineers([]);
    if (!isEdit) {
    } else {
      fetchItemData(itemId);
    }
  }, [itemId]);

  // Todo::handle form submit
  const submit = handleSubmit(async (data) => {
    try {
      if (!contract)
        throw new Error(
          `Cannot save contract item, contract is ${typeof contract}`
        );
      let employees = setselectedEngineers.map((ele) => ele.id);
      const res = await storeContractItem(
        { id: contract.id, itemId },
        data,
        employees
      );
      console.log(res.data);
      enqueueSnackbar("تم حفظ البند بنجاح");
      refreshContract?.();
      // prepare our form data
      onClose();
    } catch (error) {
      enqueueSnackbar("تعذر في حفظ البند", {
        variant: "error",
      });
    }
  });

  if (isEdit && !contractItem) return <React.Fragment />;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      component={"form"}
      onSubmit={submit}
      maxWidth="lg"
      fullWidth
      // fullScreen
    >
      <DialogTitle>
        {isEdit ? `تعديل بند ${contractItem?.name}` : "اضافة بند جديد"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Main Item Data title,description and manager */}
          {/* Title */}
          <GridItem schemaError={errors.name?.message}>
            <AddLabelToEl label="عنوان البند">
              <TextField {...register("name")} label="عنوان البند" />
            </AddLabelToEl>
          </GridItem>
          {/* Description */}
          <GridItem schemaError={errors.description?.message}>
            <AddLabelToEl label="وصف البند">
              <TextField {...register("description")} label="وصف البند" />
            </AddLabelToEl>
          </GridItem>
          {/* Manager */}
          <GridItem schemaError={errors.manager_id?.message}>
            <AddLabelToEl label="اختيار مدير المهمة">
              <Controller
                name="manager_id"
                control={control}
                render={({ field }) => (
                  <SelectWithFilter
                    select
                    value={field.value}
                    onChange={field.onChange}
                    options={engineers?.map((engineer) => ({
                      label: engineer.full_name ?? "",
                      value: engineer.id,
                    }))}
                  />
                )}
              />
            </AddLabelToEl>
          </GridItem>

          {/* Start/end Dates */}
          <Separator />
          <GridItem schemaError={errors.start_date?.message}>
            <AddLabelToEl label="تاريخ البداية">
              <Controller
                control={control}
                name="start_date"
                render={({ field }) => (
                  <DatePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    shouldDisableDate={
                      contract?.date && contract.end_date
                        ? onlyDateBetween(
                            dayjs(contract.date),
                            dayjs(contract.end_date)
                          )
                        : undefined
                    }
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(newValue) => {
                      field.onChange(newValue?.format(DateOnlyFormatString));
                    }}
                  />
                )}
              />
            </AddLabelToEl>
          </GridItem>
          <GridItem schemaError={errors.end_date?.message}>
            <AddLabelToEl label="تاريخ النهاية">
              <Controller
                control={control}
                name="end_date"
                render={({ field }) => (
                  <DatePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    value={field.value ? dayjs(field.value) : null}
                    shouldDisableDate={
                      contract?.date && contract.end_date
                        ? onlyDateBetween(
                            dayjs(contract.date),
                            dayjs(contract.end_date)
                          )
                        : undefined
                    }
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
                selectedUsers={setselectedEngineers}
                setValue={setSetSelectedEngineers}
              />
            </AddLabelToEl>
          </GridItem>

          {/* Attachments */}
          <Separator />
          <GridItem>
            <AddLabelToEl label="المرفقات">
              <MenuList>
                {contractItem?.media?.map((media) => (
                  <ListItem key={media.id}>
                    <ListItemIcon>
                      <IconButton
                        component="a"
                        href={media.original_url}
                        target="_blank"
                      >
                        <FolderOpenIcon />
                      </IconButton>
                    </ListItemIcon>

                    <ListItemText sx={{ flexGrow: 1 }}>
                      {media.file_name}
                    </ListItemText>
                    <IconButton
                      onClick={async () => {
                        try {
                          if (!itemId) throw new Error();
                          await deleteContractItemMedia(itemId, media.id);
                          enqueueSnackbar("تم حذف الملف بنجاج");
                          fetchItemData(itemId);
                        } catch (error) {
                          enqueueSnackbar("تعذر في حذف الملف", {
                            variant: "error",
                          });
                        }
                      }}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </MenuList>
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
              {fields.map((field, index, allFields) => (
                <Paper key={field.id} sx={{ py: 2, px: 1 }}>
                  <Typography gutterBottom>بند فرعي {index + 1}</Typography>
                  <Grid container spacing={1}>
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
                      <Controller
                        control={control}
                        name={`sub_items.${index}.employee_id`}
                        render={({ field }) => (
                          <TextField
                            disabled={loading}
                            placeholder={"المهندس المسئول عن البند الفرعي"}
                            size="small"
                            select
                            variant="outlined"
                            fullWidth
                            {...field}
                          >
                            {setselectedEngineers?.map((employee) => (
                              <MenuItem key={employee.id} value={employee.id}>
                                {employee.full_name}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />

                      <ErrorMessage>
                        {errors.sub_items?.[index]?.employee_id?.message}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack alignItems={"center"}>
                        <IconButton
                          color="error"
                          onClick={() => remove(index)}
                          disabled={allFields.length <= 1}
                        >
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
                onClick={() => append(contractSubItemInital)}
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
  itemId?: number;
};

export default SetMainItemDialog;
