import {
  Box,
  Stack,
  Tab,
  Tabs,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { useState } from "react";
// Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LevelItem from "./LevelItem";
import { ProceduresModelsType } from "./types";

const EmployeesFill: EmployeeType = [
  { name: "علي سليمان", id: 1 },
  { name: "محمد محمود", id: 2 },
  { name: "سيد رمضان", id: 3 },
  { name: "احمد فتحي", id: 4 },
  { name: "ماجد محمد", id: 5 },
  { name: "عبدالله محمود", id: 6 },
  { name: "سيد رجب", id: 7 },
];
type EmployeeType = { name: string; id: number }[];
export type DepartmentType = {
  name: string;
  id: number;
  employees: { name: string; id: number }[];
}[];

const DepartmentsFill: DepartmentType = [
  {
    name: "فرع جدة",
    id: 1,
    employees: EmployeesFill,
  },
];

const InitLevel: LevelType = {
  accepted: false,
  approval: false,
  departmentManagerId: 1,
  duration: "0",
  employeeId: 1,
  model: { id: 1, status: 1 },
};

function EmploeesRequestsProcedures() {
  const [currentTab, setCurrentTab] = useState("1");
  const [levels, setLevels] = useState<LevelType[]>([InitLevel]);
  const [procedure, setProcedure] = useState<ProcedureType>({
    name: "اجازات",
    id: 1,
    levels: [
      {
        employeeId: 1,
        departmentManagerId: 4,
        accepted: false,
        approval: false,
        duration: "",
        model: { id: 1, status: 1 },
      },
    ],
  });

  function addLevel() {
    const instance = [...levels];
    instance.push(InitLevel);
    setLevels(instance);
  }

  function removeLevel(val: number) {
    const instance = [...levels];

    instance.splice(val, 1);
    // const filtered = instance.filter((v) => v !== val);
    // setLevels(filtered);
    setLevels(instance);
  }

  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} mb={3}>
        اعدادات اجراءات الطلبات
      </Typography>

      <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        flexDirection="row-reverse"
        flexWrap="wrap"
        alignItems="end"
      >
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          onClick={addLevel}
        >
          اضافة مرحلة جديدة
        </Button>

        <Tabs
          aria-label="basic tabs example"
          value={currentTab}
          onChange={(e, v) => {
            setCurrentTab(v);
          }}
        >
          <Tab label="الاجازات" value={"1"} />
          <Tab label="مهمة عمل" value={"2"} />
          <Tab label="السلف" value={"3"} />
          <Tab label="العهدة" value={"4"} />
          <Tab label="احتياجات عمل" value={"5"} />
          <Tab label="صيانة سيارة" value={"6"} />
        </Tabs>
      </Box>

      <Paper sx={{ p: 2 }}>
        <Stack>
          {levels.map((level, index, arr) => {
            const IS_LAST_ITEM = index === arr.length - 1;
            return (
              <LevelItem
                level={level}
                onDelete={
                  IS_LAST_ITEM
                    ? () => {
                        removeLevel(index);
                      }
                    : undefined
                }
                departments={DepartmentsFill}
              />
            );
          })}
        </Stack>
      </Paper>
    </Stack>
  );
}

export interface ProcedureType {
  name: string;
  id: number;
  levels: LevelType[];
}

export interface LevelType {
  departmentManagerId: number;
  employeeId: number;
  accepted: boolean;
  approval: boolean;
  duration: string;
  model: ProceduresModelsType;
}

export default EmploeesRequestsProcedures;
