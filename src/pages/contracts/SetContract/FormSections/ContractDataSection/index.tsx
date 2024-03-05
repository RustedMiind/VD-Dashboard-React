import { useEffect, useState, useReducer, useContext } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SelectItem from "../../Components/Select";
import { SelectOptions } from "./SelectOptions";
import { Api, Domain } from "../../../../../constants";
import axios from "axios";
import { reducer, contractIntial } from "./reducer";
import { useNavigate, useParams } from "react-router-dom";
import { ContractDetailsContext } from "../../ContractDetailsContext";
import RequiredSymbol from "../../../../../components/RequiredSymbol";
import { Contract } from "../../../../../types";
import dayjs from "dayjs";
import { DateFormatString } from "../../../../../constants/DateFormat";
import { useSnackbar } from "notistack";
import { SelectWithFilteration } from "../../../../../components/SelectWithFilteration";
import Loader from "../../../../../components/Loading/Loader";
import SelectWithFilter from "../../../../../components/SelectWithFilter";
import CustomFilePond from "../../../../../components/CustomFilepond";
import { FileBondState } from "../../../../../types/FileBondState";
import { serialize } from "object-to-formdata";
import {
  CustomMenuList,
  ImageMenuItem,
} from "../../../../designs/CreateOrUpdate/FormSections/images";

function GridChildren(props: { children: React.ReactNode }) {
  return <Stack p={1}>{props.children}</Stack>;
}

