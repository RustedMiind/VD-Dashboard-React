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

function EmploeesRequestsProcedures() {
  const [currentTab, setCurrentTab] = useState("1");

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
        <Button variant="contained" startIcon={<AddCircleOutlineIcon />}>
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

      <Paper sx={{ p: 2 }}></Paper>
    </Stack>
  );
}

export default EmploeesRequestsProcedures;
