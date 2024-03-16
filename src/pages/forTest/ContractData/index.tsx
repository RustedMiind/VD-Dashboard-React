import { Button, Grid, MenuItem, Stack, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import AddLabelToEl from "../../../components/AddLabelToEl";
import SelectWithFilter from "../../../components/SelectWithFilter";
import CustomFilePond from "../../../components/CustomFilepond";
import { useState } from "react";
import { FileBondState } from "../../../types/FileBondState";
import { NavLink } from "react-router-dom";
export function GridItem({ children }: { children: React.ReactNode }) {
  return (
    <Grid item xs={12} md={6}>
      <Stack>{children}</Stack>{" "}
    </Grid>
  );
}
const options = [
  { name: "منافسة عامه", value: 1 },
  { name: "منافسة محدده", value: 2 },
  { name: "عامة", value: 3 },
];
export default function ContractData() {
  const [file, setFile] = useState<FileBondState>([]);
  return (
    <Box>
      <Grid container spacing={2} paddingBottom={2}>
        <GridItem>
          <AddLabelToEl label="نوع الفرع" required>
            <TextField select size="small" value={""} onChange={(e) => {}}>
              {options?.map((branch) => (
                <MenuItem key={branch.value} value={branch.value}>
                  {branch.name}
                </MenuItem>
              ))}
            </TextField>
          </AddLabelToEl>
        </GridItem>
        <GridItem>
          <AddLabelToEl label="الادارة" required>
            <TextField select size="small" value={""} onChange={(e) => {}}>
              {options?.map((branch) => (
                <MenuItem key={branch.value} value={branch.value}>
                  {branch.name}
                </MenuItem>
              ))}
            </TextField>
          </AddLabelToEl>
        </GridItem>
        <GridItem>
          <AddLabelToEl label="مدة العقد " required>
            <TextField
              type="text"
              size="small"
              placeholder={" مدة العقد "}
              value={""}
              onChange={(e) => {}}
            />
          </AddLabelToEl>
        </GridItem>
        <GridItem>
          <AddLabelToEl label="رقم العقد  " required>
            <TextField
              type="text"
              size="small"
              placeholder={"  رقم العقد "}
              value={""}
              onChange={(e) => {}}
            />
          </AddLabelToEl>
        </GridItem>
        <GridItem>
          <AddLabelToEl label="تاريخ العقد" required>
            <DateTimePicker
              slotProps={{ textField: { fullWidth: true, size: "small" } }}
              // disablePast
              // shouldDisableTime={disableDateBefore(dayjs(form.applyDate))}
              // shouldDisableDate={disableDateBefore(dayjs(form.applyDate))}
              //   value={dayjs(form.endDate)}
              onChange={(date) => {}}
            />
          </AddLabelToEl>
        </GridItem>
        <GridItem>
          <AddLabelToEl label="اسم المشروع" required>
            <TextField
              type="text"
              size="small"
              placeholder={"اسم المشروع "}
              //   value={form.name}
              onChange={(e) => {}}
            />
          </AddLabelToEl>
        </GridItem>
        <GridItem>
          <AddLabelToEl label="  قيمة العقد " required>
            <TextField
              type="text"
              size="small"
              placeholder={" قيمة العقد   "}
              value={""}
              onChange={(e) => {}}
            />
          </AddLabelToEl>
        </GridItem>
        <GridItem>
          <AddLabelToEl label="اسم العميل" required>
            <SelectWithFilter
              size="small"
              select
              value={""}
              onChange={(e) => {}}
              options={options.map((broker) => ({
                label: broker.name,
                value: broker.value,
              }))}
              onFilterEmpty={
                <Stack alignItems="center" p={1}>
                  <Button
                    variant="outlined"
                    component={NavLink}
                    to={`clients/add`}
                    startIcon={<PersonAddIcon />}
                    fullWidth
                  >
                    اضافة عميل
                  </Button>
                </Stack>
              }
            ></SelectWithFilter>
          </AddLabelToEl>
        </GridItem>
        <GridItem>
          <AddLabelToEl label="المهندس المسؤول" required>
            <TextField select size="small" value={""} onChange={(e) => {}}>
              {options?.map((branch) => (
                <MenuItem key={branch.value} value={branch.value}>
                  {branch.name}
                </MenuItem>
              ))}
            </TextField>
          </AddLabelToEl>
        </GridItem>
        <GridItem>
          <AddLabelToEl label="ارفاق صورة من العقد" required>
            <CustomFilePond
              acceptedFileTypes={["image/jpeg"]}
              files={file}
              onupdatefiles={(fileItems) => {
                setFile(fileItems.map((fileItem) => fileItem.file));
              }}
            />
          </AddLabelToEl>
        </GridItem>
      </Grid>
    </Box>
  );
}
