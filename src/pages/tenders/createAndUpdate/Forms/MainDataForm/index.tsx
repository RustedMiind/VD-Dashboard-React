import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { GridItem } from "../../GridItem";
import SelectWithFilter from "../../../../../components/SelectWithFilter";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import { useContext, useEffect, useReducer, useState } from "react";
import { TenderContext } from "../../TenderCondext";
import { initialTenderDataState, reducer, stateToPostDto } from "./reducer";
import generateReducerAction from "../../../../../methods/conversions/generateReducerAction";
import dayjs from "dayjs";
import axios from "axios";
import { Api } from "../../../../../constants";
import { TenderData } from "../../../../../types";
import getFormOptions from "../../getFormOptions";
import { useSnackbar } from "notistack";
import { joinObjectValues } from "../../../../../methods/joinObjectValues";
import { LaravelValidationError } from "../../../../../types/LaravelValidationError";
import { AxiosErrorType } from "../../../../../types/Axios";
import { FormStatus } from "../../../../../types/FormStatus";
import { LoadingButton } from "@mui/lab";
import { StringParam, useQueryParam } from "use-query-params";
import {
  disableDateAfter,
  disableDateBefore,
} from "../../../../../methods/DayjsDatePicker";
const type_id = [
  { name: "منافسة عامه", value: 1 },
  { name: "منافسة محدده", value: 2 },
  { name: "عامة", value: 3 },
];

