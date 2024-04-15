import React, {
  useEffect,
  useState,
  useReducer,
  useContext,
  ChangeEvent,
} from "react";
import {
  Box,
  Button,
  Grid,
  InputBase,
  MenuItem,
  Stack,
  TextField,
  Typography,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import SelectItem from "../../Components/Select";
import { SelectOptions } from "./SelectOptions";
import { Api } from "../../../../../constants";
import axios from "axios";
import { reducer, contractItemsIntial } from "./reducer";
import { useNavigate, useParams } from "react-router-dom";
import { objectToFormData } from "../../../../../methods";

import dayjs from "dayjs";
import { DateFormatString } from "../../../../../constants/DateFormat";
import FilePreview from "../../../../../components/FilePreview";
import { useSnackbar } from "notistack";
// import GDicon from "./assets/GDicon.png";
import { IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ContractItemsFilePreview from "../../../../../components/FilePreview/ContractItemsFilePreview/ContractItemsFilePreview";
import { serialize } from "object-to-formdata";
import { AddIcCallOutlined, CloudUpload, Edit } from "@mui/icons-material";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import { useForm } from "react-hook-form";
import { ContractDetailsContext } from "../../ContractDetailsContext";
import { useRef } from "react";
import Loader from "../../../../../components/Loading/Loader";

function GridChildren(props: { children: React.ReactNode }) {
  return <Stack p={1}>{props.children}</Stack>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const ContractItems = (props: PropsType) => {
  const contractDetails = useContext(ContractDetailsContext);
  const [requests, setRequests] = useState<SelectOptions | null>(null);
  console.log(contractDetails);
  console.log(contractDetails.contract);

  const [contractItemsDetails, setContractItemsDetails] = useState(
    contractDetails.contract?.contract_items
  );
  console.log(contractItemsDetails);

  const [ContractItemsData, dispatch] = useReducer(
    reducer,
    contractItemsIntial
  );
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [contract_id, setContractId] = useState<number>();
  const { register, handleSubmit } = useForm<Form>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ErrorObject | undefined>(undefined);
  const { type } = useParams();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };
  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };
  const [itemCount, setItemCount] = useState(1);
  let { id } = useParams<{ id: string }>();
  if (!id) {
    id = props?.Contract_ID?.toString();
  }

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  const handleFileChange = (files: File[]) => {
    if (files && files.length > 0) {
      setSelectedFiles([...selectedFiles, ...files]);
      const newFiles: File[] = Array.from(files);
      setSelectedFiles([...selectedFiles, ...newFiles]);
      dispatch({ type: "ADD_ATTACHMENT", payload: newFiles });
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles: File[] = Array.from(files);
      setSelectedFiles([...selectedFiles, ...newFiles]);
      setUploadProgress([...uploadProgress, ...Array(newFiles.length).fill(0)]);
      handleFileChange(newFiles);
    }
  };

  const addContractItemHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) {
      console.error("Contract ID is undefined");
      return;
    }

    axios
      .post(
        Api("employee/contract/items/store"),
        serialize({ ...ContractItemsData, contract_id: id }, { indices: true })
      )
      .then((res) => {
        enqueueSnackbar("تم حفظ بنود العقد بنجاح");
        // navigate(`../${res.data.data.id}/edit`);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("تعذر في حفظ بنود العقد ", { variant: "error" });
        const current: ErrorObject | undefined = err?.response?.data?.data;
        setErrors(current);
      });
  };

  const handleChangeSubItemName = (e: any, index: number) => {
    const updatedSubItem = {
      ...ContractItemsData.sub_items[index],
      name: e.target.value,
    };
    dispatch({
      type: "ADD_SUB_ITEM",
      payload: { index, subItem: updatedSubItem },
    });
  };

  const handleChangeEngineer = (e: any, index: any) => {
    const updatedSubItem = {
      ...ContractItemsData.sub_items[index],
      employee_id: e.target.value,
    };
    dispatch({
      type: "ADD_SUB_ITEM",
      payload: { index, subItem: updatedSubItem },
    });
  };

  const handleChangeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof SubItem
  ) => {
    const value = e.target.checked ? "1" : "0";
    const updatedSubItem = {
      ...ContractItemsData.sub_items[index],
      [field]: field === "is_attachment" ? (e.target.checked ? 1 : 0) : value,
    };
    if (
      !updatedSubItem.is_progress_bar &&
      !updatedSubItem.is_processing &&
      !updatedSubItem.is_attachment
    ) {
      updatedSubItem.is_progress_bar = "0";
      updatedSubItem.is_processing = "0";
      updatedSubItem.is_attachment = "0";
    }

    dispatch({
      type: "ADD_SUB_ITEM",
      payload: { index, subItem: updatedSubItem },
    });
  };

  const [attachments, setAttachments] = useState<File[]>([]);

  const handleGoogleDriveClick = () => {
    console.log("handleGoogleDriveClick");
  };

  const [contractItem, setContractItem] = useState(null);
  const [editedData, setEditedData] = useState<editedDataType | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(Api(`employee/contract/${id}`))
      .then((res) => {
        console.log("Breakpoint101 edit data:", res.data.data.contract_type);
        setEditedData(res.data.data.contract_items[0]);
        console.log(res.data.data.contract_items[0]);
      })
      .catch((err) => {
        console.log("Error101 :-", err);
        enqueueSnackbar("تعذر الحفظ", { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (props.edit) {
      fetchData();
    }
  }, [props.edit]);

  useEffect(() => {
    console.log(editedData);
    console.log(editedData?.contract_sub_items);
  }, [editedData]);

  return (
    <Box sx={{ position: "relative" }}>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "#80808091",
            zIndex: 1500,
            borderRadius: "6px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </Box>
      )}
      <Box p={1} component="form" onSubmit={addContractItemHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <AddLabelToEl row label="عنوان البند">
                    {loading ? (
                      "   جاري التحميل .."
                    ) : (
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
                        defaultValue={editedData?.name ?? ""}
                        onChange={(e) => {
                          dispatch({
                            type: "UPDATE_NAME",
                            payload: e.target.value,
                          });
                        }}
                      />
                    )}
                  </AddLabelToEl>
                  <AddLabelToEl row label="وصف">
                    {loading ? (
                      "   جاري التحميل .."
                    ) : (
                      <TextField
                        fullWidth
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
                        defaultValue={editedData?.description ?? ""}
                        onChange={(e) => {
                          dispatch({
                            type: "UPDATE_DESCRIPTION",
                            payload: e.target.value,
                          });
                        }}
                      />
                    )}
                  </AddLabelToEl>
                  <AddLabelToEl row label="اختيار مدير المهمة">
                    {loading ? (
                      "   جاري التحميل .."
                    ) : (
                      <TextField
                        id="outlined-select-currency"
                        size="small"
                        select
                        variant="standard"
                        fullWidth
                        placeholder="اختيار مدير المهمة"
                        defaultValue={
                          editedData?.manager_id ?? selectedEmployeeId
                        }
                        onChange={(e) => {
                          const selectedId = e.target.value.toString();
                          setSelectedEmployeeId(selectedId);
                          dispatch({
                            type: "UPDATE_MANAGER_ID",
                            payload: selectedId,
                          });
                        }}
                      >
                        {editedData && Object.keys(editedData).length !== 0 && (
                          <MenuItem
                            key={editedData.manager_id}
                            value={editedData.manager_id}
                          >
                            {
                              contractDetails?.use?.employees?.find(
                                (employee) =>
                                  employee.id === editedData.manager_id
                              )?.name
                            }
                          </MenuItem>
                        )}

                        {contractDetails?.use?.employees?.map((employee) => (
                          <MenuItem key={employee.id} value={employee.id}>
                            {employee.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
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
                      {loading ? (
                        "   جاري التحميل .."
                      ) : (
                        <TextField
                          type="date"
                          fullWidth
                          defaultValue={
                            editedData && Object.keys(editedData).length !== 0
                              ? editedData.start_date.substring(0, 10)
                              : ""
                          }
                          onChange={(e) => {
                            dispatch({
                              type: "UPDATE_START_DATE",
                              payload: e.target.value,
                            });
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={6} style={{ marginRight: 10 }}>
                      <Typography>تاريخ الانتهاء</Typography>

                      {loading ? (
                        "   جاري التحميل .."
                      ) : (
                        <TextField
                          type="date"
                          fullWidth
                          defaultValue={
                            editedData && Object.keys(editedData).length !== 0
                              ? editedData.end_date.substring(0, 10)
                              : ""
                          }
                          onChange={(e) => {
                            dispatch({
                              type: "UPDATE_END_DATE",
                              payload: e.target.value,
                            });
                          }}
                        />
                      )}
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
                      <Box
                        display="flex"
                        alignItems="center"
                        flex={1}
                        style={{ cursor: "pointer" }}
                      >
                        <Box>
                          <Box
                            border="1px dashed #ccc"
                            display="flex"
                            alignItems="center"
                            marginRight="10px"
                            style={{ cursor: "pointer" }}
                            onClick={handleClick}
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
                          {selectedFiles.length > 0 && (
                            <ul>
                              {selectedFiles.map((file, index) => (
                                <li key={index}>
                                  {file.name}
                                  <LinearProgress
                                    variant="determinate"
                                    value={uploadProgress[index]}
                                  />
                                </li>
                              ))}
                            </ul>
                          )}
                          <input
                            type="file"
                            multiple
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleInputChange}
                          />
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
                            {/* <img
                              src={GDicon}
                              alt="Google Drive"
                              style={{ width: 40, height: 40 }}
                            /> */}
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ padding: 10 }}>
                <Grid item xs={12}>
                  {loading
                    ? "جاري التحميل .."
                    : editedData &&
                      Object.keys(editedData).length !== 0 &&
                      editedData.contract_sub_items
                    ? // Render fields based on editedData.contract_sub_items
                      editedData.contract_sub_items.map(
                        (item: any, index: number) => (
                          <React.Fragment key={`${index}_SI`}>
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
                                  // defaultValue={item ? item.name : ""}
                                  defaultValue={item?.name ?? ""}
                                  // editedData?.name ?? ""
                                  //  onChange={(e) => handleChangeSubItemName(e, index)}
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
                                    // value={item ? item.employee_id : ""}
                                    defaultValue={item?.employee_id ?? ""}
                                    // onChange={(e) => handleChangeEngineer(e, index)}
                                  >
                                    {contractDetails?.use?.employees?.map(
                                      (employee) => (
                                        <MenuItem
                                          key={employee.id}
                                          value={employee.id}
                                        >
                                          {employee.name}
                                        </MenuItem>
                                      )
                                    )}
                                  </Select>
                                </FormControl>
                              </Box>
                            </Box>
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
                                          defaultChecked={
                                            item?.is_progress_bar === 1
                                          }
                                          // onChange={(e) => handleChangeCheckbox(e, index, "is_progress_bar")}
                                        />
                                      }
                                      label="النسبة المئوية"
                                    />

                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          defaultChecked={
                                            item?.is_processing === 1
                                          }
                                          // onChange={(e) => handleChangeCheckbox(e, index, "is_processing")}
                                        />
                                      }
                                      label="معاملات"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          defaultChecked={
                                            item?.is_attachment === 1
                                          }
                                          // onChange={(e) => handleChangeCheckbox(e, index, "is_attachment")}
                                        />
                                      }
                                      label="المرفقات"
                                    />
                                  </FormGroup>
                                </Box>
                              </Box>
                            </Box>
                          </React.Fragment>
                        )
                      )
                    : //Render fields based on ContractItemsData.sub_items
                      [...Array(itemCount)].map((_, index) => (
                        <React.Fragment key={index}>
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
                                value={
                                  ContractItemsData.sub_items[index]?.name || ""
                                }
                                onChange={(e) =>
                                  handleChangeSubItemName(e, index)
                                }
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
                                  value={
                                    ContractItemsData.sub_items[index]
                                      ?.employee_id || ""
                                  }
                                  onChange={(e) =>
                                    handleChangeEngineer(e, index)
                                  }
                                >
                                  {contractDetails?.use?.employees?.map(
                                    (employee) => (
                                      <MenuItem
                                        key={employee.id}
                                        value={employee.id}
                                      >
                                        {employee.name}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </Box>
                          </Box>
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
                                        checked={
                                          ContractItemsData.sub_items[index]
                                            ?.is_progress_bar === "1"
                                        }
                                        onChange={(e) =>
                                          handleChangeCheckbox(
                                            e,
                                            index,
                                            "is_progress_bar"
                                          )
                                        }
                                      />
                                    }
                                    label="النسبة المئوية"
                                  />
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={
                                          ContractItemsData.sub_items[index]
                                            ?.is_processing === "1"
                                        }
                                        onChange={(e) =>
                                          handleChangeCheckbox(
                                            e,
                                            index,
                                            "is_processing"
                                          )
                                        }
                                      />
                                    }
                                    label="معاملات"
                                  />
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={
                                          ContractItemsData.sub_items[index]
                                            ?.is_attachment === "1"
                                        }
                                        onChange={(e) =>
                                          handleChangeCheckbox(
                                            e,
                                            index,
                                            "is_attachment"
                                          )
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
    </Box>
  );
};
export default ContractItems;
type PropsType = {
  edit: boolean;
  Contract_ID?: number;
};

export interface Form {
  name: string;
  description: string;
  manager_id: string;
  contract_id: string;
  start_date: string;
  end_date: string;
  sub_items: [];
}

export interface subItems {
  name: string;
  employee_id: string;
  is_progress_bar: boolean;
  is_processing: boolean;
  is_attachment: boolean;
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

type editedDataType = {
  id: number;
  contract_id: number;
  name?: string;
  contract_item_employees: [];
  contract_sub_items: [];
  created_at: string;
  description: string;
  manager_id?: number | string;
  media: [];
  start_date: string;
  end_date: string;
  sub_items: SubItem[];
  attachments: File[];
};
type SubItem = {
  name: string;
  employee_id: string;
  is_progress_bar: "1" | "0";
  is_processing: "1" | "0";
  is_attachment: "0" | "1";
};

type Payload = {
  index: number;
  subItem: SubItem;
};

interface EditedData {
  name: string;
  description: string;
  manager_id: string;
  contract_id: string;
  start_date: string;
  end_date: string;
  contract_sub_items: {
    name: string;
    employee_id: string;
    is_progress_bar: string;
    is_processing: string;
    is_attachment: number;
  }[];
}
