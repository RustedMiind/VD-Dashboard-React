import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  TextField,
  Typography,
  TypographyProps,
} from "@mui/material";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import { GridItem } from "../../GridItem";
import { generateUndefinedArray } from "../../../../../methods";
import { DatePicker } from "@mui/x-date-pickers";

const arr = generateUndefinedArray(10);
const applyMethod = [
  { name: "فني ومالي", id: 1 },
  { name: "فني", id: 2 },
  { name: "مالي", id: 3 },
  { name: "اخرى", id: 4 },
];

function ManagersForm() {
  return (
    <Grid container spacing={2} component="form">
      {/* Managers Section */}
      <SectionTitle>مهام المنافسة (المسؤولين عن المنافسة)</SectionTitle>
      <GridItem>
        <AddLabelToEl label="المهندس المسؤول عن متابعة المنافسة" required>
          <TextField select size="small">
            {arr.map((option) => (
              <MenuItem value={"1"}>{"مهندس"}</MenuItem>
            ))}
          </TextField>
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="تاريخ انتهاء الموافقة" required>
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
        <AddLabelToEl label="المهندس المسؤول عن شراء المنافسة" required>
          <TextField select size="small">
            {arr.map((option) => (
              <MenuItem value={"1"}>{"مهندس"}</MenuItem>
            ))}
          </TextField>
        </AddLabelToEl>
      </GridItem>{" "}
      <GridItem>
        <AddLabelToEl label="تاريخ وموعد الشراء" required>
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
      {/* Technical file section */}
      <SectionTitle>الملف الفني</SectionTitle>
      <GridItem>
        <AddLabelToEl label="المهندس المسؤول عن الملف الفني" required>
          <TextField select size="small">
            {arr.map((option) => (
              <MenuItem value={"1"}>{"مهندس"}</MenuItem>
            ))}
          </TextField>
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="تاريخ الانتهاء" required>
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
        <AddLabelToEl label="الموظف البديل للمتابعة" required>
          <TextField select size="small">
            {arr.map((option) => (
              <MenuItem value={"1"}>{"مهندس"}</MenuItem>
            ))}
          </TextField>
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="تاريخ الانتهاء" required>
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
        <FormGroup row>
          <Typography alignSelf={"center"} mr={2} fontWeight={600}>
            الضمان المطلوب
          </Typography>
          {applyMethod.map((method) => (
            <FormControlLabel
              key={method.id}
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
            onChange={(e) => {}}
          />
        </AddLabelToEl>
      </GridItem>
      {/* Financial Section */}
      <SectionTitle>الملف المالي</SectionTitle>
      <GridItem>
        <AddLabelToEl label="المهندس المسؤول عن الملف المالي" required>
          <TextField select size="small">
            {arr.map((option) => (
              <MenuItem value={"1"}>{"مهندس"}</MenuItem>
            ))}
          </TextField>
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="تاريخ وموعد التقديم" required>
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
      {/* Presentation Section */}
      <SectionTitle>تقديم المنافسة</SectionTitle>
      <GridItem>
        <AddLabelToEl label="المهندس المسؤول عن تقديم المنافسة" required>
          <TextField select size="small">
            {arr.map((option) => (
              <MenuItem value={"1"}>{"مهندس"}</MenuItem>
            ))}
          </TextField>
        </AddLabelToEl>
      </GridItem>
      <GridItem>
        <AddLabelToEl label="تاريخ وموعد التقديم" required>
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
    </Grid>
  );
}

function SectionTitle(props: TypographyProps) {
  return (
    <Grid item xs={12}>
      <Typography variant="body1" mt={1} fontWeight={700} {...props} />
    </Grid>
  );
}

export default ManagersForm;
