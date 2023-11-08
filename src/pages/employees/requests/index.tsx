import { Stack, Typography, Box, Tabs, Tab, Paper } from "@mui/material";
import SearchBar from "./SearchBar";
import EmployeesRequestsTable from "./Table";
import RequestTypesToggles from "./Toggles";
import { useEffect, useState } from "react";
import { EmployeeRequest } from "../../../types";
import axios from "axios";
import { Api } from "../../../constants";

function EmplyeesRequests() {
  const [currentTab, setCurrentTab] = useState("1");
  const [requests, setRequests] = useState<EmployeeRequest[] | null>(null);

  useEffect(() => {
    axios
      .get<{ requests: EmployeeRequest[] }>(
        Api("employee/general-requests/requests")
      )
      .then(({ data }) => {
        setRequests(data.requests);
        console.log(data);
      })
      .catch((err) => {
        setRequests(null);
        console.log(err);
      });
  }, []);

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
        {requests && <EmployeesRequestsTable requests={requests} />}
      </Paper>
    </Stack>
  );
}

export default EmplyeesRequests;
