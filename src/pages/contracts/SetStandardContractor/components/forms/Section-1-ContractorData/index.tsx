import { Button, Grid, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import AddLabelToEl from "../../../../../../components/AddLabelToEl";
import { TextField } from "@mui/material";
import ErrorMessage from "./components/ErrorMessage";
import SelectWithFilter from "../../../../../../components/SelectWithFilter";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUseData } from "../../../../../../methods/getUseData";
import axios from "axios";
import { Api } from "../../../../../../constants";
import CustomFilePond from "../../../../../../components/CustomFilepond";

export default function SetContractorData() {
  // TODO::declare and define component state and variables
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [employees, setEmployees] = useState<SelectType[]>([]);
  const { register, control, handleSubmit, setValue, reset } = useForm({});
  const [errorMessages, setErrorMessages] = useState<
    ErrorObjectType | undefined
  >();

  // TODO::fetch selects data
  useEffect(() => {
    GetNeededData();
  }, []);

  // TODO::declare and define component helper methods
  const GetNeededData = async () => {
    let useData = await getUseData();
    setEmployees(useData.employees ?? []);
  };

  //handle submit form
  const onSubmit = handleSubmit(async (data) => {
    console.log("Form Submitted Successfully.");
    // // prepare data which
    // let body = {
    //   ...data,
    // };
    // // check data is valid...
    // setLoading(true);
    // let valid = validData(data);
    // if (!valid) {
    //   enqueueSnackbar("جميع البيانات مطلوبة", { variant: "error" });
    //   setLoading(false);
    //   return;
    // }
    // let url = "";
    // // send request....
    // axios
    //   .post(Api(url), body)
    //   .then((res) => {
    //     enqueueSnackbar("تم بنجاح");
    //   })
    //   .catch((err) => {
    //     enqueueSnackbar("تعذر انشاء العقد", { variant: "error" });
    //   })
    //   .finally(() => setLoading(false));
  });

  //validation method
  function validData(data: FormSchema) {
    let obj = {
        amount: false,
        client_id: false,
        code: false,
        contract_name: false,
        date: false,
        end_date: false,
        management_id: false,
        employee_id: false,
        branch_id: false,
      },
      valid = true;

    if (!data.branch_id) {
      valid = false;
      obj.branch_id = true;
    }

    if (!data.amount) {
      valid = false;
      obj.amount = true;
    }
    if (!data.client_id) {
      valid = false;
      obj.client_id = true;
    }
    if (!data.code) {
      valid = false;
      obj.code = true;
    }
    if (!data.contract_name) {
      valid = false;
      obj.contract_name = true;
    }
    if (!data.date) {
      valid = false;
      obj.date = true;
    }
    if (!data.end_date) {
      valid = false;
      obj.end_date = true;
    }
    if (!data.management_id) {
      valid = false;
      obj.management_id = true;
    }
    if (!data.employee_id) {
      valid = false;
      obj.employee_id = true;
    }
    setErrorMessages(obj);
    return valid;
  }

  // * return component UI
  return (
    <Stack onSubmit={onSubmit} component={"form"}>
      <Grid container spacing={2}>
        {/* ارفاق ملف */}
        <Grid item xs={12}>
          <AddLabelToEl label={"الشعار"}>
            {false && (
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                my={2}
                p={1}
              >
                <Typography
                  component={"a"}
                  href={""}
                  target="_blank"
                  variant="body1"
                  fontSize={14}
                >
                  عرض الملف
                </Typography>
                <IconButton size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            )}
            <Controller
              name="card_image"
              control={control}
              render={({ field }) => (
                <CustomFilePond
                  {...field}
                  onupdatefiles={(files) => {
                    field.onChange(files.map((file) => file.file)?.[0]);
                  }}
                  allowMultiple={false}
                  maxFiles={1}
                />
              )}
            />
          </AddLabelToEl>
        </Grid>
        {/* اسم المقاول */}
        <Grid item xs={6}>
          <AddLabelToEl label={"اسم المقاول"}>
            <TextField size="small" {...register("code")} />
          </AddLabelToEl>
          <ErrorMessage
            show={errorMessages?.code ?? false}
            messgae="اسم المقاول مطلوب"
          />
        </Grid>
        {/* رقم الجوال */}
        <Grid item xs={6}>
          <AddLabelToEl label={"رقم الجوال"}>
            <TextField size="small" {...register("code")} />
          </AddLabelToEl>
          <ErrorMessage
            show={errorMessages?.code ?? false}
            messgae="رقم الجوال مطلوب"
          />
        </Grid>
        {/* البريد الالكتروني */}
        <Grid item xs={6}>
          <AddLabelToEl label={"البريد الالكتروني"}>
            <TextField size="small" {...register("code")} />
          </AddLabelToEl>
          <ErrorMessage
            show={errorMessages?.code ?? false}
            messgae="البريد الالكتروني مطلوب"
          />
        </Grid>
        {/* مدير المشروع */}
        <Grid item xs={6}>
          <AddLabelToEl label={"مدير المشروع"}>
            <SelectWithFilter
              options={employees?.map((ele) => ({
                label: ele?.name ? ele?.name.toString() : "",
                value: ele?.id ? ele?.id.toString() : "",
              }))}
              //   defaultValue={contract?.employee_id}
              size="small"
              select
              onChange={(e) => {
                setValue("employee_id", +e.target.value);
              }}
            />
          </AddLabelToEl>
          <ErrorMessage
            show={errorMessages?.employee_id ?? false}
            messgae="مدير المشروع مطلوب"
          />
        </Grid>
        {/* رقم جوال مدير المشروع */}
        <Grid item xs={6}>
          <AddLabelToEl label={"رقم جوال مدير المشروع"}>
            <TextField size="small" {...register("contract_name")} />
          </AddLabelToEl>
          <ErrorMessage
            show={errorMessages?.contract_name ?? false}
            messgae="رقم جوال مدير المشروع مطلوب"
          />
        </Grid>
        {/* ارفاق ملف */}
        <Grid item xs={6}>
          <AddLabelToEl label={"ارفاق ملف"}>
            {false && (
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                my={2}
                p={1}
              >
                <Typography
                  component={"a"}
                  href={""}
                  target="_blank"
                  variant="body1"
                  fontSize={14}
                >
                  عرض الملف
                </Typography>
                <IconButton size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            )}
            <Controller
              name="card_image"
              control={control}
              render={({ field }) => (
                <CustomFilePond
                  {...field}
                  onupdatefiles={(files) => {
                    field.onChange(files.map((file) => file.file)?.[0]);
                  }}
                  allowMultiple={false}
                  maxFiles={1}
                />
              )}
            />
          </AddLabelToEl>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        type="submit"
        fullWidth
        disabled={loading}
        sx={{ my: 4 }}
      >
        {loading && <CircularProgress size={16} />}
        {loading ? " جاري الحفظ...." : true ? "حفظ" : "تعديل"}
      </Button>
    </Stack>
  );
}

// declare and define some types
type SelectType = {
  id: number;
  name: string;
};

type ErrorObjectType = {
  amount: boolean;
  client_id: boolean;
  code: boolean;
  contract_name: boolean;
  date: boolean;
  end_date: boolean;
  management_id: boolean;
  employee_id: boolean;
  branch_id: boolean;
};

type FormSchema = {
  code: string;
  date: string;
  end_date: string;
  contract_type_id: number;
  client_id: number;
  branch_id: number;
  management_id: number;
  employee_id: number;
  contract_name: string;
  amount: number;
};
