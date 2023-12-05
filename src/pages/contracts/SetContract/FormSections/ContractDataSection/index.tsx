import { useEffect, useState, useReducer, useContext } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  MenuItem,
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
import RequiredSymbol from "../../../../../components/RequiredSymbol";

const paddingSize = 0.1;
const initialDate = { $D: 4, $M: 12, $y: 2023 };
const ContractData = (props: PropsType) => {
  let contractsContext = useContext(ContractsContext);
  contractsContext.setContracts && contractsContext.setContracts();
  const { type, id } = useParams();
  const contractDetails = useContext(ContractDetailsContext);
  const [requests, setRequests] = useState<SelectOptions | null>(null);
  const [editContract, setEditContract] = useState<Contract | null>(null);
  const [contractData, dispatch] = useReducer(reducer, contractIntial);
  const [clientName, setClientName] = useState<string>("");
  // const date = contractData?.date ? new Date(contractData.date) : null;
  // const datePickerValue = date
  //   ? { $D: date.getDate(), $M: date.getMonth() + 1, $y: date.getFullYear() }
  //   : null;

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
      // console.log("In Edit Mode ");
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
    if (!props.edit) {
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
    } else {
      axios
        .post(
          Api(`employee/contract/update/${id}`),
          objectToFormData(contractData)
        )
        .then((response) => {
          updateAndOpenToaster({
            severity: "success",
            message: "تم تعديل العقد بنجاح",
          });
        })
        .catch((error) => {
          console.log(error);
          updateAndOpenToaster({
            severity: "error",
            message: "تعذر في تعديل العقد ",
          });
        });
    }
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
      <Grid container paddingBottom={2}>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              الفرع <RequiredSymbol />
            </Typography>
            <TextField
              id="outlined-select-currency"
              size="small"
              select
              value={contractData?.branch_id}
              onChange={(e) => {
                console.log(e.target.value);
                dispatch({
                  type: "BRANCH_ID",
                  payload: parseInt(e.target.value),
                });
              }}
            >
              {requests?.branches?.map((branch) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              الادارة <RequiredSymbol />
            </Typography>
            <Grid item p={paddingSize} md={6}>
              <TextField
                id="outlined-select-currency"
                size="small"
                select
                value={contractData?.management_id}
                onChange={(e) => {
                  console.log(e.target.value);
                  dispatch({
                    type: "MANAGEMENT_ID",
                    payload: parseInt(e.target.value),
                  });
                }}
              >
                {requests?.management?.map((manage) => (
                  <MenuItem key={manage.id} value={manage.id}>
                    {manage.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Stack>
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
            isDisabled
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
              placeholder="موضوع العقد"
              value={contractData ? contractData?.details : "موضوع العقد"}
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
                  value={initialDate}
                  slotProps={{ textField: { size: "small" } }}
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
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              اسم العميل
            </Typography>
            <TextField
              id="outlined-select-currency"
              size="small"
              select
              value={contractData?.client_id}
              onChange={(e) => {
                console.log(e.target.value);
                dispatch({
                  type: "CLIENT_ID",
                  payload: parseInt(e.target.value),
                });
              }}
            >
              {requests?.client?.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          {/* <Autocomplete
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
                      setClientName(client.name);
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
          /> */}
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
              value={contractData ? contractData?.amount : "قيمه العقد"}
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
            <BtnFile
              file={contractData.card_image}
              setFile={(file: File) => {
                dispatch({ type: "CARD_IMAGE", payload: file });
              }}
            />
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Typography sx={{ ml: 2 }} component="label">
            المهندس المسؤول <RequiredSymbol />
          </Typography>
          <Grid item p={paddingSize} md={6}>
            <TextField
              id="outlined-select-currency"
              size="small"
              select
              value={contractData?.employee_id}
              onChange={(e) => {
                console.log(e.target.value);
                dispatch({
                  type: "EMPLOYEE_ID",
                  payload: parseInt(e.target.value),
                });
              }}
            >
              {requests?.employees?.map((employee) => (
                <MenuItem key={employee.id} value={employee.id}>
                  {employee.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Grid>
      <Button fullWidth type="submit" variant="contained">
        حفظ
      </Button>
      <Snackbar
        open={toaster.open}
        autoHideDuration={6000}
        onClose={handleCloseToaster}
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
