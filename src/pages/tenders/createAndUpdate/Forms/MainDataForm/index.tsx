import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
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
  return (
    <Grid container spacing={2} component="form">
      <GridItem>
        <AddLabelToEl label="نوع الفرع" required>
          <TextField select size="small">
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
          <TextField select size="small">
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
            id="outlined-name-input"
            type="text"
            required
            size="small"
            placeholder={"الرقم المرجعي للمنافسة "}
            onChange={(e) => {}}
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
            id="outlined-name-input"
            type="text"
            required
            size="small"
            placeholder={"رقم المنافسة"}
            onChange={(e) => {}}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="اسم المنافسة" required>
          <TextField
            id="outlined-name-input"
            type="text"
            required
            size="small"
            placeholder={"اسم المنافسة "}
            onChange={(e) => {}}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="تاريخ التقديم المطلوب">
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            disablePast
            // value={dayjs(props.yearFilter)}
            // onChange={(date) => {
            //   props.setYearFilter(date?.format() || "");
            // }}
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
            onChange={(e) => {}}
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
            // value={dayjs(props.yearFilter)}
            // onChange={(date) => {
            //   props.setYearFilter(date?.format() || "");
            // }}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="القيمة المالية" required>
          <TextField
            id="outlined-name-input"
            type="text"
            required
            size="small"
            placeholder={"القيمة المالية"}
            onChange={(e) => {}}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="نوع المنافسة" required>
          <TextField select size="small">
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
          <TextField select size="small">
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
            id="outlined-name-input"
            type="text"
            required
            size="small"
            placeholder={"نشاط المنافسة"}
            onChange={(e) => {}}
          />
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="مدة العقد">
          <TextField
            id="outlined-name-input"
            type="text"
            required
            size="small"
            placeholder={"مدة العقد"}
            onChange={(e) => {}}
          />
        </AddLabelToEl>
      </GridItem>
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
