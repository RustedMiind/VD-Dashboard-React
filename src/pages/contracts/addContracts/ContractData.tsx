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
import SelectItem, { OptionType } from "./FormComponents/Select";
import TextInput from "./FormComponents/TextInput";
import { ContractRequest } from "../../../types/ContractRequest";
import { Api } from "../../../constants";
import axios from "axios";
import { reducer, contractIntial } from "./FormComponents/reducer";
import {
  ContextProvider,
  ContractCreationOptionContext,
} from "../Context/Store";
import { contractTypes } from "./ContractTyeps";

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
  const [requests, setRequests] = useState<ContractRequest[] | null>(null);
  const [contractData, dispatch] = useReducer(reducer, contractIntial);
  const [option, setOption] = useContext(ContractCreationOptionContext);

  console.log(contractData);
  useEffect(() => {
    axios
      .get<{ data: ContractRequest[] }>(Api("employee/contract"))
      .then((res) => {
        setRequests(res.data.data);
        console.log(res.data.data, "dd");
      })
      .catch((err) => {
        setRequests(null);
      });
  }, []);

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
        >
          <Grid container>
            <Grid item p={paddingSize} md={6}>
              {/* <SelectItem
                  selected={null}
                  options={requests}
                  setSelected={() => {
                    return (select: OptionType | null) => {};
                  }}
                  title="نوع الفرع"
                /> */}
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <SelectItem
                selected={option}
                options={contractTypes.map((o) => ({
                  title: o.name,
                  value: o.type,
                }))}
                setSelected={() => {
                  return (select: OptionType | null) => {};
                }}
                title="الاداره"
              />
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <TextInput title={"مدة العقد"} />
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <TextInput title={"رقم العقد"} />
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <SelectItem
                selected={option}
                options={contractTypes.map((o) => ({
                  title: o.name,
                  value: o.type,
                }))}
                setSelected={(e) => {
                  setOption && setOption(parseInt(e.target.value));
                }}
                title="نوع العقد"
              />
              {/* <div>
                {option} {typeof option}
              </div> */}
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <TextInput title="موضوع العقد" />
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
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Stack>
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <TextInput title="اسم العميل" />
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
                />
              </Stack>
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <Stack>
                <Typography sx={{ ml: 2 }} component="label">
                  ارفاق صورة الهويه
                </Typography>
                <Box sx={{ mt: 1, ml: 1 }}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    ارفاق صورة
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Box>
              </Stack>
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
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ContractData;
