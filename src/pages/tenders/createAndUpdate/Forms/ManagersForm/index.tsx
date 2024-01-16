import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
  TypographyProps,
} from "@mui/material";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import { GridItem } from "../../GridItem";
import { DatePicker } from "@mui/x-date-pickers";
import { TenderContext } from "../../TenderCondext";
import { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Api } from "../../../../../constants";
import { initialTenderManagersState, reducer, stateToPostDto } from "./reducer";
import generateReducerAction from "../../../../../methods/conversions/generateReducerAction";
import dayjs from "dayjs";
import getFormOptions from "../../getFormOptions";
import SelectWithFilter from "../../../../../components/SelectWithFilter";
import { useSnackbar } from "notistack";
import { AxiosErrorType } from "../../../../../types/Axios";
import { LaravelValidationError } from "../../../../../types/LaravelValidationError";
import { joinObjectValues } from "../../../../../methods/joinObjectValues";
import { FormStatus } from "../../../../../types/FormStatus";
import { LoadingButton } from "@mui/lab";

function ManagersForm() {
  const [error, setError] = useState<undefined | React.ReactNode>(undefined);
  const snackbar = useSnackbar();
  const tenderContext = useContext(TenderContext),
    [form, dispatch] = useReducer(reducer, initialTenderManagersState),
    [options, setOptions] = useState<OptionsType>({});
  useEffect(getOptions, [typeof tenderContext.tender]);
  const [formStatus, setFormStatus] = useState<FormStatus>("none");
  const inputProps = {
    loading: formStatus === "loading",
    disabled: formStatus === "loading" || formStatus === "disabled",
  };
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (typeof tenderContext.tender === "object") {
      setFormStatus("loading");
      const path = tenderContext.tender.tender_tasks?.id
        ? "/" + tenderContext.tender.tender_tasks.id
        : "";
      axios
        .post<{ data: unknown }>(
          Api(`employee/tender/task${path}`),
          stateToPostDto(form, tenderContext.tender?.id.toString() || "")
        )
        .then((res) => {
          tenderContext.getTenderData && tenderContext.getTenderData();
          setError(undefined);
          snackbar.enqueueSnackbar(
            path ? "تم تعديل مهام المنافسة بنجاح" : "تم حفظ معام المنافسة"
          );
        })
        .catch((err: AxiosErrorType<LaravelValidationError<unknown>>) => {
          snackbar.enqueueSnackbar(
            err.response?.data?.msg ||
              (path
                ? "تعذر في تعديل مهام المنافسة"
                : "تعذر في حفظ مهام المنافسة"),
            {
              variant: "error",
            }
          );
          setError(joinObjectValues(err.response?.data?.data));
        })
        .finally(() => {
          setFormStatus("none");
        });
    }
  }
  useEffect(() => {
    if (
      typeof tenderContext.tender === "object" &&
      tenderContext.tender.tender_tasks
    ) {
      dispatch({
        type: "EXTRACT_DTO",
        payload: tenderContext.tender.tender_tasks,
      });
    }
  }, [tenderContext.tenderId, typeof tenderContext.tender]);
  // useEffect();
  return (
    <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <Typography color={"error.main"}>{error}</Typography>
      </Grid>
      {/* Managers Section */}
      <SectionTitle>مهام المنافسة (المسؤولين عن المنافسة)</SectionTitle>
      <GridItem>
        {/* Select only from tenders department */}
        <AddLabelToEl label="المهندس المسؤول عن متابعة المنافسة" required>
          <SelectWithFilter
            select
            size="small"
            value={form.managerId}
            onChange={(e) => {
              dispatch(generateReducerAction("SET_MANAGER_ID", e.target.value));
            }}
            options={options.departmentEmployee?.map((i) => ({
              label: i.name,
              value: i.value,
            }))}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="تاريخ انتهاء الموافقة" required>
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            disablePast
            value={dayjs(form.approvalEndDate)}
            onChange={(date) => {
              dispatch(
                generateReducerAction(
                  "SET_APPROVAL_END_DATE",
                  date?.format() || ""
                )
              );
            }}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="المهندس المسؤول عن شراء المنافسة" required>
          <SelectWithFilter
            select
            size="small"
            value={form.purchaseManagerId}
            onChange={(e) => {
              dispatch(
                generateReducerAction("SET_PURCHASE_MANAGER_ID", e.target.value)
              );
            }}
            options={options.allEmployees?.map((i) => ({
              label: i.name,
              value: i.value,
            }))}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>{" "}
      <GridItem>
        <AddLabelToEl label="تاريخ وموعد الشراء" required>
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            disablePast
            value={dayjs(form.purchaseDate)}
            onChange={(date) => {
              dispatch(
                generateReducerAction("SET_PURCHASE_DATE", date?.format() || "")
              );
            }}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      {/* Technical file section */}
      <SectionTitle>الملف الفني</SectionTitle>
      <GridItem>
        <AddLabelToEl label="المهندس المسؤول عن الملف الفني" required>
          <SelectWithFilter
            select
            size="small"
            value={form.technicalManager}
            onChange={(e) => {
              dispatch(
                generateReducerAction("SET_TECHNICAL_MANAGER", e.target.value)
              );
            }}
            options={options.allEmployees?.map((i) => ({
              label: i.name,
              value: i.value,
            }))}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="تاريخ الانتهاء" required>
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            disablePast
            value={dayjs(form.technecalEndDate)}
            onChange={(date) => {
              dispatch(
                generateReducerAction(
                  "SET_TECHNICAL_END_DATE",
                  date?.format() || ""
                )
              );
            }}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="الموظف البديل للمتابعة" required>
          <SelectWithFilter
            select
            size="small"
            value={form.technicalAlternative}
            onChange={(e) => {
              dispatch(
                generateReducerAction(
                  "SET_TECHNICAL_ALTERNATIVE",
                  e.target.value
                )
              );
            }}
            options={options.allEmployees?.map((i) => ({
              label: i.name,
              value: i.value,
            }))}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="تاريخ الانتهاء" required>
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            disablePast
            value={dayjs(form.technicalAlternativeEndDate)}
            onChange={(date) => {
              dispatch(
                generateReducerAction(
                  "SET_TECHNICAL_ALTERNATIVE_END_DATE",
                  date?.format() || ""
                )
              );
            }}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <FormGroup row {...inputProps}>
          <Typography alignSelf={"center"} mr={2} fontWeight={600}>
            الملفات المطلوبة
          </Typography>
          {options.technicalFiles?.map((method) => (
            <FormControlLabel
              key={method.value}
              checked={form.requiredFiles.includes(method.value)}
              onChange={(e) => {
                dispatch(
                  generateReducerAction("SET_REQUIRED_FILES", method.value)
                );
              }}
              control={<Checkbox />}
              label={method.name}
            />
          ))}
        </FormGroup>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="الملاحظات">
          <TextField
            id="outlined-name-input"
            type="text"
            multiline
            size="small"
            placeholder={"الملاحظات"}
            value={form.notes}
            onChange={(e) => {
              dispatch(generateReducerAction("SET_NOTES", e.target.value));
            }}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      {/* Financial Section */}
      <SectionTitle>الملف المالي</SectionTitle>
      <GridItem>
        <AddLabelToEl label="المهندس المسؤول عن الملف المالي" required>
          <SelectWithFilter
            select
            size="small"
            value={form.financialManager}
            onChange={(e) => {
              dispatch(
                generateReducerAction("SET_FINANCIAL_MANAGER", e.target.value)
              );
            }}
            options={options.allEmployees?.map((i) => ({
              label: i.name,
              value: i.value,
            }))}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="تاريخ وموعد التقديم" required>
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            disablePast
            value={dayjs(form.financialEndDate)}
            onChange={(date) => {
              dispatch(
                generateReducerAction(
                  "SET_FINANCIAL_END_DATE",
                  date?.format() || ""
                )
              );
            }}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      {/* Presentation Section */}
      <SectionTitle>تقديم المنافسة</SectionTitle>
      <GridItem>
        <AddLabelToEl label="المهندس المسؤول عن تقديم المنافسة" required>
          <SelectWithFilter
            select
            size="small"
            value={form.applyManager}
            onChange={(e) => {
              dispatch(
                generateReducerAction("SET_APPLY_MANAGER", e.target.value)
              );
            }}
            options={options.allEmployees?.map((i) => ({
              label: i.name,
              value: i.value,
            }))}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="تاريخ وموعد التقديم" required>
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            disablePast
            value={dayjs(form.applyDate)}
            onChange={(date) => {
              dispatch(
                generateReducerAction("SET_APPLY_DATE", date?.format() || "")
              );
            }}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <LoadingButton type="submit" variant="contained" {...inputProps}>
            حفظ
          </LoadingButton>
        </Box>
      </Grid>
    </Grid>
  );
  function getOptions() {
    if (
      typeof tenderContext.tender === "object" &&
      tenderContext.tender.tenderdata?.department?.management?.branch_id
    ) {
      getFormOptions({
        branch_id: `${tenderContext.tender.tenderdata?.department?.management?.branch_id}`,
        management_id: `${tenderContext.tender.tenderdata?.department?.management?.id}`,
      })
        .then((data) => {
          setOptions({
            allEmployees: toOptionArr(data.employees_branch),
            departmentEmployee: toOptionArr(data.employees_management),
            technicalFiles: toOptionArr(data.warranty_file),
          });
        })
        .catch((err) => {});
    }
  }
}

function toOptionArr(
  arr: { id: number; name: string }[] | undefined
): OptionType[] | undefined {
  return arr?.map((e) => ({
    name: e.name,
    value: e.id.toString(),
  }));
}

function SectionTitle(props: TypographyProps) {
  return (
    <Grid item xs={12}>
      <Typography variant="body1" mt={1} fontWeight={700} {...props} />
    </Grid>
  );
}

type OptionsType = {
  allEmployees?: OptionType[];
  departmentEmployee?: OptionType[];
  technicalFiles?: OptionType[];
};

type OptionType = {
  name: string;
  value: string;
};

export default ManagersForm;
