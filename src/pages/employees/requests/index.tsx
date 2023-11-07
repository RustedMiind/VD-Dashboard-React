import { Stack, Typography, Box, Tabs, Tab, Paper } from "@mui/material";
import SearchBar from "./SearchBar";
import EmployeesRequestsTable from "./Table";
import RequestTypesToggles from "./Toggles";
import { useState } from "react";

function EmplyeesRequests() {
  const [currentTab, setCurrentTab] = useState("1");

  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} mb={3}>
        طلبات الموظفين
      </Typography>
      <SearchBar />
      <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        flexDirection="row-reverse"
        flexWrap="wrap"
        alignItems="end"
      >
        <RequestTypesToggles />

        <Tabs
          aria-label="basic tabs example"
          value={currentTab}
          onChange={(e, v) => {
            setCurrentTab(v);
          }}
        >
          <Tab label="الكل" value={"1"} />
          <Tab label="الوارد" value={"2"} />
          <Tab label="الصادر" value={"3"} />
        </Tabs>
      </Box>
      <Paper
        // variant="outlined"
        sx={{
          //
          bgcolor: "Background",
          overflow: "hidden",
        }}
        elevation={4}
      >
        <EmployeesRequestsTable />
      </Paper>
    </Stack>
  );
}

export default EmplyeesRequests;
