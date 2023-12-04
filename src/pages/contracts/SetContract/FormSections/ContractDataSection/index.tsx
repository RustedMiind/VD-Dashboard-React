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
import { SelectOptions } from "./SelectOptions";
import { Api } from "../../../../../constants";
import axios from "axios";
import { reducer, contractIntial } from "./reducer";
import { useParams } from "react-router-dom";
import BtnFile from "../../../../clients/addClient/BtnFile";
import { objectToFormData } from "../../../../../methods";
import { ContractsContext } from "../../../Context/ContractsContext";
import { Contract } from "../../../../../types";
import { ContractDetailsContext } from "../../ContractDetailsContext";

const paddingSize = 0.1;

const ContractData = (props: PropsType) => {
  let contractsContext = useContext(ContractsContext);
  contractsContext.setContracts && contractsContext.setContracts();
  const { type } = useParams();
  const contractDetails = useContext(ContractDetailsContext);
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
    if (!props.edit) {
      console.log("NOT NOT NOT In Edit Mode ");
      dispatch({ type: "CONTRACT_TYPE_ID", payload: +(type || 1) });
    } else if (contractDetails.contract) {
      console.log("In Edit Mode ");
      dispatch({
        type: "SET_ALL",
        payload: {
          amount: contractDetails.contract.amount,
          branch_id: contractDetails.contract.branch_id,
          card_image: null,
          client_id: contractDetails.contract.client_id,
          code: parseInt(contractDetails.contract.code) || 0,
          contract_type_id: contractDetails.contract.contract_type_id,
          date: contractDetails.contract.date,
          details: contractDetails.contract.details,
          employee_id: contractDetails.contract.employee_id,
          management_id: contractDetails.contract.management_id,
          period: parseInt(contractDetails.contract.period) || 0,
          type: contractDetails.contract.type?.id || 1,
        },
      });
    }
  }, [props.edit, !!contractDetails.contract]);

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

  const addContractHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(Api("employee/contract/store"), objectToFormData(contractData))
      .then((response) => {
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
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        addContractHandler(e);
      }}
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
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              مدة العقد
            </Typography>
            <TextField
              // defaultValue={props.defaultValue}
              id="outlined-phone-input"
              type="text"
              required
              size="small"
              // defaultValue={editContract?.period}
              value={contractData ? contractData?.period : "قيمة العقد"}
              onChange={(e) => {
                dispatch({
                  type: "PERIOD",
                  payload: parseInt(e.target.value),
                });
              }}
            />
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              رقم العقد
            </Typography>
            <TextField
              // defaultValue={props.defaultValue}
              id="outlined-phone-input"
              type="text"
              required
              size="small"
              // defaultValue={editContract?.period}
              value={contractData ? contractData?.code : "رقم العقد"}
              onChange={(e) => {
                dispatch({
                  type: "CODE",
                  payload: parseInt(e.target.value),
                });
              }}
            />
          </Stack>
        </Grid>

        <Grid item p={paddingSize} md={6}>
          <SelectItem
            isDisabled={!props.edit}
            selected={+(type || 4)}
            options={requests?.contractType?.map((type) => ({
              title: type.name,
              value: type.id,
            }))}
            title="نوع العقد"
          />
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              موضوع العقد
            </Typography>
            <TextField
              // defaultValue={props.defaultValue}
              id="outlined-phone-input"
              type="text"
              required
              size="small"
              // defaultValue={editContract?.period}
              placeholder={editContract ? editContract?.details : "موضوع العقد"}
              onChange={(e) => {
                dispatch({
                  type: "DETAILS",
                  payload: e.target.value,
                });
              }}
            />
          </Stack>
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
                  onChange={(e: DatePickerEvent | null) => {
                    if (e) {
                      let date = `${e.$D}-${e.$M}-${e.$y}`;
                      dispatch({ type: "DATE", payload: date });
                    }
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
                onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
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
interface DatePickerEvent {
  $D: number;
  $M: number;
  $y: number;
}

type PropsType = {
  edit: boolean;
};
