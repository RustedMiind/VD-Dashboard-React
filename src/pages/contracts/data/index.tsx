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
import { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../constants";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { NavLink } from "react-router-dom";
import ContractsTable from "./Table";
import { ContractRequest } from "../../../types/ContractRequest";
import TopTable from "./topTable/TopTable";
function Contracts() {
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // End tab function

  useEffect(() => {
    axios
      .get<{ data: ContractRequest[] }>(Api("employee/contract"))
      .then((res) => {
        setRequests(res.data.data);
        console.log("contracts ", res);
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
            <Tab label="بيانات العقود" />
            <Tab label="ادارة العقود" disabled />
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
