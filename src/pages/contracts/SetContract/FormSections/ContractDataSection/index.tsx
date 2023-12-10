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
import { useNavigate, useParams } from "react-router-dom";
import BtnFile from "../../../../clients/addClient/BtnFile";
import { objectToFormData } from "../../../../../methods";
import { ContractsContext } from "../../../Context/ContractsContext";
import { ContractDetailsContext } from "../../ContractDetailsContext";
import RequiredSymbol from "../../../../../components/RequiredSymbol";
import { Contract } from "../../../../../types";
import dayjs, { Dayjs } from "dayjs";
import { DateFormatString } from "../../../../../constants/DateFormat";

const ContractData = (props: PropsType) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-17"));
  let contractsContext = useContext(ContractsContext);
  contractsContext.setContracts && contractsContext.setContracts();
  const { type, id } = useParams();
  const navigate = useNavigate();
  const contractDetails = useContext(ContractDetailsContext);
  const [requests, setRequests] = useState<SelectOptions | null>(null);
  const [contractData, dispatch] = useReducer(reducer, contractIntial);
  const [toaster, setToaster] = useState<ToasterType>({
    open: false,
    message: "",
    severity: "success",
  });
  function GridChildren(props: { children: React.ReactNode }) {
    return <Stack p={1}>{props.children}</Stack>;
  }
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
        .post<{ data: Contract }>(
          Api("employee/contract/store"),
          objectToFormData(contractData)
        )
        .then((res) => {
          updateAndOpenToaster({
            severity: "success",
            message: "تم حفظ العقد بنجاح",
          });
          setTimeout(() => {
            navigate(`../${res.data.data.id}/edit`);
          }, 2000);
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
      noValidate
      autoComplete="off"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        addContractHandler(e);
      }}
    >
      <Grid container width={0.9} paddingBottom={2}>
        <Grid item md={6}>
          <GridChildren>
            <Typography sx={{ ml: 2 }} component="label">
              الفرع <RequiredSymbol />
            </Typography>
            <TextField
              size="small"
              select
              value={contractData?.branch_id}
              onChange={(e) => {
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
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <Typography sx={{ ml: 2 }} component="label">
              الادارة <RequiredSymbol />
            </Typography>
            <TextField
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
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <Typography sx={{ ml: 2 }} component="label">
              مدة العقد
            </Typography>
            <TextField
              type="number"
              placeholder="مدة العقد"
              required
              size="small"
              value={contractData?.period}
              onChange={(e) => {
                dispatch({
                  type: "PERIOD",
                  payload: parseInt(e.target.value),
                });
              }}
            />
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <Typography sx={{ ml: 2 }} component="label">
              رقم العقد
            </Typography>
            <TextField
              type="number"
              required
              size="small"
              placeholder="رقم العقد"
              value={contractData?.code}
              onChange={(e) => {
                dispatch({
                  type: "CODE",
                  payload: parseInt(e.target.value),
                });
              }}
            />
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <SelectItem
              isDisabled
              selected={+(type || 4)}
              options={requests?.contractType?.map((type) => ({
                title: type.name,
                value: type.id,
              }))}
              title="نوع العقد"
            />
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <Typography sx={{ ml: 2 }} component="label">
              موضوع العقد
            </Typography>
            <TextField
              type="text"
              required
              size="small"
              placeholder="موضوع العقد"
              value={contractData?.details}
              onChange={(e) => {
                dispatch({
                  type: "DETAILS",
                  payload: e.target.value,
                });
              }}
            />
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <Typography sx={{ ml: 2 }} component="label">
              تاريخ العقد
            </Typography>
            <DatePicker
              slotProps={{ textField: { size: "small" } }}
              sx={{ w: 1 }}
              disableFuture
              value={dayjs(contractData.date)}
              onChange={(newValue) => {
                dispatch({
                  type: "DATE",
                  payload: newValue?.format(DateFormatString) || "",
                });
              }}
            />
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <Typography sx={{ ml: 2 }} component="label">
              اسم العميل
            </Typography>
            <TextField
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
          </GridChildren>
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
        <Grid item md={6}>
          <GridChildren>
            <Typography sx={{ ml: 2 }} component="label">
              قيمه العقد
            </Typography>
            <TextField
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
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <BtnFile
              file={contractData.card_image}
              setFile={(file: File) => {
                dispatch({ type: "CARD_IMAGE", payload: file });
              }}
            />{" "}
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <Typography sx={{ ml: 2 }} component="label">
              المهندس المسؤول <RequiredSymbol />
            </Typography>
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
          </GridChildren>
        </Grid>
        <Grid item mt={4} md={11} sx={{ mx: "auto" }}>
          <GridChildren>
            <Button type="submit" variant="contained">
              حفظ
            </Button>{" "}
          </GridChildren>
        </Grid>
      </Grid>
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
type PropsType = {
  edit: boolean;
};