export default function MainDataForm() {
  const [error, setError] = useState<undefined | React.ReactNode>(undefined);
  const tenderContext = useContext(TenderContext);
  const [form, dispatch] = useReducer(reducer, initialTenderDataState);
  const [options, setOptions] = useState<TenderFormOptionTypes>({});
  const snackbar = useSnackbar();
  const [formStatus, setFormStatus] = useState<FormStatus>("none");
  const inputProps = {
    loading: formStatus === "loading",
    disabled: formStatus === "loading" || formStatus === "disabled",
  };
  let path =
    typeof tenderContext.tender === "object" && tenderContext.tender.tenderdata
      ? "/" + tenderContext.tender.tenderdata.tender_id
      : "";
  const [typeParam] = useQueryParam("type", StringParam);
  useEffect(() => {
    if (!path && typeParam) {
      dispatch({ type: "SET_TYPE_ID", payload: typeParam });
    }
  }, []);
  useEffect(getOptions, [form.branchId, form.managementId]);
  useEffect(() => {
    if (
      typeof tenderContext.tender === "object" &&
      tenderContext.tender.tenderdata
    ) {
      dispatch({
        type: "EXTRACT_DTO",
        payload: tenderContext.tender.tenderdata,
      });
    }
  }, [tenderContext.tenderId, typeof tenderContext.tender]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("loading");

    setFormStatus("loading");
    axios
      .post<{ data: TenderData }>(
        Api(`employee/tender/data${path}`),
        stateToPostDto(form)
      )
      .then((res) => {
        snackbar.enqueueSnackbar(
          path ? "تم تعديل بيانات المنافسة بنجاح" : "تم حفظ بيانات المنافسة"
        );
        setError(undefined);
        tenderContext.setTenderId &&
          tenderContext.setTenderId(res.data.data.tender_id);
      })
      .catch((err: AxiosErrorType<LaravelValidationError<unknown>>) => {
        snackbar.enqueueSnackbar(
          path
            ? "تعذر في تعديل بيانات المنافسة"
            : "تعذر في حفظ بيانات المنافسة",
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
  return (
    <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <Typography color={"error.main"}>{error}</Typography>
      </Grid>
      <GridItem>
        <AddLabelToEl label="نوع الفرع" required>
          <TextField
            select
            size="small"
            value={form.branchId}
            onChange={(e) => {
              dispatch(generateReducerAction("SET_BRANCH_ID", e.target.value));
            }}
            {...inputProps}
          >
            {options.branches?.map((branch) => (
              <MenuItem key={branch.value} value={branch.value}>
                {branch.name}
              </MenuItem>
            ))}
          </TextField>
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="الادارة" required>
          <TextField
            select
            size="small"
            value={form.managementId}
            onChange={(e) => {
              dispatch(
                generateReducerAction("SET_MANAGEMENT_ID", e.target.value)
              );
            }}
            {...inputProps}
          >
            {options.managementes?.map((management) => (
              <MenuItem key={management.value} value={management.value}>
                {management.name}
              </MenuItem>
            ))}
          </TextField>
        </AddLabelToEl>
      </GridItem>

      <GridItem>
        <AddLabelToEl label="الرقم المرجعي للمنافسة" required>
          <TextField
            type="text"
            size="small"
            placeholder={"الرقم المرجعي للمنافسة "}
            value={form.referenceNumber}
            onChange={(e) => {
              dispatch(
                generateReducerAction("SET_REFERENCE_NUMBER", e.target.value)
              );
            }}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        {/* 
            <AddLabelToEl label="الرقم المرجعي للمنافسة" required>
            </AddLabelToEl>
        */}
        <AddLabelToEl label="رقم المنافسة">
          <TextField
            type="text"
            size="small"
            placeholder={"رقم المنافسة"}
            value={form.number}
            onChange={(e) => {
              dispatch(generateReducerAction("SET_NUMBER", e.target.value));
            }}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="اسم المنافسة" required>
          <TextField
            type="text"
            size="small"
            placeholder={"اسم المنافسة "}
            value={form.name}
            onChange={(e) => {
              dispatch(generateReducerAction("SET_NAME", e.target.value));
            }}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="تاريخ التقديم المطلوب">
          <DateTimePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            disablePast
            value={dayjs(form.applyDate)}
            shouldDisableTime={disableDateAfter(dayjs(form.endDate))}
            shouldDisableDate={disableDateAfter(dayjs(form.endDate))}
            onChange={(date) => {
              dispatch(
                generateReducerAction("SET_APPLY_DATE", date?.format() || "")
              );
            }}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="الجهة الحكومية" required>
          <SelectWithFilter
            id="outlined-select-currency"
            size="small"
            select
            //   value={formData?.branch_id}
            value={form.governmentalOrganizationId}
            onChange={(e) => {
              dispatch(
                generateReducerAction(
                  "SET_GOVERNMENTAL_ORGANIZATION_ID",
                  e.target.value
                )
              );
            }}
            options={options.organization?.map((item) => ({
              label: item.name,
              value: item.value,
            }))}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="تاريخ انتهاء المنافسة" required>
          <DateTimePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            disablePast
            shouldDisableTime={disableDateBefore(dayjs(form.applyDate))}
            shouldDisableDate={disableDateBefore(dayjs(form.applyDate))}
            value={dayjs(form.endDate)}
            onChange={(date) => {
              dispatch(
                generateReducerAction("SET_END_DATE", date?.format() || "")
              );
            }}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="القيمة المالية" required>
          <TextField
            type="text"
            size="small"
            placeholder={"القيمة المالية"}
            value={form.price}
            onChange={(e) => {
              dispatch(generateReducerAction("SET_PRICE", e.target.value));
            }}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="نوع المنافسة" required>
          <TextField
            select
            size="small"
            value={form.typeId}
            onChange={(e) => {
              dispatch(generateReducerAction("SET_TYPE_ID", e.target.value));
            }}
            {...inputProps}
            disabled
          >
            {options.tenderTypes?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="القسم التابع له المنافسة">
          <TextField
            select
            size="small"
            value={form.departmentId}
            onChange={(e) => {
              dispatch(
                generateReducerAction("SET_DEPARTMENT_ID", e.target.value)
              );
            }}
            {...inputProps}
          >
            {options.departments?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="نشاط المنافسة">
          <TextField
            type="text"
            size="small"
            placeholder={"نشاط المنافسة"}
            value={form.activity}
            onChange={(e) => {
              dispatch(generateReducerAction("SET_ACTIVITY", e.target.value));
            }}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="مدة العقد">
          <TextField
            type="text"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">يوم</InputAdornment>,
            }}
            placeholder={"مدة العقد"}
            value={form.contractDuration}
            onChange={(e) => {
              dispatch(
                generateReducerAction("SET_CONTRACT_DURATION", e.target.value)
              );
            }}
            {...inputProps}
          />
        </AddLabelToEl>
      </GridItem>
      <Grid item xs={12}>
        <Box display={"flex"} flexDirection={"row"}>
          <Typography alignSelf={"center"}> طريقة التقديم</Typography>
          <FormGroup row sx={{ ml: 2 }} {...inputProps}>
            {options.applyMethods?.map((method) => (
              <FormControlLabel
                key={method.value}
                checked={form.applyType?.includes(method.value)}
                sx={{ ml: 2 }}
                control={<Checkbox />}
                label={method.name}
                value={method.value}
                onChange={(e) => {
                  dispatch(
                    generateReducerAction("SET_APPLY_TYPE_ID", method.value)
                  );
                }}
              />
            ))}
          </FormGroup>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box display={"flex"} flexDirection={"row"}>
          <Typography alignSelf={"center"}>الضمان المطلوب</Typography>
          <FormGroup row sx={{ ml: 2 }} {...inputProps}>
            {options.warranties?.map((method) => (
              <FormControlLabel
                key={method.value}
                checked={form.requiredWarranty?.includes(method.value)}
                sx={{ ml: 2 }}
                control={<Checkbox />}
                label={method.name}
                value={method.value}
                onChange={(e) => {
                  dispatch(
                    generateReducerAction("TOGGLE_WARRANTY_ID", method.value)
                  );
                }}
              />
            ))}
          </FormGroup>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <LoadingButton
            {...inputProps}
            type="submit"
            variant="contained"
            sx={{ width: 0.05 }}
          >
            حفظ
          </LoadingButton>
        </Box>
      </Grid>
    </Grid>
  );
  function getOptions() {
    getFormOptions({
      branch_id: form.branchId,
      management_id: form.managementId,
    })
      .then((data) => {
        setOptions({
          allEmployees: toOptionArr(data.employees_branch),
          branches: toOptionArr(data.banches),
          managementEmployee: toOptionArr(data.employees_management),
          managementes: toOptionArr(data.managements),
          departments: toOptionArr(data.departments),
          applyMethods: toOptionArr(data.apply),
          warranties: toOptionArr(data.warranty),
          organization: toOptionArr(data.organization),
          tenderTypes: toOptionArr(data.type),
        });
      })
      .catch((err) => {});
  }
}

export function toOptionArr(
  arr: { id: number; name: string }[] | undefined
): OptionType[] | undefined {
  return arr?.map((e) => ({
    name: e.name,
    value: e.id.toString(),
  }));
}

export type TenderFormOptionTypes = {
  branches?: OptionType[];
  departments?: OptionType[];
  managementes?: OptionType[];
  managementEmployee?: OptionType[];
  allEmployees?: OptionType[];
  applyMethods?: OptionType[];
  warranties?: OptionType[];
  organization?: OptionType[];
  tenderTypes?: OptionType[];
};

type OptionType = { name: string; value: string };
