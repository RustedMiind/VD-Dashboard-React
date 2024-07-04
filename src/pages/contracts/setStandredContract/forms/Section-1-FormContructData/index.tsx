import { Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { getUseData } from "../../../../../methods/getUseData";
import SelectWithFilter from "../../../../../components/SelectWithFilter";
import { StandredContractContext } from "../../context/StandredContractContext";
import { ContractUse } from "../../../SetContract/ContractDetailsContext";
import axios from "axios";
import { Api } from "../../../../../constants";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { StandredContractType } from "../../../../../types/Contracts/StandredContract";
import { useSnackbar } from "notistack";
import ErrorMessage from "./components/ErrorMessage";

function ContructData() {
  // TODO::declare and define component state and variables
  const [branchId, setBranchId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [branches, setBranches] = useState<SelectType[]>([]);
  const [clients, setClients] = useState<SelectType[]>([]);
  const [employees, setEmployees] = useState<SelectType[]>([]);
  const [managements, setManagements] = useState<SelectType[]>([]);
  const {
    isEdit,
    contract,
    contractType,
    getContractData,
    handleSetSxtended,
    storeContract,
  } = useContext(StandredContractContext);
  const { register, control, handleSubmit, setValue, reset } =
    useForm<FormSchema>({});
  const [errorMessages, setErrorMessages] = useState<
    ErrorObjectType | undefined
  >();
  const [loadDate, setLoadDate] = useState(isEdit);

  // TODO::handle data in Edit case
  useEffect(() => {
    if (contract) {
      setLoadDate(false);
    }
  }, [isEdit, contract]);

  // TODO::handle data in Edit case
  useEffect(() => {
    if (isEdit && contract) {
      setBranchId(contract?.branch_id);
      reset({
        amount: contract?.amount ? +contract?.amount : undefined,
        client_id: contract?.client_id ? +contract?.client_id : undefined,
        code: contract?.code ? contract?.code : undefined,
        date: contract?.date ? contract?.date : undefined,
        end_date: contract?.end_date ? contract?.end_date : undefined,
        contract_type_id: contract?.contract_type_id
          ? +contract?.contract_type_id
          : undefined,
        branch_id: contract?.branch_id ? +contract?.branch_id : undefined,
        management_id: contract?.management_id
          ? +contract?.management_id
          : undefined,
        employee_id: contract?.employee_id ? +contract?.employee_id : undefined,
        contract_name: contract?.contract_name
          ? contract?.contract_name
          : undefined,
      });
      setLoadDate(false);
    }
  }, [isEdit, contract]);

  // TODO::fetch selects data
  useEffect(() => {
    GetNeededData();
  }, []);

  // fetch managements data from
  useEffect(() => {
    if (branchId !== -1) {
      axios
        .get<ContractUse>(Api(`employee/contract/use`), {
          params: {
            branch_id: branchId,
          },
        })
        .then((res) => {
          setManagements(res.data.management ?? []);
        })
        .catch((err) => {});
    }
  }, [branchId]);

  // TODO::declare and define component helper methods
  const GetNeededData = async () => {
    let useData = await getUseData();
    setBranches(useData.branches ?? []);
    setManagements(useData.management ?? []);
    setClients(useData.client ?? []);
    setEmployees(useData.employees ?? []);
  };

  //handle submit form
  const onSubmit = handleSubmit(async (data) => {
    // prepare data which
    let body = {
      ...data,
      contract_type_id: contractType,
    };
    // check data is valid...
    setLoading(true);
    let valid = validData(data);
    if (!valid) {
      enqueueSnackbar("جميع البيانات مطلوبة", { variant: "error" });
      setLoading(false);
      return;
    }
    let url = contract
      ? `employee/contract/update-unified-contract/${contract?.id}`
      : "employee/contract/store-unified-contract";
    // send request....
    axios
      .post<{ msg: string; data: StandredContractType }>(Api(url), body)
      .then((res) => {
        storeContract(res.data.data);
        handleSetSxtended(true);

        if (isEdit) {
          getContractData();
          enqueueSnackbar("تم تعديل البيانات بنجاح");
        } else {
          enqueueSnackbar(res.data.msg);
        }
      })
      .catch((err) => {
        enqueueSnackbar("تعذر انشاء العقد", { variant: "error" });
      })
      .finally(() => setLoading(false));
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
    <Paper>
      {loadDate && (
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Typography variant="subtitle2" fontSize={18} fontWeight={500}>
            جاري تحميل لبانات العقد
          </Typography>
        </Stack>
      )}
      {!loadDate && (
        <Stack onSubmit={onSubmit} component={"form"}>
          <Grid container spacing={2}>
            {/* Branch Field */}
            <Grid item xs={6}>
              <AddLabelToEl label={"نوع الفرع"} required>
                <SelectWithFilter
                  options={branches?.map((ele) => ({
                    label: ele?.name ? ele?.name.toString() : "",
                    value: ele?.id ? ele?.id.toString() : "",
                  }))}
                  defaultValue={contract?.branch_id}
                  size="small"
                  select
                  onChange={(e) => {
                    setBranchId(+e.target.value);
                    setValue("branch_id", +e.target.value);
                  }}
                />
              </AddLabelToEl>
              <ErrorMessage
                show={errorMessages?.branch_id ?? false}
                messgae="الفرع مطلوب"
              />
            </Grid>
            {/* management Field */}
            <Grid item xs={6}>
              <AddLabelToEl label={"الادارة"} required>
                <SelectWithFilter
                  options={managements?.map((ele) => ({
                    label: ele?.name ? ele?.name.toString() : "",
                    value: ele?.id ? ele?.id.toString() : "",
                  }))}
                  defaultValue={contract?.management_id}
                  size="small"
                  select
                  onChange={(e) => {
                    setValue("management_id", +e.target.value);
                  }}
                />
              </AddLabelToEl>
              <ErrorMessage
                show={errorMessages?.management_id ?? false}
                messgae="الادارة مطلوبة"
              />
            </Grid>
            {/* contract number */}
            <Grid item xs={6}>
              <AddLabelToEl label={"رقم العقد"} required>
                <TextField size="small" {...register("code")} />
              </AddLabelToEl>
              <ErrorMessage
                show={errorMessages?.code ?? false}
                messgae="رقم العقد مطلوب"
              />
            </Grid>
            {/* Governmental entity */}
            <Grid item xs={6}>
              <AddLabelToEl label={"الجهة الحكومية"} required>
                <SelectWithFilter
                  options={clients?.map((ele) => ({
                    label: ele?.name ? ele?.name.toString() : "",
                    value: ele?.id ? ele?.id.toString() : "",
                  }))}
                  defaultValue={contract?.client_id}
                  size="small"
                  select
                  onChange={(e) => {
                    setValue("client_id", +e.target.value);
                  }}
                />
              </AddLabelToEl>
              <ErrorMessage
                show={errorMessages?.client_id ?? false}
                messgae="الجهة الحكومية مطلوبة"
              />
            </Grid>
            {/* Start Data */}
            <Grid item xs={6}>
              <AddLabelToEl label={"تاريخ بداية العقد"} required>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value ? dayjs(field.value) : null}
                      slotProps={{
                        textField: { size: "small", fullWidth: true },
                      }}
                      onChange={(newValue) => {
                        field.onChange(
                          newValue ? newValue.format("YYYY-MM-DD") : ""
                        );
                      }}
                    />
                  )}
                />
              </AddLabelToEl>
              <ErrorMessage
                show={errorMessages?.date ?? false}
                messgae="تاريخ بداية العقد مطلوب"
              />
            </Grid>
            {/* End Data */}
            <Grid item xs={6}>
              <AddLabelToEl label={"تاريخ انتهاء العقد"} required>
                <Controller
                  name="end_date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value ? dayjs(field.value) : null}
                      slotProps={{
                        textField: { size: "small", fullWidth: true },
                      }}
                      onChange={(newValue) => {
                        field.onChange(
                          newValue ? newValue.format("YYYY-MM-DD") : ""
                        );
                      }}
                    />
                  )}
                />
              </AddLabelToEl>
              <ErrorMessage
                show={errorMessages?.end_date ?? false}
                messgae="تاريخ نهاية العقد مطلوب"
              />
            </Grid>
            {/* Financial Value */}
            <Grid item xs={6}>
              <AddLabelToEl label={"القيمة المالية"} required>
                <TextField size="small" {...register("amount")} />
              </AddLabelToEl>
              <ErrorMessage
                show={errorMessages?.amount ?? false}
                messgae="القيمة المالبة للعقد مطلوبة"
              />
            </Grid>
            {/* Contract Manager */}
            <Grid item xs={6}>
              <AddLabelToEl label={"مدير العقد"} required>
                <SelectWithFilter
                  options={employees?.map((ele) => ({
                    label: ele?.name ? ele?.name.toString() : "",
                    value: ele?.id ? ele?.id.toString() : "",
                  }))}
                  defaultValue={contract?.employee_id}
                  size="small"
                  select
                  onChange={(e) => {
                    setValue("employee_id", +e.target.value);
                  }}
                />
              </AddLabelToEl>
              <ErrorMessage
                show={errorMessages?.employee_id ?? false}
                messgae="مدير العقد مطلوب"
              />
            </Grid>
            {/* Contract Name */}
            <Grid item xs={6}>
              <AddLabelToEl label={"اسم العقد"} required>
                <TextField size="small" {...register("contract_name")} />
              </AddLabelToEl>
              <ErrorMessage
                show={errorMessages?.contract_name ?? false}
                messgae="اسم العقد مطلوب"
              />
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
            {loading ? " جاري الحفظ...." : !contract ? "حفظ" : "تعديل"}
          </Button>
        </Stack>
      )}
    </Paper>
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
export default ContructData;
