import { Grid, Stack, TextField, Button, InputAdornment } from "@mui/material";
import { useSnackbar } from "notistack";
import { NavLink } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { getUseData } from "../../../../../../methods/getUseData";
import AddLabelToEl from "../../../../../../components/AddLabelToEl";
import SelectWithFilter from "../../../../../../components/SelectWithFilter";

export default function WorkOrderFormData() {
  // TODO::declare and define component state and variables
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [employees, setEmployees] = useState<SelectType[]>([]);
  const { register, control, handleSubmit, setValue, reset } = useForm({});

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
    // prepare body data

    // check data is valid...
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

  // * return component UI
  return (
    <Stack onSubmit={onSubmit} component={"form"}>
      <Grid container spacing={2}>
        {/* رقم امر العمل */}
        <Grid item xs={6}>
          <AddLabelToEl label={"رقم امر العمل"}>
            <TextField size="small" />
          </AddLabelToEl>
        </Grid>
        {/* رمز امر العمل */}
        <Grid item xs={6}>
          <AddLabelToEl label={"رمز امر العمل"}>
            <TextField size="small" />
          </AddLabelToEl>
        </Grid>
        {/* تاريخ الاسناد  */}
        <Grid item xs={6}>
          <AddLabelToEl label={"تاريخ الاسناد"}>
            <Controller
              control={control}
              name="start_date"
              render={({ field }) => (
                <DatePicker
                  slotProps={{ textField: { fullWidth: true, size: "small" } }}
                  onChange={(newValue) => {}}
                />
              )}
            />
          </AddLabelToEl>
        </Grid>
        {/* المقاول */}
        <Grid item xs={6}>
          <AddLabelToEl label={"المقاول"}>
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
              onFilterEmpty={
                <Stack alignItems="center" p={1}>
                  <Button
                    variant="outlined"
                    component={NavLink}
                    to={``}
                    startIcon={<PersonAddIcon />}
                    fullWidth
                  >
                    اضافة مقاول
                  </Button>
                </Stack>
              }
            />
          </AddLabelToEl>
        </Grid>
        {/* مدة التنفيذ */}
        <Grid item xs={6}>
          <AddLabelToEl label={"مدة التنفيذ"}>
            <TextField
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">يوم</InputAdornment>
                ),
              }}
            />
          </AddLabelToEl>
        </Grid>
        {/* نوع امر العمل */}
        <Grid item xs={6}>
          <AddLabelToEl label={"نوع امر العمل"}>
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
        </Grid>
        {/* الادارة / القسم */}
        <Grid item xs={6}>
          <AddLabelToEl label={"الادارة / القسم"}>
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
        </Grid>
        {/* اخر اجراء */}
        <Grid item xs={6}>
          <AddLabelToEl label={"اخر اجراء"}>
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
        </Grid>
        {/* التكلفة التقديرية */}
        <Grid item xs={6}>
          <AddLabelToEl label={"التكلفة التقديرية"}>
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
