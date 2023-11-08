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

function EmploeesRequestsProcedures() {
  const [currentTab, setCurrentTab] = useState("1");
  const [levels, setLevels] = useState([0]);

  function addLevel() {
    const instance = [...levels];
    instance.push(instance.length);
    setLevels(instance);
  }

  function removeLevel(val: number) {
    const instance = [...levels];
    const filtered = instance.filter((v) => v !== val);
    setLevels(filtered);
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
                levelName={`مرحلة ${level + 1}`}
                onDelete={
                  IS_LAST_ITEM
                    ? () => {
                        removeLevel(level);
                      }
                    : undefined
                }
              />
            );
          })}
        </Stack>
      </Paper>
    </Stack>
  );
}

export default EmploeesRequestsProcedures;
