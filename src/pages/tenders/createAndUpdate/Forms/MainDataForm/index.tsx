import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { GridItem } from "../../GridItem";
import SelectWithFilter from "../../../../../components/SelectWithFilter";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import { useContext, useReducer } from "react";
import { TenderContext } from "../../TenderCondext";
import { initialTenderDataState, reducer } from "./reducer";
import generateReducerAction from "../../../../../methods/conversions/generateReducerAction";
import dayjs from "dayjs";
const obj = [
  { name: "جده", id: 1 },
  { name: "جده", id: 2 },
  { name: "جده", id: 3 },
  { name: "جده", id: 4 },
];
const applyMethod = [
  { name: "فني ومالي", id: 1 },
  { name: "فني", id: 2 },
  { name: "مالي", id: 3 },
  { name: "اخرى", id: 4 },
];
export default function MainDataForm() {
  const tenderContext = useContext(TenderContext);
  const [form, dispatch] = useReducer(reducer, initialTenderDataState);

  return (
    <Grid
      container
      spacing={2}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        tenderContext.setTenderId && tenderContext.setTenderId(1);
      }}
    >
      <GridItem>
        <AddLabelToEl label="نوع الفرع" required>
          <TextField
            select
            size="small"
            value={form.branchId}
            onChange={(e) => {
              dispatch(generateReducerAction("SET_BRANCH_ID", e.target.value));
            }}
          >
            {obj.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
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
          >
            {obj.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
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
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="تاريخ التقديم المطلوب">
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            disablePast
            value={dayjs(form.applyDate)}
            onChange={(date) => {
              dispatch(
                generateReducerAction("SET_APPLY_DATE", date?.format() || "")
              );
            }}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="الجهة الحكومية">
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
            options={obj.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="تاريخ انتهاء المنافسة" required>
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            disablePast
            value={dayjs(form.endDate)}
            onChange={(date) => {
              dispatch(
                generateReducerAction("SET_END_DATE", date?.format() || "")
              );
            }}
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
          >
            {obj.map((option) => (
              <MenuItem key={option.id} value={option.name}>
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
          >
            {obj.map((option) => (
              <MenuItem key={option.id} value={option.name}>
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
          />
        </AddLabelToEl>
      </GridItem>
      {/* All below not statefull */}
      <Grid item xs={12}>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            mt: 2,
            alignItems: "center",
          }}
        >
          <FormLabel id="demo-row-radio-buttons-group-label">
            طريقة التقديم
          </FormLabel>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            aria-labelledby="demo-row-radio-buttons-group-label"
            sx={{ ml: 2 }}
          >
            {applyMethod.map((method) => (
              <FormControlLabel
                value={method.id}
                control={<Radio />}
                label={method.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Box display={"flex"} flexDirection={"row"}>
          <Typography alignSelf={"center"}>الضمان المطلوب</Typography>
          <FormGroup row sx={{ ml: 2 }}>
            {applyMethod.map((method) => (
              <FormControlLabel
                sx={{ ml: 2 }}
                control={<Checkbox />}
                label={method.name}
              />
            ))}
          </FormGroup>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button type="submit" variant="contained" sx={{ width: 0.05 }}>
            حفظ
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
