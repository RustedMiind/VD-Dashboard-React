import { useEffect, useState, useReducer, useContext } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SelectItem from "../../Components/Select";
import TextInput from "../../Components/TextInput";
import { SelectOptions } from "./SelectOptions";
import { Api } from "../../../../../constants";
import axios from "axios";
import { reducer, contractIntial } from "../../Components/reducer";
import { useParams } from "react-router-dom";
import BtnFile from "../../../../clients/addClient/BtnFile";
import { objectToFormData } from "../../../../../methods";
import { ContractsContext } from "../../../Context/ContractsContext";
import { Contract } from "../../../../../types";

const paddingSize = 0.1;

const ContractData = () => {
  let contractsContext = useContext(ContractsContext);
  contractsContext.setContracts && contractsContext.setContracts();
  const { type, id } = useParams();
  const [requests, setRequests] = useState<SelectOptions | null>(null);
  const [editContract, setEditContract] = useState<Contract | null>(null);
  const [contractData, dispatch] = useReducer(reducer, contractIntial);
  const [toaster, setToaster] = useState<ToasterType>({
    open: false,
    message: "",
    severity: "success",
  });
  function updateToaster(partial: Partial<ToasterType>) {
    setToaster({ ...toaster, ...partial });
  }
  function updateAndOpenToaster(partial: Partial<ToasterType>) {
    updateToaster({ ...partial, open: true });
  }
  function handleCloseToaster() {
    updateToaster({ open: false });
  }

  useEffect(() => {
    dispatch({ type: "CONTRACT_TYPE_ID", payload: +(type || 1) });
  }, [type]);

  useEffect(() => {
    axios
      .get<{ data: Contract | null }>(Api(`employee/contract/${id}`))
      .then((res) => {
        setEditContract(res.data.data);
      })
      .catch((err) => {
        setEditContract(null);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get<SelectOptions>(Api("employee/contract/use"))
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        setRequests(null);
      });
  }, []);

  const addContractHandler = (e: any) => {
    e.preventDefault();
    axios
      .post(Api("employee/contract/store"), objectToFormData(contractData))
      .then((response) => {
        console.log(response);
        updateAndOpenToaster({
          severity: "success",
          message: "تم حفظ العقد بنجاح",
        });
      })
      .catch((error) => {
        console.log(error);
        updateAndOpenToaster({
          severity: "error",
          message: "تعذر في حفظ العقد ",
        });
      });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={addContractHandler}
    >
      <Grid container>
        <Grid item p={paddingSize} md={6}>
          <SelectItem
            title="نوع الفرع"
            options={requests?.branches?.map((branch) => ({
              title: branch.name,
              value: branch.id,
            }))}
            setSelected={(e) => {
              console.log(e.target.value);
              dispatch({
                type: "BRANCH_ID",
                payload: parseInt(e.target.value),
              });
            }}
          />
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <SelectItem
            options={requests?.management?.map((manage) => ({
              title: manage.name,
              value: manage.id,
            }))}
            setSelected={(e) => {
              console.log(e.target.value);
              dispatch({
                type: "MANAGEMENT_ID",
                payload: parseInt(e.target.value),
              });
            }}
            title="الادارة"
          />
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <TextInput
            type="number"
            title={"مدة العقد"}
            onDataChange={(e) => {
              dispatch({
                type: "PERIOD",
                payload: parseInt(e.target.value),
              });
            }}
          />
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <TextInput
            type="number"
            title={"رقم العقد"}
            onDataChange={(e) => {
              dispatch({
                type: "CODE",
                payload: parseInt(e.target.value),
              });
            }}
          />
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <SelectItem
            isDisabled={true}
            selected={+(type || 4)}
            options={requests?.contractType?.map((type) => ({
              title: type.name,
              value: type.id,
            }))}
            title="نوع العقد"
          />
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <TextInput
            type="text"
            title="موضوع العقد"
            // defaultValue={editContract?.details}
            onDataChange={(e) => {
              dispatch({
                type: "DETAILS",
                payload: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              تاريخ العقد
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer sx={{ p: 0 }} components={["DatePicker"]}>
                <DatePicker
                  slotProps={{ textField: { size: "small" } }}
                  label="تاريخ العقد"
                  onChange={(e: any) => {
                    let date = `${e.$D}-${e.$M}-${e.$y}`;
                    dispatch({ type: "DATE", payload: date });
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Stack>
        </Grid>

        <Grid item p={paddingSize} md={6}>
          <Typography sx={{ ml: 2 }} component="label">
            اسم العميل
          </Typography>
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={(requests?.client ?? []).map((client) => client.name)}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                onSelect={(e: any) => {
                  requests?.client?.map((client) => {
                    if (client.name === e.target.value) {
                      dispatch({
                        type: "CLIENT_ID",
                        payload: client.id,
                      });
                    }
                  });
                }}
                {...params}
                placeholder="اختر اسم عميل"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Grid>

        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              قيمه العقد
            </Typography>
            <TextField
              id="outlined-address-input"
              type="number"
              required
              size="small"
              placeholder="قيمه العقد"
              onChange={(e) => {
                dispatch({
                  type: "AMOUNT",
                  payload: parseInt(e.target.value),
                });
              }}
            />
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack width={"480px"}>
            <BtnFile dispatch={dispatch} />
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <SelectItem
            options={requests?.employees?.map((employee) => ({
              title: employee.name,
              value: employee.id,
            }))}
            setSelected={(e) => {
              console.log(e.target.value);
              dispatch({
                type: "EMPLOYEE_ID",
                payload: parseInt(e.target.value),
              });
            }}
            title="المهندس المسؤول"
          />
        </Grid>
      </Grid>
      <Button fullWidth type="submit" variant="contained">
        حفظ
      </Button>
      <Snackbar
        open={toaster.open}
        autoHideDuration={6000}
        onClose={handleCloseToaster}
        // action={action}
      >
        <Alert
          onClose={handleCloseToaster}
          severity={toaster.severity}
          sx={{ width: "100%" }}
        >
          {toaster.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export type ToasterType = {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};
export default ContractData;
