import {
  Stack,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
  MenuItem,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useReducer, useState } from "react";
import { individualInitial, reducer } from "./reducer";
import axios from "axios";
import { Api } from "../../../constants";
import { Branch, Broker } from "../../../types";
import { useParams } from "react-router-dom";
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

export default function FormAdd() {
  const [clientEdit, setclientEdit] = useState<any | undefined>(undefined);
  const [branches, setBranches] = useState<Branch[] | undefined>(undefined);
  const [brokers, setBrokers] = useState<Broker[] | undefined>(undefined);
  const [formData, dispatch] = useReducer(reducer, individualInitial);

  // object respose
  const objectResponse = useParams();
  //toster
  const [toaster, setToaster] = useState<{
    type: "error" | "success" | "null";
  }>({ type: "error" });

  // function handle Type
  function changeTypeHandler(type: "individual" | "company") {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) dispatch({ type: "TYPE", payload: type });
    };
  }

  async function GetDataClient() {
    try {
      const { data } = await axios.get<{ data: any }>(
        Api(`employee/client/edit`),
        {
          params: {
            name: objectResponse.id,
          },
        },
      );
      setclientEdit(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  // useEffect get branches , broker and clientRespose
  useEffect(() => {
    GetDataClient();

    axios
      .get<{ branches: Branch[]; brokers: Broker[] }>(
        Api("employee/client/use"),
      )
      .then(({ data }) => {
        console.log(data);

        setBranches(data.branches);
        setBrokers(data.brokers);
      })
      .catch((err) => {
        setBranches(undefined);
        setBrokers(undefined);
        console.log("err", err);
      });
  }, []);

  // function handle submit
  function submitHandle(e: any) {
    e.preventDefault();
    axios
      .post(Api("employee/client/store"), objectToFormData(formData))
      .then((res) => {
        setToaster({ type: "success" });
        alert("تم");
      })
      .catch((err) => {
        console.log(err);
        setToaster({ type: "error" });
        alert("لا");
      });
  }
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitHandle}
    >
      <Typography variant="h6" fontWeight={600} mb={3} mt={2}>
        {objectResponse.id ? "تعديل بيانات العميل" : "اضافه عميل"}
      </Typography>
      <RadioGroup name="use-radio-group" defaultValue="فرد">
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Radio
                checked={formData.type === "individual"}
                onChange={changeTypeHandler("individual")}
              />
            }
            label="فرد    "
          />
          <FormControlLabel
            control={
              <Radio
                checked={formData.type === "company"}
                onChange={changeTypeHandler("company")}
              />
            }
            label="شركة"
          />
        </Box>
      </RadioGroup>
      <Grid container>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography component="label" sx={{ ml: 2 }}>
              {formData.type == "individual" ? "اسم العميل *" : "اسم الشركه *"}
            </Typography>
            <TextField
              id="outlined-name-input"
              type="text"
              required
              size="small"
              value={objectResponse.id ? clientEdit?.name : formData.name}
              onChange={(e) => {
                dispatch({
                  type: formData.type == "individual" ? "NAME" : "COMPANY_NAME",
                  payload: e.target.value,
                });
              }}
            />
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              {formData.type == "individual"
                ? "رقم الهويه * "
                : "السجل التجاري *"}
            </Typography>
            <TextField
              id="outlined-idNumber-input"
              type="text"
              required
              size="small"
              value={objectResponse.id ? clientEdit?.card_id : formData.card_id}
              onChange={(e) => {
                dispatch({
                  type:
                    formData.type == "individual"
                      ? "CARD_ID"
                      : "REGISTER_NUMBER",

                  payload: parseInt(e.target.value) || 0,
                });
              }}
            />
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              رقم الجوال *
            </Typography>
            <TextField
              id="outlined-phone-input"
              type="text"
              required
              size="small"
              value={objectResponse.id ? clientEdit?.phone : formData.phone}
              onChange={(e) => {
                dispatch({ type: "PHONE_NUMBER", payload: e.target.value });
              }}
            />
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              البريد الالكتروني
            </Typography>
            <TextField
              id="outlined-email-input"
              type="email"
              required
              size="small"
              value={objectResponse.id ? clientEdit?.email : formData.email}
              onChange={(e) => {
                dispatch({ type: "EMAIL", payload: e.target.value });
              }}
            />
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              الوسيط
            </Typography>

            <TextField
              id="outlined-select-currency"
              size="small"
              select
              onChange={(e) => {
                console.log(e.target);
                dispatch({
                  type: "BROKER_ID",
                  payload: parseInt(e.target.value),
                });
              }}
            >
              {brokers?.map((broker) => (
                <MenuItem
                  defaultValue={clientEdit?.broker?.id}
                  key={broker.id}
                  value={broker.id}
                >
                  {broker.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              الفرع *
            </Typography>
            <TextField
              id="outlined-select-currency"
              type="text"
              size="small"
              onChange={(e) => {
                dispatch({
                  type: "BRANCH_ID",
                  payload: parseInt(e.target.value),
                });
              }}
            >
              {branches?.map((branch) => (
                <MenuItem
                  key={branch.id}
                  value={branch.id}
                  defaultValue={clientEdit && branch.name}
                >
                  {branch.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Grid>

        {formData.type === "company" && (
          <Grid item p={paddingSize} md={6}>
            <Stack>
              <Typography sx={{ ml: 2 }} component="label">
                اسم الوكيل
              </Typography>
              <TextField
                id="outlined-select-currency"
                type="text"
                size="small"
                required
                onChange={(e) => {
                  dispatch({
                    type: "AGENT_NAME",
                    payload: e.target.value,
                  });
                }}
              ></TextField>
            </Stack>
          </Grid>
        )}
        <Grid item p={paddingSize} md={6}>
          <Stack width="100%" maxWidth="100%">
            <Typography sx={{ ml: 2 }} component="label">
              عنوان المراسلات
            </Typography>
            <TextField
              id="outlined-address-input"
              type="text"
              required
              size="small"
              fullWidth
              value={
                objectResponse.id
                  ? clientEdit?.letter_head
                  : formData.letter_head
              }
              onChange={(e) => {
                dispatch({ type: "LETTER_HEAD", payload: e.target.value });
              }}
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
                <VisuallyHiddenInput
                  onChange={(e) => {
                    const files = e.target.files;

                    if (files) {
                      const file = files[0];
                      dispatch({ type: "CARD_IMAGE", payload: file });
                      console.log(typeof file);
                    }
                  }}
                  type="file"
                />
              </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={9} sx={{ marginX: "auto", mt: 2 }}>
          <Button fullWidth type="submit" variant="contained">
            حفظ
          </Button>
        </Grid>
      </Grid>
      {/* <Snackbar
        open={toaster.type === "success"}
        autoHideDuration={6000}
        onClose={() => {
          setToaster({ type: "null" });
        }}
        message="Note archived"
      >
        <Alert
          {...(toaster.type === "success"
            ? { severity: "success" }
            : { severity: "error" })}
          sx={{ width: "100%" }}
        >
          {toaster.type === "success"
            ? "تم الحفظ بنجاح"
            : "تعذر في الحفظ, تأكد من ادخال البيانات بالشكل الصحيح"}
        </Alert>
      </Snackbar> */}
    </Box>
  );
}
