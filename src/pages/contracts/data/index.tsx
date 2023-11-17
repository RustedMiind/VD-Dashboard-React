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
function Contracts() {
  const [currentTab, setCurrentTab] = useState("1");
  const [requests, setRequests] = useState<EmployeeRequest[] | undefined>(
    undefined
  );
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<number[]>([]);

  let filtered: EmployeeRequest[] | undefined = requests;

  if (search) {
    const searchLowerCase = search.toLowerCase();
    const filter = requests?.filter((request) => {
      return request.employee?.name
        .toLocaleLowerCase()
        .includes(searchLowerCase);
    });
    filtered = filter || undefined;
  }
  if (selectedTypes.length) {
    const filter = filtered?.filter((request) => {
      let found = false;
      selectedTypes.forEach((selection) => {
        const temp = requestTypes.find((x) => x.name === selection);
        // if (found) {
        //   return;
        // }
        if (
          temp &&
          request.requestable_type
            .toLowerCase()
            .includes(temp?.prefix.toLowerCase())
        ) {
          found = true;
        }
      });
      return found;
    });
    filtered = filter || undefined;
  }
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
      .get<{ requests: EmployeeRequest[] }>(
        Api("employee/general-requests/requests")
      )
      .then(({ data }) => {
        setRequests(data.requests);
        console.log(data);
      })
      .catch((err) => {
        setRequests(undefined);
        console.log(err);
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
            {filtered && (
              <EmployeesRequestsTable
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                requests={filtered}
              />
            )}
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
