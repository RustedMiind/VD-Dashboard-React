import {
  Box,
  Button,
  Dialog,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { individualInitial, reducer } from "../../addClient/reducer";
import { Api } from "../../../../constants";
import { Branch, Broker } from "../../../../types";
import { Client } from "../../../../types/Clients";
import { useSnackbar } from "notistack";

function PopUp({ open, onClose, getClients }: PropsType) {
  const [searchClient, dispatch] = useReducer(reducer, individualInitial);
  const [branches, setBranches] = useState<Branch[] | undefined>(undefined);
  const [brokers, setBrokers] = useState<Broker[] | undefined>(undefined);
  const snackbar = useSnackbar();
  useEffect(() => {
    axios
      .get<{ branches: Branch[]; brokers: Broker[] }>(
        Api("employee/client/use")
      )
      .then(({ data }) => {
        setBranches(data.branches);
        setBrokers(data.brokers);
      })
      .catch((err) => {
        setBranches(undefined);
        setBrokers(undefined);
        console.log("err", err);
      });
  }, []);
  const getClient = () => {
    if (
      searchClient.name !== "" ||
      searchClient.phone !== "" ||
      searchClient.branch_id !== "0" ||
      searchClient.broker_id !== "0"
    ) {
      axios
        .get<{ data: Client[] }>(Api(`employee/client/search`), {
          params: {
            name: searchClient.name,
            phone: searchClient.phone,
            branch_id: searchClient.branch_id,
            broker_id: searchClient.broker_id,
          },
        })
        .then(({ data }) => {
          if (data.data.length) {
            getClients({
              advancedSearch: true,
              name: searchClient.name,
              phone: searchClient.phone,
              branch_id: searchClient.branch_id,
              broker_id: searchClient.broker_id,
            });
            onClose();
          }
          // Logic for openEdit page not filter
          // if (data.data) {
          //   // search
          //   navigate(`${data.data.name}/edit`);
          // }
          else {
            snackbar.enqueueSnackbar("لا يوجد عميل بهذه البيانات", {
              variant: "error",
            });
          }
        })
        .catch((err) => {
          snackbar.enqueueSnackbar("تعذر في حفظ العقد", {
            variant: "error",
          });
        });
    }
  };
  function changeTypeHandler(type: "individual" | "company") {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) dispatch({ type: "TYPE", payload: type });
    };
  }
  function submitHandle(
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    getClient();
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <IconButton
        aria-label="delete"
        size="small"
        sx={{
          position: "absolute",
          right: 20,
          mt: 3,
          border: "solid 1px ",
          borderRadius: "8px",
        }}
        color="primary"
        onClick={onClose}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
          p: 5,
        }}
        noValidate
        autoComplete="off"
        onSubmit={submitHandle}
      >
        <Typography>نو ع العميل</Typography>
        <RadioGroup name="use-radio-group" defaultValue="فرد">
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Radio
                  checked={searchClient.type === "individual"}
                  onChange={changeTypeHandler("individual")}
                />
              }
              label="فرد    "
            />

            <FormControlLabel
              control={
                <Radio
                  checked={searchClient.type === "company"}
                  onChange={changeTypeHandler("company")}
                />
              }
              label="شركة"
            />
          </Box>
        </RadioGroup>
        <Grid container>
          <Grid item md={6}>
            <Stack>
              <Typography component="label" sx={{ ml: 2 }}>
                {searchClient.type === "individual"
                  ? "اسم العميل"
                  : "اسم الشركه"}
              </Typography>
              <TextField
                id="outlined-name-input"
                type="text"
                required
                size="small"
                value={searchClient?.name}
                onChange={(e) => {
                  dispatch({
                    type: "NAME",
                    payload: e.target.value,
                  });
                }}
              />
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack>
              <Typography sx={{ ml: 2 }} component="label">
                رقم الجوال
              </Typography>
              <TextField
                id="outlined-phone-input"
                type="text"
                required
                size="small"
                value={searchClient?.phone}
                onChange={(e) => {
                  console.log(e.target.value);

                  dispatch({
                    type: "PHONE_NUMBER",
                    payload: e.target.value,
                  });
                }}
              />
            </Stack>
          </Grid>

          <Grid item md={6}>
            <Stack>
              <Typography sx={{ ml: 2 }} component="label">
                الوسيط
              </Typography>
              <TextField
                id="outlined-select-currency"
                select
                size="small"
                onChange={(e) => {
                  dispatch({
                    type: "BROKER_ID",
                    payload: e.target.value,
                  });
                }}
              >
                {brokers?.map((broker) => (
                  <MenuItem key={broker?.id} value={broker?.id}>
                    {broker?.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack>
              <Typography sx={{ ml: 2 }} component="label">
                الفرع
              </Typography>
              <TextField
                id="outlined-select-currency"
                select
                size="small"
                onChange={(e) => {
                  dispatch({
                    type: "BRANCH_ID",
                    payload: e.target.value,
                  });
                }}
              >
                {branches?.map((branch) => (
                  <MenuItem key={branch?.id} value={branch?.id}>
                    {branch?.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Grid>
          <Grid item md={9} sx={{ marginX: "auto", mt: 2 }}>
            <Button
              fullWidth
              onSubmit={submitHandle}
              type="submit"
              variant="contained"
            >
              بحث
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

export default PopUp;

type PropsType = {
  open: boolean;
  onClose: () => void;
  getClients: (params?: unknown) => void;
};
