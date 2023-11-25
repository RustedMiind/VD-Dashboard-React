import React from "react";
import TopTable from "./topTable/TopTable";
import ContractsTable from "./Table";
import { Typography, Box, Tabs, Tab, Paper, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { NavLink } from "react-router-dom";
import { ContractRequest } from "../../../types/ContractRequest";
function Panal(props: PropType) {
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
  const [value, setValue] = React.useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{ borderColor: "divider" }}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="بيانات العقود" />
            <Tab label="ادارة العقود" />
          </Tabs>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            sx={{ mr: 5 }}
            component={NavLink}
            to={"add"}
          >
            اضافة عقد
          </Button>
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
            <TopTable value={value} />
            <ContractsTable requests={props.requests} value={value} />
          </Paper>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
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
            <TopTable value={value} />
            <ContractsTable requests={props.requests} value={value} />
          </Paper>
        </CustomTabPanel>
      </Box>
    </>
  );
}

type PropType = {
  requests: ContractRequest[] | null;
};
export default Panal;
