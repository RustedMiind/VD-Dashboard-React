import React, { useEffect, useState, useReducer, useContext } from "react";
import {
  Box,
  Button,
  Grid,
  InputBase,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SelectItem from "../../Components/Select";
import { SelectOptions } from "./SelectOptions";
import { Api } from "../../../../../constants";
import axios from "axios";
import { reducer, contractIntial } from "./reducer";
import { useNavigate, useParams } from "react-router-dom";
import BtnFile from "../../../../clients/addClient/BtnFile";
import { objectToFormData } from "../../../../../methods";
// import ContractItemsContextProvider, { ContractItemsContext } from "../../ContractItemsContext";
import RequiredSymbol from "../../../../../components/RequiredSymbol";
import { Contract } from "../../../../../types";
import dayjs from "dayjs";
import { DateFormatString } from "../../../../../constants/DateFormat";
import FilePreview from "../../../../../components/FilePreview";
import { useSnackbar } from "notistack";
import GDicon from "./assets/GDicon.png";
import { IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ContractItemsContextProvider, {
  useContractItemsContext,
} from "../../ContractItemsContext";

import {
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { AddIcCallOutlined, CloudUpload, Edit } from "@mui/icons-material";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import { useForm } from "react-hook-form";

function GridChildren(props: { children: React.ReactNode }) {
  return <Stack p={1}>{props.children}</Stack>;
}

const BnodElamal = (props: PropsType) => {
  const { ContractItemsData, dispatch } = useContractItemsContext();

  const addContractItemHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create the data object to be sent
    const data = {
      name: ContractItemsData.contract_item_title,
      description: ContractItemsData.contract_item_description,
      manager_id: ContractItemsData.contract_item_user,
      contract_id: ContractItemsData.contract_item_eng,
      start_date: ContractItemsData.contract_item_start_date,
      end_date: ContractItemsData.contract_item_end_date,
      sub_items: [
        {
          name: ContractItemsData.contract_item_name,
          // employee_id: ContractItemsData.employee_id.toString()|| null,
          is_progress_bar: "1",
          is_processing: "1",
          is_attachment: "1",
        },
      ],
    };

    console.log(data);

    axios
      .post(Api("employee/contract/items/store"), data)
      .then((response) => {
        console.log(response.data);
        // Reset form data after successful submission
        dispatch({ type: "SET_ALL", payload: {} });
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          // Handle 422 error (Unprocessable Entity)
          console.log("Validation error:", error.response.data);
        } else {
          // Handle other errors
          console.error(error);
        }
      });
  };

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { register, handleSubmit } = useForm<Form>();

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  const handleUserSelectChange = (event: unknown) => {
    // setSelectedUsers(event.target.value);
    //   dispatch({
    //     type: "CONTRACT_ITEM_USER",
    //     payload: event.target.value,
    //   });
  };

  const handleGoogleDriveClick = (event: unknown) => {};

  const [itemCount, setItemCount] = useState(1);

  const handleAllownaceChange = (value: string) => {
    dispatch({ type: "ADD_ALLOWANCE_VALUE", payload: value });
  };

  return (
    <ContractItemsContextProvider>
      <Box p={1} component="form" onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <AddLabelToEl row label="عنوان البند">
                    <TextField
                      fullWidth
                      placeholder="انجاز الاعمال بأمانة جدة"
                      disabled={!isEditingTitle}
                      variant="standard"
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            color="secondary"
                            onClick={handleEditTitle}
                          >
                            <Edit />
                          </IconButton>
                        ),
                      }}
                      {...register("name")}
                    />
                  </AddLabelToEl>
                  <AddLabelToEl row label="وصف">
                    <TextField
                      fullWidth
                      placeholder="وصف انجاز الاعمال بأمانة جدة"
                      defaultValue="وصف انجاز الاعمال بأمانة جدة"
                      disabled={!isEditingTitle}
                      variant="standard"
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            color="secondary"
                            onClick={handleEditTitle}
                          >
                            <Edit />
                          </IconButton>
                        ),
                      }}
                    />
                  </AddLabelToEl>
                  <AddLabelToEl row label="اختيار مدير المهمة">
                    <TextField
                      id="outlined-select-currency"
                      size="small"
                      select
                      value={ContractItemsData?.employee_id}
                      variant="standard"
                      fullWidth
                      placeholder="اختيار مدير المهمة"
                      onChange={(e) => {
                        dispatch({
                          type: "EMPLOYEE_ID",
                          payload: parseInt(e.target.value),
                        });
                      }}
                    >
                      {/* {contractItems?.use?.employees?.map((employee) => (
    <MenuItem key={employee.id} value={employee.id}>
      {employee.name}
    </MenuItem>
  ))} */}
                    </TextField>
                  </AddLabelToEl>
                </Stack>
              </Grid>
              <Grid container spacing={2} style={{ padding: 10 }}>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="flex-start"
                    bgcolor="white"
                    padding={2}
                    borderRadius={1}
                    style={{ marginLeft: -5 }}
                  >
                    <Grid item xs={6}>
                      <Typography>تاريخ البداية</Typography>
                      <TextField
                        type="date"
                        fullWidth
                        onChange={(e) => {
                          dispatch({
                            type: "START_DATE",
                            payload: e.target.value || "",
                          });
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} style={{ marginRight: 10 }}>
                      <Typography>تاريخ الانتهاء</Typography>
                      <TextField
                        type="date"
                        fullWidth
                        onChange={(e) => {
                          dispatch({
                            type: "END_DATE",
                            payload: e.target.value || "",
                          });
                        }}
                      />
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ padding: 10 }}>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    bgcolor="white"
                    padding={2}
                    borderRadius={1}
                    style={{ marginLeft: -5 }}
                  >
                    <Typography>اضافة مستخدمين للمهام</Typography>
                    <FormControl fullWidth>
                      <InputLabel> يمكنك إضافة أكثر من مستخدم</InputLabel>
                      <Select
                        multiple
                        value={selectedUsers}
                        onChange={handleUserSelectChange}
                        fullWidth
                      >
                        <MenuItem value="user1">مستخدم 1</MenuItem>
                        <MenuItem value="user2">مستخدم 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ padding: 10 }}>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    bgcolor="white"
                    padding={2}
                    borderRadius={1}
                    style={{ marginLeft: -5 }}
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Box display="flex" alignItems="center" flex={1}>
                        <Box>
                          <Typography>المرفقات</Typography>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center" flex={1}>
                        <Box
                          border="1px dashed #ccc"
                          display="flex"
                          alignItems="center"
                          marginRight="10px"
                        >
                          <Box padding="5px" marginRight="10px">
                            <CloudUpload />
                          </Box>
                          <Box>
                            <Typography variant="body2">
                              اضافة المرفقات
                            </Typography>
                            <Typography variant="caption">
                              الصيغ المناسبة PNG - PDF - JPG
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center" flex={1}>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          marginLeft="10px"
                        >
                          <Typography>أو استخراج من الدرايف</Typography>
                          <IconButton onClick={handleGoogleDriveClick}>
                            <img
                              src={GDicon}
                              alt="Google Drive"
                              style={{ width: 40, height: 40 }}
                            />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ padding: 10 }}>
                <Grid item xs={12}>
                  {[...Array(itemCount)].map((_, index) => (
                    <React.Fragment key={index}>
                      {/* First set of elements */}
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="flex-start"
                        bgcolor="white"
                        padding={2}
                        borderRadius={1}
                        style={{ marginLeft: -5 }}
                        marginTop={2}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "50%",
                            marginRight: "8px",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Typography>اسم البند</Typography>
                          <TextField
                            placeholder="اسم البند"
                            sx={{ width: "100%" }}
                            onChange={(e) => {
                              dispatch({
                                type: "CONTRACT_ITEM_NAME",
                                payload: e.target.value,
                              });
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            width: "50%",
                          }}
                        >
                          <Typography>اختيار المهندس</Typography>
                          <FormControl sx={{ width: "100%" }}>
                            <InputLabel>اختيار المهندس</InputLabel>
                            <Select
                              onChange={(e) => {
                                dispatch({
                                  type: "CONTRACT_ITEM_ENG",
                                  payload: e.target.value as string,
                                });
                              }}
                            >
                              <MenuItem value="engineer1">مهندس 1</MenuItem>
                              <MenuItem value="engineer2">مهندس 2</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>

                      {/* Second set of elements */}
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="flex-start"
                        bgcolor="white"
                        padding={2}
                        borderRadius={1}
                        style={{ marginLeft: -5 }}
                        marginTop={2}
                      >
                        <Box display="flex" flexDirection="column">
                          <Typography>المسموح للبند</Typography>
                          <Box display="flex">
                            <FormGroup row>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    onChange={() =>
                                      handleAllownaceChange("النسبة المئوية")
                                    }
                                  />
                                }
                                label="النسبة المئوية"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    onChange={() =>
                                      handleAllownaceChange("معاملات")
                                    }
                                  />
                                }
                                label="معاملات"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    onChange={() =>
                                      handleAllownaceChange("المرفقات")
                                    }
                                  />
                                }
                                label="المرفقات"
                              />
                            </FormGroup>
                          </Box>
                        </Box>
                      </Box>
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<AddBoxOutlinedIcon />}
                  style={{
                    backgroundColor: "#d0dce9",
                    color: "#0c4f98",
                    justifyContent: "flex-start",
                  }}
                  onClick={() => setItemCount(itemCount + 1)}
                >
                  <div dir="rtl">اضافة بند فرعي اخر</div>
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  حفظ
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ContractItemsContextProvider>
  );
};
export default BnodElamal;
type PropsType = {
  edit: boolean;
};

export interface Form {
  name: string;
  description: string;
  manager_id: string;
  contract_id: string;
  start_date: string;
  end_date: string;
  sub_items: SubItem[];
}

export interface SubItem {
  name: string;
  employee_id: string;
  is_progress_bar: string;
  is_processing: string;
  is_attachment: number;
}

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
