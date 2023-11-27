import React from "react";
import TopTable from "./addContracts/topTable/TopTable";
import ContractsTable from "./addContracts/Table";
import { Typography, Box, Tabs, Tab, Paper, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { NavLink } from "react-router-dom";
import { ContractRequest } from "../../types/ContractRequest";
import PopUpContracts from "./addContracts/FormComponents/PopUpContracts";
function Panal(props: PropType) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
            <Tab label="ادارة العقود" disabled />
          </Tabs>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            sx={{ mr: 5 }}
            onClick={handleClickOpen}
          >
            اضافة عقد
          </Button>
          <PopUpContracts handleClose={handleClose} open={open} />
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
