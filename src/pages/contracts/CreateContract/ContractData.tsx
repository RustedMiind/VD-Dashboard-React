import * as React from "react";
import { useEffect, useState, useReducer, useContext } from "react";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SelectItem, { OptionType } from "./Components/Select";
import TextInput from "./Components/TextInput";
import { ContractDataType } from "../../../types/ContractRequest";
import { Api } from "../../../constants";
import axios from "axios";
import { reducer, contractIntial } from "./Components/reducer";
import { useParams } from "react-router-dom";
import { ClientRequest } from "../../../types";
import BtnFile from "../../clients/addClient/BtnFile";
import { objectToFormData } from "../../../methods";

const paddingSize = 0.1;
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ContractData = () => {
  const { id } = useParams();
  const [requests, setRequests] = useState<ContractDataType | null>(null);
  const [contractData, dispatch] = useReducer(reducer, contractIntial);
  // const [textFilter, setTextFilter] = useState("");
  // const [filteredClients, setFilterdClients] = useState<
  //   ClientRequest[] | undefined
  // >(undefined);

  console.log(contractData);

  useEffect(() => {
    dispatch({ type: "CONTRACT_TYPE_ID", payload: +(id || 1) });
  }, [id]);

  useEffect(() => {
    axios
      .get<ContractDataType>(Api("employee/contract/use"))
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        setRequests(null);
      });
  }, []);

  // const onFilter = (e: any) => {
  //   setTextFilter(e.target.value);
  //   let filtered = requests?.client.filter((client) =>
  //     client.name.includes(textFilter)
  //   );
  //   setFilterdClients(filtered);
  // let filtered = requests?.client.filter((client) =>
  //   client.name.includes(e.target.value)
  // );
  // setFilterdClients(filtered);

  // };

  const addContractHandler = (e: any) => {
    e.preventDefault();
    axios
      .post(Api("employee/contract/store"), objectToFormData(contractData))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Accordion sx={{ mb: 3 }} defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>بيانات العقد</Typography>
      </AccordionSummary>
      <AccordionDetails>
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
                options={requests?.branches.map((branch) => ({
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
                options={requests?.management.map((manage) => ({
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
                selected={+(id || 1)}
                options={requests?.contractType.map((type) => ({
                  title: type.name,
                  value: type.id,
                }))}
                title="نوع العقد"
              />
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <TextInput
                title="موضوع العقد"
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
              <SelectItem
                title={"اسم العميل"}
                options={requests?.client.map((client) => ({
                  title: client.name,
                  value: client.id,
                }))}
                setSelected={(e: any) => {
                  dispatch({
                    type: "CLIENT_ID",
                    payload: parseInt(e.target.value),
                  });
                }}
              />
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <Stack>
                <Typography sx={{ ml: 2 }} component="label">
                  قيمه العقد
                </Typography>
                <TextField
                  id="outlined-address-input"
                  type="text"
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
              <Grid item p={paddingSize} md={6}>
                <Stack>
                  <BtnFile dispatch={dispatch} />
                </Stack>
              </Grid>
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <SelectItem
                selected={null}
                options={[]}
                setSelected={() => {
                  return (select: OptionType | null) => {};
                }}
                title="المهندس المسؤول"
              />
            </Grid>
          </Grid>
          <Button fullWidth type="submit" variant="contained">
            حفظ
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ContractData;
