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
  Alert,
  Snackbar,
} from "@mui/material";
import { FormData, individualInitial, reducer } from "./reducer";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TypeAdd } from "./AddClient";
import { useState, useEffect, useReducer } from "react";
import PopUpError from "../data/PopUpError/PopUpError";
import { Branch, Broker } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Api } from "../../../constants";
import { objectToFormData } from "../../../methods";
const paddingSize = 0.1;
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
});

export default function FormAdd() {
  const [clientEdit, setclientEdit] = useState<any | undefined>(undefined);
  const [branches, setBranches] = useState<Branch[] | undefined>(undefined);
  const [brokers, setBrokers] = useState<Broker[] | undefined>(undefined);
  const [formData, dispatch] = useReducer(reducer, individualInitial);
  const [errors, setErrors] = useState<
    Partial<FormData & { card_image: string }> | undefined
  >(undefined);
  const [card_idError, setCard_idError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [open, setOpen] = useState(false);
  // object respose
  const objectResponse = useParams();
  //toster
  const [toaster, setToaster] = useState<{
    type: "error" | "success" | "null";
  }>({ type: "error" });
  const navigate = useNavigate();

  // function handle Type
  function changeTypeHandler(type: "individual" | "company") {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) dispatch({ type: "TYPE", payload: type });
    };
  }

  async function GetDataClient() {
    console.log(objectResponse);

    try {
      const { data } = await axios.get<{ data: any }>(
        Api(`employee/client/edit`),
        {
          params: {
            name: objectResponse.name,
          },
        }
      );
      setclientEdit(data.data);
      let { card_image, ...FormWithoutImage } = data.data;
      dispatch({ type: "SET_TYPE_WITH_CHECK", payload: data.data });
    } catch (error) {
      console.log(error);
    }
  }
  // useEffect get branches , broker and clientRespose
  useEffect(() => {
    if (objectResponse?.name) GetDataClient();
    else setclientEdit(null);
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

  // function handle submit
  function submitHandle(e: any) {
    e.preventDefault();
    axios
      .post(Api("employee/client/store"), objectToFormData(formData))
      .then((res) => {
        setToaster({ type: "success" });
        navigate("/react/clients");
      })
      .catch((err) => {
        setToaster({ type: "error" });
        // setCard_idError(err.response.data.data.card_id[0]);
        // setPhoneError(err.response.data.data.phone[0]);

        let errorObj: { key: string; value: string }[] = [];
        let tempObj: any = {};

        for (let i in err.response.data.data) {
          const current = err.response.data.data[i] as string[];
          current.join(", ");
          errorObj.push({ key: i, value: current.join(", ") });
        }
        errorObj.forEach((item) => {
          tempObj[item.key] = item.value;
        });
        setErrors(tempObj);
      });
    if (card_idError) {
      console.log("dalog2");
      return (
        <PopUpError
          card_idError={card_idError}
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
        />
      );
    }
    if (phoneError) {
      console.log("dalog");
      return (
        <PopUpError
          phoneError={phoneError}
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
        />
      );
    }
  }
  //Edit handle
  function EditHandle(e: any) {
    e.preventDefault();
    console.log("card image", formData.card_image);
    let { card_image, ...withoutImage } = formData;

    console.log("without image", withoutImage);
    const toSend = formData.card_image
      ? objectToFormData(formData)
      : objectToFormData(withoutImage);
    // const toSend = objectToFormData(temp);

    axios
      .post(Api(`employee/client/update/${clientEdit.id}`), toSend)
      .then((res) => {
        setToaster({ type: "success" });
        console.log(formData);
        navigate("/react/clients");
      })
      .catch((err) => {
        console.log(err);
        setToaster({ type: "error" });
        let errorObj: { key: string; value: string }[] = [];
        let tempObj: any = {};
        for (let i in err.response.data.data) {
          const current = err.response.data.data[i] as string[];
          current.join(", ");
          errorObj.push({ key: i, value: current.join(", ") });
        }
        errorObj.forEach((item) => {
          tempObj[item.key] = item.value;
        });
        // setCard_idError(err.response.data.data.card_id[0]);
        // setPhoneError(err.response.data.data.phone[0]);
      });

    // if (card_idError) {
    //   return (
    //     <PopUpError
    //       card_idError={card_idError}
    //       open={open}
    //       handleClose={handleCloseDialog}
    //     />
    //   );
    // }
    // if (phoneError) {
    //   return (
    //     <PopUpError
    //       phoneError={phoneError}
    //       open={open}
    //       handleClose={handleCloseDialog}
    //     />
    //   );
    // }
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={clientEdit ? EditHandle : submitHandle}
    >
      <Typography variant="h6" fontWeight={600} mb={3} mt={2}>
        {clientEdit ? "تعديل بيانات العميل" : "اضافه عميل"}
      </Typography>

      <RadioGroup name="use-radio-group" value={formData.type}>
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Radio
                disabled={!!clientEdit}
                checked={formData.type === "individual"}
                onChange={changeTypeHandler("individual")}
              />
            }
            label="فرد    "
          />
          <FormControlLabel
            control={
              <Radio
                disabled={!!clientEdit}
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
              value={formData.name}
              placeholder={
                formData.type == "individual" ? "اسم العميل" : "اسم الشركه"
              }
              onChange={(e) => {
                dispatch({
                  type: "NAME",
                  payload: e.target.value,
                });
              }}
            />

            <Typography variant="body2" color="error">
              {errors?.name}
            </Typography>
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
              type="number"
              required
              placeholder={
                formData.type == "individual" ? "رقم الهويه" : "السجل التجاري"
              }
              size="small"
              value={
                formData.type == "individual"
                  ? formData.card_id
                  : formData.register_number
              }
              onChange={(e) => {
                dispatch({
                  type:
                    formData.type == "individual"
                      ? "CARD_ID"
                      : "REGISTER_NUMBER",

                  payload: parseInt(e.target.value),
                });
              }}
            />
            <Typography variant="body2" color="error">
              {errors?.card_id}
            </Typography>
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
              placeholder=" رقم الجوال"
              defaultValue={clientEdit ? clientEdit.phone : ""}
              value={formData.phone}
              onChange={(e) => {
                dispatch({ type: "PHONE_NUMBER", payload: e.target.value });
              }}
            />

            <Typography variant="body2" color="error">
              {errors?.phone}
            </Typography>
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
              placeholder="البريد الالكتروني"
              size="small"
              defaultValue={clientEdit ? clientEdit.email : ""}
              value={formData.email}
              onChange={(e) => {
                dispatch({ type: "EMAIL", payload: e.target.value });
              }}
            />

            <Typography variant="body2" color="error">
              {errors?.email}
            </Typography>
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              الوسيط
            </Typography>
            {(clientEdit === null || clientEdit?.broker_id) && (
              <TextField
                id="outlined-select-currency"
                size="small"
                select
                defaultValue={clientEdit?.broker_id}
                placeholder="الوسيط"
                onChange={(e) => {
                  console.log(e.target);
                  dispatch({
                    type: "BROKER_ID",
                    payload: parseInt(e.target.value),
                  });
                }}
              >
                {brokers?.map((broker) => (
                  <MenuItem key={broker.id} value={broker.id}>
                    {broker.name}
                  </MenuItem>
                ))}
              </TextField>
            )}

            <Typography variant="body2" color="error">
              {errors?.broker_id}
            </Typography>
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography sx={{ ml: 2 }} component="label">
              الفرع *
            </Typography>
            {(clientEdit === null || clientEdit?.branch_id) && (
              <TextField
                id="outlined-select-currency"
                size="small"
                select
                placeholder="الفرع"
                defaultValue={clientEdit?.branch_id}
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
                    // selected={branch?.id === clientEdit?.branch_id}
                  >
                    {branch.name}
                  </MenuItem>
                ))}
              </TextField>
            )}

            <Typography variant="body2" color="error">
              {errors?.branch_id}
            </Typography>
          </Stack>
        </Grid>
        {formData.type === "company" && (
          <>
            <Grid item p={paddingSize} md={6}>
              <Stack>
                <Typography sx={{ ml: 2 }} component="label">
                  اسم الوكيل
                </Typography>
                <TextField
                  id="outlined-address-input"
                  type="text"
                  required
                  size="small"
                  placeholder="اسم الوكيل"
                  defaultValue={clientEdit ? clientEdit.agent_name : ""}
                  value={formData.agent_name}
                  onChange={(e) => {
                    dispatch({ type: "AGENT_NAME", payload: e.target.value });
                  }}
                />

                <Typography variant="body2" color="error">
                  {errors?.agent_name}
                </Typography>
              </Stack>
            </Grid>
          </>
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
              placeholder=""
              fullWidth
              defaultValue={clientEdit ? clientEdit.letter_head : ""}
              value={formData.letter_head}
              onChange={(e) => {
                dispatch({ type: "LETTER_HEAD", payload: e.target.value });
              }}
            />
            <Typography variant="body2" color="error">
              {errors?.letter_head}
            </Typography>
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

              <Typography variant="body2" color="error">
                {errors?.card_image}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={9} sx={{ marginX: "auto", mt: 2 }}>
          <Button fullWidth type="submit" variant="contained">
            حفظ
          </Button>
        </Grid>
      </Grid>

      {/* alert */}
      <Snackbar
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
      </Snackbar>
    </Box>
  );
}
