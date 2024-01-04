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
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { FormData, individualInitial, reducer } from "./reducer";
import { useState, useEffect, useReducer } from "react";
import PopUpError from "../data/PopUpError/PopUpError";
import { Branch, Broker } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Api, Domain } from "../../../constants";
import { objectToFormData } from "../../../methods";
import BtnFile from "./BtnFile";
import RequiredSymbol from "../../../components/RequiredSymbol";
import FilePreview from "../../../components/FilePreview";
import { Client } from "../../../types/Clients";
import SelectWithFilter from "../../../components/SelectWithFilter";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useSnackbar } from "notistack";

const paddingSize = 1;
export default function FormAdd() {
  const [clientEdit, setclientEdit] = useState<Client | null>(null);
  const [branches, setBranches] = useState<Branch[] | undefined>(undefined);
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [formData, dispatch] = useReducer(reducer, individualInitial);
  const [errors, setErrors] = useState<
    Partial<FormData & { card_image: string }> | undefined
  >(undefined);
  const [phoneDuplicateConfirm, setPhoneDuplicateConfirm] = useState(false);
  const [isUniquePhoneNumber, setIsUniquePhoneNumber] =
    useState<IsUniqueType>("unknown");
  const [isUniqueIdNumber, setIsUniqueIdNumber] =
    useState<IsUniqueType>("unknown");
  const [isUniqueRegisterNumber, setIsUniqueRegisterNumber] =
    useState<IsUniqueType>("unknown");
  const [open, setOpen] = useState(false);
  const params = useParams();
  const IS_EDIT_MODE = !!params.id;
  //toster
  const snackbar = useSnackbar();
  const submitDisabled =
    !IS_EDIT_MODE &&
    ((isUniqueIdNumber !== "unique" && isUniqueRegisterNumber !== "unique") ||
      (isUniquePhoneNumber !== "unique" && !phoneDuplicateConfirm));

  const navigate = useNavigate();
  useEffect(() => {
    setIsUniquePhoneNumber("unknown");
  }, [formData.phone]);
  useEffect(() => {
    setIsUniqueIdNumber("unknown");
  }, [formData.card_id]);
  useEffect(() => {
    setIsUniqueRegisterNumber("unknown");
  }, [formData.register_number]);
  useEffect(() => {
    setIsUniqueIdNumber("unknown");
    setIsUniqueRegisterNumber("unknown");
    setPhoneDuplicateConfirm(false);
  }, [formData.type]);
  // function handle Type
  function changeTypeHandler(type: "individual" | "company") {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) dispatch({ type: "TYPE", payload: type });
    };
  }

  async function GetDataClient() {
    try {
      const { data } = await axios.get<{
        data: Client;
      }>(Api(`employee/client/edit/${params.id}`), {});

      setclientEdit(data.data);

      dispatch({ type: "SET_DTO", payload: data.data });
    } catch (error) {
      console.log(error);
    }
  }
  // useEffect get branches , broker and clientRespose
  useEffect(() => {
    if (params?.id) GetDataClient();
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
        setBrokers([]);
        console.log("err", err);
      });
  }, []);
  const handleClickOpen = () => {
    setOpen(!open);
  };
  // function handle submit
  function submitHandle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    axios
      .post(Api("employee/client/store"), objectToFormData(formData))
      .then((res) => {
        snackbar.enqueueSnackbar("تم حفظ بيانات العميل : " + formData.name);
        navigate("/react/clients");
      })
      .catch((err) => {
        snackbar.enqueueSnackbar("تعذر في حفظ بيانات العميل", {
          variant: "error",
        });
        let errorObj: { key: string; value: string }[] = [];
        let tempObj: { [key: string]: string } = {};
        for (let i in err.response?.data?.data) {
          const current: string[] = err.response?.data?.data[i] || [];
          current.join(", ");
          errorObj.push({ key: i, value: current.join(", ") });
        }

        errorObj.forEach((item) => {
          tempObj[item.key] = item.value;
        });
        console.log(err.response?.data?.msg);

        setErrors(tempObj);
        errorObj.forEach((error) => {
          if (error.key === "card_id") {
            setOpen(!open);
          }
        });
      });
  }
  //Edit handle
  function EditHandle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("card image", formData.card_image);
    let { card_image, ...withoutImage } = formData;

    console.log("without image", withoutImage);
    const toSend = formData.card_image
      ? objectToFormData(formData)
      : objectToFormData(withoutImage);
    // const toSend = objectToFormData(temp);

    axios
      .post(Api(`employee/client/update/${clientEdit?.id}`), toSend)
      .then((res) => {
        snackbar.enqueueSnackbar("تم تعديل بيانات العميل بنجاح");
        navigate("/react/clients");
      })
      .catch((err) => {
        snackbar.enqueueSnackbar("تعذر في حفظ بيانات العميل", {
          variant: "error",
        });
        let errorObj: { key: string; value: string }[] = [];
        let tempObj: { [key: string]: string } = {};
        for (let i in err.response?.data?.data) {
          const current: string[] = err.response?.data?.data[i] || [];
          current.join(", ");
          errorObj.push({ key: i, value: current.join(", ") });
        }

        errorObj.forEach((item) => {
          tempObj[item.key] = item.value;
        });
        console.log(err.response?.data?.msg);

        setErrors(tempObj);
        errorObj.forEach((error) => {
          if (error.key === "card_id") {
            setOpen(!open);
          }
        });
      });
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="on"
      onSubmit={(e) => {
        clientEdit ? EditHandle(e) : submitHandle(e);
      }}
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
            label="فرد"
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
      <Grid container width={0.9}>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            {formData.type === "individual" ? (
              <Typography component="label">
                اسم العميل
                {"  "}
                <RequiredSymbol />
              </Typography>
            ) : (
              <Typography component="label">
                اسم الشركه
                {"  "}
                <RequiredSymbol />
              </Typography>
            )}
            <TextField
              id="outlined-name-input"
              type="text"
              required
              size="small"
              value={formData.name}
              placeholder={
                formData.type === "individual" ? "اسم العميل" : "اسم الشركه"
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
            {formData.type === "individual" ? (
              <Typography
                component="label"
                color={clientEdit ? "text.disabled" : ""}
              >
                رقم الهويه <RequiredSymbol />
              </Typography>
            ) : (
              <Typography
                component="label"
                color={clientEdit ? "text.disabled" : ""}
              >
                السجل التجاري <RequiredSymbol />
              </Typography>
            )}
            <TextField
              disabled={!!clientEdit}
              id="outlined-idNumber-input"
              required
              onBlur={
                formData.type === "individual"
                  ? checkIsUniqueIdNumber
                  : checkIsRegisterNumber
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {formData.type === "individual"
                      ? returnShapeToView(isUniqueIdNumber, "error")
                      : returnShapeToView(isUniqueRegisterNumber, "error")}
                  </InputAdornment>
                ),
              }}
              placeholder={
                formData.type === "individual" ? "رقم الهويه" : "السجل التجاري"
              }
              size="small"
              value={
                formData.type === "individual"
                  ? formData.card_id
                  : formData.register_number
              }
              onChange={(e) => {
                dispatch({
                  type:
                    formData.type === "individual"
                      ? "CARD_ID"
                      : "REGISTER_NUMBER",

                  payload: e.target.value,
                });
              }}
            />

            <PopUpError
              open={open}
              setOpen={setOpen}
              handleClickOpen={handleClickOpen}
              card_idError={errors?.card_id?.toString()}
              phoneError={errors?.phone}
              checkPhone={() => {
                setPhoneDuplicateConfirm(true);
                dispatch({ type: "CHECK_PHONE", payload: null });
                setOpen(!open);
              }}
              registerError={errors?.register_number?.toString()}
            />
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography
              component="label"
              color={clientEdit ? "text.disabled" : ""}
            >
              رقم الجوال <RequiredSymbol />
            </Typography>
            <TextField
              id="outlined-phone-input"
              required
              disabled={!formData.check_phone?.length}
              size="small"
              placeholder=" رقم الجوال"
              value={formData.phone}
              onBlur={checkIsUniquePhoneNumber}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {returnShapeToView(isUniquePhoneNumber)}
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                dispatch({ type: "PHONE_NUMBER", payload: e.target.value });
              }}
            />
            {errors?.phone ? (
              <Box display={"flex"} flexDirection={"row"} color="error.main">
                <Typography variant="body2">{errors?.phone}</Typography>
              </Box>
            ) : isUniquePhoneNumber === "used" ? (
              <Box display={"flex"} flexDirection={"row"} color="warning.main">
                <Typography variant="body2">رقم الهاتف مسجل مسبقا</Typography>
                <Typography
                  sx={{
                    ml: 1,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={handleClickOpen}
                >
                  لمعرفة المزيد
                </Typography>
              </Box>
            ) : (
              ""
            )}
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography component="label">البريد الالكتروني</Typography>
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
            <Typography component="label">الوسيط</Typography>
            <SelectWithFilter
              size="small"
              select
              value={formData?.broker_id}
              onChange={(e) => {
                console.log(e.target.value);
                dispatch({
                  type: "BROKER_ID",
                  payload: e.target.value,
                });
              }}
              options={brokers.map((broker) => ({
                label: broker.name,
                value: broker.id,
              }))}
              onFilterEmpty={
                <Stack alignItems="center" p={1}>
                  <Button
                    variant="outlined"
                    component={"a"}
                    href={Domain("admin/brokers/create")}
                    startIcon={<PersonAddIcon />}
                    fullWidth
                  >
                    اضافة وسيط
                  </Button>
                </Stack>
              }
            ></SelectWithFilter>
            <Typography variant="body2" color="error">
              {errors?.broker_id}
            </Typography>
          </Stack>
        </Grid>
        <Grid item p={paddingSize} md={6}>
          <Stack>
            <Typography component="label">
              الفرع <RequiredSymbol />
            </Typography>
            <SelectWithFilter
              id="outlined-select-currency"
              size="small"
              select
              value={formData?.branch_id}
              onChange={(e) => {
                dispatch({
                  type: "BRANCH_ID",
                  payload: e.target.value,
                });
              }}
              options={
                branches?.map((branch) => ({
                  label: branch.name,
                  value: branch.id,
                })) || []
              }
            />
            <Typography variant="body2" color="error">
              {errors?.branch_id}
            </Typography>
          </Stack>
        </Grid>
        {formData.type === "company" && (
          <>
            <Grid item p={paddingSize} md={6}>
              <Stack width={1}>
                <Typography component="label">اسم الوكيل</Typography>
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
        {formData.type === "company" && (
          <Grid item p={paddingSize} md={6}>
            <Typography component="label">ارفاق الملف</Typography>
            {clientEdit ? (
              <FilePreview
                height={40}
                fileName="Image"
                fileLink={formData.cardImageUrl}
              />
            ) : (
              <BtnFile
                file={formData.card_image}
                setFile={(file: File) => {
                  dispatch({ type: "CARD_IMAGE", payload: file });
                }}
              />
            )}
            <Typography variant="body2" color="error">
              {errors?.card_image}
            </Typography>
          </Grid>
        )}
        <Grid item p={paddingSize} md={formData.type === "individual" ? 6 : 12}>
          <Stack>
            <Typography component="label">عنوان المراسلات</Typography>
            <TextField
              id="outlined-address-input"
              type="text"
              required
              size="small"
              placeholder="عنوان المراسلات"
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
        {formData.type === "individual" && (
          <Grid item p={paddingSize} md={6}>
            <Typography component="label">ارفاق الملف</Typography>
            {clientEdit ? (
              <FilePreview
                height={40}
                fileName="Image"
                fileLink={formData.cardImageUrl}
              />
            ) : (
              <BtnFile
                file={formData.card_image}
                setFile={(file: File) => {
                  dispatch({ type: "CARD_IMAGE", payload: file });
                }}
              />
            )}
            <Typography variant="body2" color="error">
              {errors?.card_image}
            </Typography>
          </Grid>
        )}
        <Grid item p={paddingSize} md={9} sx={{ marginX: "auto", mt: 2 }}>
          <Button
            fullWidth
            type="submit"
            disabled={submitDisabled}
            variant="contained"
          >
            حفظ
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  function returnShapeToView(
    type: IsUniqueType,
    warn?: "error" | "warning"
  ): React.ReactNode {
    switch (type) {
      case "loading":
        return <CircularProgress size={24} />;
      case "unique":
        return <CheckIcon color="success" />;
      case "used":
        if (warn === "error") {
          return <WarningIcon color="error" />;
        }
        return <ErrorOutlineIcon color="warning" />;
      default:
        return <></>;
    }
  }

  function isUniqueByKey(
    setter: React.Dispatch<React.SetStateAction<IsUniqueType>>,
    url: string,
    body: Partial<{ register_number: string; card_id: string; mobile: string }>
  ) {
    setter("loading");
    axios
      .post(url, body)
      .then(() => {
        setter("unique");
      })
      .catch(() => {
        setter("used");
      });
  }
  function checkIsUniquePhoneNumber() {
    isUniqueByKey(setIsUniquePhoneNumber, Api("employee/client/mobile-check"), {
      mobile: formData.phone,
    });
  }
  function checkIsUniqueIdNumber() {
    isUniqueByKey(setIsUniqueIdNumber, Api("employee/client/card-id-check"), {
      card_id: formData.card_id?.toString(),
    });
  }
  function checkIsRegisterNumber() {
    isUniqueByKey(
      setIsUniqueRegisterNumber,
      Api("employee/client/register-id-check"),
      {
        register_number: formData.register_number?.toString(),
      }
    );
  }
}

type IsUniqueType = "loading" | "unique" | "unknown" | "used";
