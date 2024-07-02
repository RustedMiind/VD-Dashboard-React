import { Grid, MenuItem, Paper, Select, Stack, TextField } from "@mui/material";
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

function ContructData() {
  // TODO::declare and define component state and variables
  const [branchId, setBranchId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState<SelectType[]>([]);
  const [clients, setClients] = useState<SelectType[]>([]);
  const [employees, setEmployees] = useState<SelectType[]>([]);
  const [managements, setManagements] = useState<SelectType[]>([]);
  const { contractType, handleSetSxtended, storeContract } = useContext(
    StandredContractContext
  );
  const { register, control, handleSubmit, setValue, reset } =
    useForm<FormSchema>({});

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
    // send request....
    axios
      .post<{ data: StandredContractType }>(
        Api("employee/contract/store-unified-contract"),
        body
      )
      .then((res) => {
        console.log("res.data.data", res.data.data, res.data);
        storeContract(res.data.data);
        handleSetSxtended(true);
      })
      .catch((err) => {
        console.log("Error Message ::", err);
      });
  });

  // * return component UI
  return (
    <Paper>
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
                size="small"
                select
                onChange={(e) => {
                  setBranchId(+e.target.value);
                  setValue("branch_id", +e.target.value);
                }}
              />
            </AddLabelToEl>
          </Grid>
          {/* management Field */}
          <Grid item xs={6}>
            <AddLabelToEl label={"الادارة"} required>
              <SelectWithFilter
                options={managements?.map((ele) => ({
                  label: ele?.name ? ele?.name.toString() : "",
                  value: ele?.id ? ele?.id.toString() : "",
                }))}
                size="small"
                select
                onChange={(e) => {
                  setValue("management_id", +e.target.value);
                }}
              />
            </AddLabelToEl>
          </Grid>
          {/* contract number */}
          <Grid item xs={6}>
            <AddLabelToEl label={"رقم العقد"} required>
              <TextField size="small" {...register("code")} />
            </AddLabelToEl>
          </Grid>
          {/* Governmental entity */}
          <Grid item xs={6}>
            <AddLabelToEl label={"الجهة الحكومية"} required>
              <SelectWithFilter
                options={clients?.map((ele) => ({
                  label: ele?.name ? ele?.name.toString() : "",
                  value: ele?.id ? ele?.id.toString() : "",
                }))}
                size="small"
                select
                onChange={(e) => {
                  setValue("client_id", +e.target.value);
                }}
              />
            </AddLabelToEl>
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
          </Grid>
          {/* Financial Value */}
          <Grid item xs={6}>
            <AddLabelToEl label={"القيمة المالية"} required>
              <TextField size="small" {...register("amount")} />
            </AddLabelToEl>
          </Grid>
          {/* Contract Manager */}
          <Grid item xs={6}>
            <AddLabelToEl label={"مدير العقد"} required>
              <SelectWithFilter
                options={employees?.map((ele) => ({
                  label: ele?.name ? ele?.name.toString() : "",
                  value: ele?.id ? ele?.id.toString() : "",
                }))}
                size="small"
                select
                onChange={(e) => {
                  setValue("employee_id", +e.target.value);
                }}
              />
            </AddLabelToEl>
          </Grid>
          {/* Contract Name */}
          <Grid item xs={6}>
            <AddLabelToEl label={"اسم العقد"} required>
              <TextField size="small" {...register("contract_name")} />
            </AddLabelToEl>
          </Grid>
        </Grid>
        <Button variant="contained" type="submit" fullWidth sx={{ my: 4 }}>
          {loading && <CircularProgress size={16} />}
          {loading ? " جاري الحفظ...." : "حفظ"}
        </Button>
      </Stack>
    </Paper>
  );
}

// declare and define some types
type SelectType = {
  id: number;
  name: string;
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
