import React, { useContext } from "react";
import TopTable from "../SetContract/topTable/TopTable";
import ContractsTable from "../SetContract/Table";
import { Typography, Box, Tabs, Tab, Paper, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PopUpContracts from "../SetContract/Components/PopUpContracts";
import { ContractsContext } from "../Context/ContractsContext";
import ContractsNotFound from "../SetContract/ContractsNotFound.1";
import LoadingTable from "../../../components/LoadingTable";
function TableContainer() {
  const { contracts } = useContext(ContractsContext);

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
          <Box sx={{ pb: 3 }}>
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
      <Box sx={{ width: "100%", position: "relative", mt: 2 }}>
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
          <PopUpContracts handleClose={handleClose} open={open} />
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Paper sx={{ p: 3 }}>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{ mr: 5 }}
              onClick={handleClickOpen}
            >
              اضافة عقد
            </Button>
            <TopTable value={value} />
            {typeof contracts === "string" && contracts === "loading" && (
              <LoadingTable rows={4} cols={5} />
            )}
            {typeof contracts === "string" && contracts === "error" && (
              <Typography variant="h5" color={"error"}>
                فشل في تحميل العقود
              </Typography>
            )}
            {typeof contracts === "object" &&
              (contracts?.data?.length ? (
                <ContractsTable value={value} />
              ) : (
                <ContractsNotFound />
              ))}
          </Paper>
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default TableContainer;
