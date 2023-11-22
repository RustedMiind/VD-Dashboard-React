import {
  Stack,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Button,
} from "@mui/material";
import * as React from "react";
import EmployeesRequestsTable from "./Table";
import { useEffect, useState } from "react";
import { EmployeeRequest } from "../../../types";
import axios from "axios";
import { Api } from "../../../constants";
import { requestTypes } from "./RequestTypes";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { NavLink } from "react-router-dom";
import ContractsTable from "./Table";
import { ContractRequest } from "../../../types/ContractRequest";
import TopTable from "./topTable/TopTable";
function Contracts() {
  const [currentTab, setCurrentTab] = useState("1");
  const [requests, setRequests] = useState<ContractRequest[] | null>(null);

  // Start tab function
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // End tab function

  useEffect(() => {
    axios
      .get<{ data: ContractRequest[] }>(Api("employee/contract"))
      .then(({ data }) => {
        setRequests(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
        setRequests(null);
      });
  }, []);
  return (
    <Stack>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="بيانات العقود" {...a11yProps(0)} />
            <Tab label="ادارة العقود" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Paper
            // variant="outlined"
            sx={{
              p: 2,
              bgcolor: "Background",
              overflow: "hidden",
              backgroundColor: "#F3F5F7",
            }}
            elevation={4}
          >
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{ mb: 1 }}
              component={NavLink}
              to={"add"}
            >
              اضافة عقد
            </Button>
            <TopTable />
            <ContractsTable requests={requests} />
          </Paper>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
      </Box>
    </Stack>
  );
}

export default Contracts;