const ContractData = (props: PropsType) => {
  let { type, id } = useParams();
  if (!id) {
    id = props.contractId ? props.contractId.toString() : undefined;
  }
  const navigate = useNavigate();
  const contractDetails = useContext(ContractDetailsContext);
  const [requests, setRequests] = useState<SelectOptions | null>(null);
  const [contractData, dispatch] = useReducer(reducer, contractIntial);
  const [errors, setErrors] = useState<ErrorObject | undefined>(undefined);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<FileBondState>([]);
  const [imageIsExist, setImageIsExist] = useState(false);
  console.log(contractDetails);

  useEffect(() => {
    if (!props.edit) {
      dispatch({ type: "CONTRACT_TYPE_ID", payload: +(type || 1) });
    } else if (contractDetails.contract) {
      dispatch({
        type: "DTO_TO_FORM",
        payload: contractDetails.contract,
      });
    }
  }, [props.edit, !!contractDetails.contract]);

  useEffect(() => {
    setLoading(false);
    axios
      .get<SelectOptions>(Api("employee/contract/use"))
      .then((res) => {
        console.log("Requests........", res.data);
        setRequests(res.data);
      })
      .catch((err) => {
        console.log("Error...Requests.....", err);
        setRequests(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    contractDetails.refreshUse &&
      contractDetails
        .refreshUse({
          branchId: contractData.branch_id,
          managementId: contractData.management_id,
        })
        .then((result) => {})
        .catch((err) => {});
  }, [contractData.branch_id, contractData.management_id]);

  const addContractHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!props.edit) {
      axios
        .post<{ data: Contract }>(
          Api("employee/contract/store"),
          serialize(contractData)
        )
        .then((res) => {
          enqueueSnackbar("تم حفظ العقد بنجاح");
          navigate(`../${res.data.data.id}/edit`);
        })
        .catch((err) => {
          enqueueSnackbar("تعذر في حفظ العقد ", { variant: "error" });

          const current: ErrorObject | undefined = err?.response?.data?.data;

          setErrors(current);
        });
    } else {
      axios
        .post(Api(`employee/contract/update/${id}`), serialize(contractData))
        .then((response) => {
          enqueueSnackbar("تم تعديل العقد بنجاح");
          if (props.enabledTabs && props.setEnabledTabs) {
            let arr = props.enabledTabs;
            arr.push("panel1.5");
            props.setEnabledTabs([...arr]);
          }
        })
        .catch((error) => {
          const current: ErrorObject | undefined = error?.response?.data?.data;
          setErrors(current);
          enqueueSnackbar("تعذر في تعديل العقد ", { variant: "error" });
        });
    }
  };

  const handleChangeInClientName = (newVal: string) => {
    dispatch({
      type: "CLIENT_ID",
      payload: parseInt(newVal),
    });
  };

  useEffect(() => {
    console.log("ContractData", contractData);
    if (
      contractData?.cardImageUrl &&
      contractData?.cardImageUrl?.endsWith("null")
    ) {
      setImageIsExist(false);
    } else if (contractData?.cardImageUrl) {
      setImageIsExist(true);
    }
  }, [contractData]);

  return (
    <Box
      component="form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        addContractHandler(e);
      }}
    >
      <Grid container width={0.9} paddingBottom={2}>
        <Grid item md={6}>
          <GridChildren>
            <Typography component="label">
              الفرع <RequiredSymbol />
            </Typography>
            <TextField
              size="small"
              select
              disabled={contractDetails.disableInputs}
              value={contractData?.branch_id}
              onChange={(e) => {
                dispatch({
                  type: "BRANCH_ID",
                  payload: parseInt(e.target.value),
                });
              }}
            >
              {requests?.branches?.map((branch) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.name}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="body2" color="error">
              {errors?.branch_id && errors?.branch_id[0]}
            </Typography>
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <Typography component="label">
              الادارة <RequiredSymbol />
            </Typography>
            <TextField
              size="small"
              disabled={
                contractDetails.disableInputs || !contractData.branch_id
              }
              select
              value={contractData?.management_id}
              onChange={(e) => {
                dispatch({
                  type: "MANAGEMENT_ID",
                  payload: parseInt(e.target.value),
                });
              }}
            >
              {contractDetails?.use?.management?.map((manage) => (
                <MenuItem key={manage.id} value={manage.id}>
                  {manage.name}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="body2" color="error">
              {errors?.management_id && errors?.management_id[0]}
            </Typography>
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <Typography component="label">مدة العقد</Typography>
            <TextField
              type="number"
              placeholder="مدة العقد"
              size="small"
              value={contractData?.period}
              onChange={(e) => {
                dispatch({
                  type: "PERIOD",
                  payload: parseInt(e.target.value),
                });
              }}
            />
            <Typography variant="body2" color="error">
              {errors?.period && errors?.period[0]}
            </Typography>
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <Typography component="label">رقم العقد</Typography>
            <TextField
              type="number"
              size="small"
              placeholder="رقم العقد"
              value={contractData?.code}
              onChange={(e) => {
                dispatch({
                  type: "CODE",
                  payload: parseInt(e.target.value),
                });
              }}
            />
            <Typography variant="body2" color="error">
              {errors?.code && errors?.code[0]}
            </Typography>
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <SelectItem
              isDisabled
              selected={+(type || 4)}
              options={requests?.contractType?.map((type) => ({
                title: type.name,
                value: type.id,
              }))}
              title="نوع العقد"
            />
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <Typography component="label">اسم المشروع</Typography>
            <TextField
              type="text"
              size="small"
              placeholder="اسم المشروع"
              value={contractData?.details}
              onChange={(e) => {
                dispatch({
                  type: "DETAILS",
                  payload: e.target.value,
                });
              }}
            />
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <Typography component="label">تاريخ العقد</Typography>
            <DatePicker
              slotProps={{ textField: { size: "small" } }}
              sx={{ w: 1 }}
              value={dayjs(contractData.date)}
              onChange={(newValue) => {
                dispatch({
                  type: "DATE",
                  payload: newValue?.format(DateFormatString) || "",
                });
              }}
            />
          </GridChildren>
          <Typography variant="body2" color="error">
            {errors?.date && errors?.date[0]}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <Typography component="label">اسم العميل</Typography>
            <SelectWithFilter
              options={requests?.client?.map((ele) => ({
                label: ele?.name ? ele?.name.toString() : "",
                value: ele?.id ? ele?.id.toString() : "",
              }))}
              size="small"
              select
              onChange={(e) => {
                dispatch({
                  type: "CLIENT_ID",
                  payload: parseInt(e.target.value),
                });
              }}
              onFilterEmpty={
                <Stack alignItems="center" p={1}>
                  <Button
                    variant="outlined"
                    component={"a"}
                    href={Domain("react/clients/add")}
                    startIcon={<PersonAddIcon />}
                    fullWidth
                  >
                    اضافة عميل
                  </Button>
                </Stack>
              }
            />
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <Typography component="label">قيمه العقد</Typography>
            <TextField
              type="number"
              size="small"
              placeholder="قيمه العقد"
              value={contractData ? contractData?.amount : "قيمه العقد"}
              onChange={(e) => {
                dispatch({
                  type: "AMOUNT",
                  payload: parseInt(e.target.value),
                });
              }}
            />
            <Typography variant="body2" color="error">
              {errors?.amount && errors?.amount[0]}
            </Typography>
          </GridChildren>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <Typography component="label">ارفاق الملف</Typography>
            <CustomFilePond
              acceptedFileTypes={["image/jpeg"]}
              files={image}
              onupdatefiles={(fileItems) => {
                dispatch({
                  type: "CARD_IMAGE",
                  payload: fileItems[0]?.file as File,
                });
              }}
            />
            {contractData?.cardImageUrl && imageIsExist && (
              <CustomMenuList>
                <ImageMenuItem
                  onDelete={() => {
                    // TODO::There is a problem in API in Back-end.
                    axios
                      .delete(Api(`employee/contract/delete-media/${id}`), {
                        headers: { from: "website" },
                      })
                      .then((res) => {
                        setImageIsExist(false);
                        enqueueSnackbar("تم حذف المرفق بنجاح");
                      })
                      .catch(() => {
                        enqueueSnackbar("تعذر في حذف المرفق", {
                          variant: "error",
                        });
                      });
                  }}
                  name={"main image"}
                  url={contractData?.cardImageUrl}
                />
              </CustomMenuList>
            )}
          </GridChildren>
          <Typography variant="body2" color="error">
            {errors?.card_image && errors?.card_image[0]}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <GridChildren>
            <Typography component="label">
              المهندس المسؤول <RequiredSymbol />
            </Typography>
            <TextField
              disabled={
                contractDetails.disableInputs || !contractData.management_id
              }
              id="outlined-select-currency"
              size="small"
              select
              value={contractData?.employee_id}
              onChange={(e) => {
                dispatch({
                  type: "EMPLOYEE_ID",
                  payload: parseInt(e.target.value),
                });
              }}
            >
              {contractDetails?.use?.employees?.map((employee) => (
                <MenuItem key={employee.id} value={employee.id}>
                  {employee.name}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="body2" color="error">
              {errors?.employee_id && errors?.employee_id[0]}
            </Typography>
          </GridChildren>
        </Grid>
        <Grid item mt={4} md={11} sx={{ mx: "auto" }}>
          <GridChildren>
            <Button type="submit" variant="contained">
              حفظ
            </Button>{" "}
          </GridChildren>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ContractData;
type PropsType = {
  edit: boolean;
  contractId?: number;
  setEnabledTabs?: React.Dispatch<React.SetStateAction<string[]>>;
  enabledTabs?: string[];
};

type ErrorObject = {
  code?: string[] | null;
  date?: string[] | null;
  branch_id?: string[] | null;
  client_id?: string[] | null;
  employee_id?: string[] | null;
  management_id?: string[] | null;
  card_image?: string[] | null;
  period?: string[] | null;
  amount?: string[] | null;
};
