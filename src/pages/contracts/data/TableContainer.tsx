import React, { useContext, useState } from "react";
// import TopTable from "../SetContract/topTable/TopTable";
import ContractsTable from "../SetContract/Table";
import {
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PopUpContracts from "../SetContract/Components/PopUpContracts";
import ContractsNotFound from "../SetContract/ContractsNotFound.1";
import LoadingTable from "../../../components/LoadingTable";
import DoubleChips from "../../../components/DoubleStatusChips";
import BtnCus from "../SetContract/topTable/BtnCus";
import { ContractsContext } from "./../Context/ContractsContext";

function TableContainer() {
  const { contracts } = useContext(ContractsContext);

  // let contractsContext = useContext(ContractsContext);

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
  const [value, setValue] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [secondTabValue, setSecondTabValue] = useState<number>(0 | 1);

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
            <Tab label="ادارة العقود" />
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
            {/* <TopTable value={value} /> */}

            <Typography sx={{ mt: 2 }}>حالات العقود</Typography>
            <Stack
              direction={"row-reverse"}
              justifyContent={value === 0 ? "space-between" : "end"}
            >
              <Box>
                <BtnCus />
              </Box>
              {typeof contracts === "object" && value === 0 && (
                <Stack direction={"row"} spacing={2} mb={1}>
                  <DoubleChips
                    color="success"
                    label="ساري"
                    value={contracts?.contract_work}
                  />
                  <DoubleChips
                    color="warning"
                    label="متأخر"
                    value={contracts?.contract_late}
                  />
                  <DoubleChips
                    color="error"
                    label="متوقف"
                    value={contracts?.contract_stop}
                  />
                  <DoubleChips
                    color="primary"
                    label="منتهي"
                    value={contracts?.contract_end}
                  />
                </Stack>
              )}
            </Stack>

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

        <CustomTabPanel value={value} index={1}>
          <Paper sx={{ p: 3 }}>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{ mr: 5 }}
              onClick={handleClickOpen}
            >
              اضافة عقد
            </Button>
            {/* <TopTable value={value} /> */}
            <Stack direction={"row"} spacing={0} mt={2}>
              <Button
                variant={secondTabValue === 0 ? "contained" : "outlined"}
                sx={{ width: "50%" }}
                onClick={() => {
                  setSecondTabValue(0);
                }}
              >
                العقود المنشأة
              </Button>
              <Button
                variant={secondTabValue === 1 ? "contained" : "outlined"}
                sx={{ width: "50%" }}
                onClick={() => {
                  setSecondTabValue(1);
                }}
              >
                العقود المحولة
              </Button>
            </Stack>

            {secondTabValue === 0 && (
              <Stack
                direction={"row-reverse"}
                justifyContent={value === 0 ? "end" : "space-between"}
              >
                <Box>
                  <BtnCus />
                </Box>
                {typeof contracts === "object" && (
                  <Stack direction={"row"} spacing={2} mb={1}>
                    <DoubleChips
                      color="success"
                      label="ساري"
                      value={contracts?.contract_work}
                    />
                    <DoubleChips
                      color="warning"
                      label="متأخر"
                      value={contracts?.contract_late}
                    />
                    <DoubleChips
                      color="error"
                      label="متوقف"
                      value={contracts?.contract_stop}
                    />
                    <DoubleChips
                      color="primary"
                      label="منتهي"
                      value={contracts?.contract_end}
                    />
                  </Stack>
                )}
              </Stack>
            )}

            {typeof contracts === "string" && contracts === "loading" && (
              <LoadingTable rows={4} cols={5} />
            )}
            {typeof contracts === "string" && contracts === "error" && (
              <Typography variant="h5" color={"error"}>
                فشل في تحميل العقود
              </Typography>
            )}
            {typeof contracts === "object" &&
              (contracts?.data?.length && secondTabValue === 0 ? (
                <ContractsTable value={value} secondTabValue={secondTabValue} />
              ) : (
                <Stack pt={4}>
                  <ContractsNotFound />
                </Stack>
              ))}
          </Paper>
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default TableContainer;
