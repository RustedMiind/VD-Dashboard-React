import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { useEffect, useState } from "react";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import { useForm } from "react-hook-form";
import axios from "axios";
import { WorkOrderType } from "../../../../types/electricity/WorkOrderType";
import { Api } from "../../../../constants";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UploadFileInput from "../../../../components/UploadFileInput";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import MapDialog from "./Dialog";
import "./index.scss";
import { Contractor } from "../../../../types/Contractors/Contractor";

//TODO::define form fields
type FormFields = {
  reference_number: number;
  type_work_instruction_id: number;
  costable_id: number;
  expected_cost: string;
  real_cost: string;
  latitude: number;
  longitude: number;
  contractor_id: number;
  period: number;
  status: string;
  start_date: string;
};

type MangementType = {
  id: number;
  name: string;
  type: string;
  branch_id: number;
  manager_id: number;
  parent_id: number;
  note: string;
  active: 1;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  directChildren: number;
  childrens: [];
};

type registerFieldType =
  | "reference_number"
  | "type_work_instruction_id"
  | "costable_id"
  | "expected_cost"
  | "real_cost"
  | "latitude"
  | "longitude"
  | "contractor_id"
  | "period"
  | "status"
  | "start_date";

type headerType = {
  id: string;
  cols: number;
  select: boolean;
  label: string;
  name: registerFieldType;
};

// TODO::define form headers
const headers: headerType[] = [
  {
    id: "WTHID_1",
    cols: 6,
    select: false,
    label: "الرقم المرجعي",
    name: "reference_number",
  },
  {
    id: "WTHID_3",
    cols: 6,
    select: true,
    label: "مركز التكلفة",
    name: "costable_id",
  },
  {
    id: "WTHID_2",
    cols: 6,
    select: true,
    label: "نوع امر العمل",
    name: "type_work_instruction_id",
  },
  {
    id: "WTHID_4",
    cols: 6,
    select: false,
    label: "التكلفة التقديرية",
    name: "expected_cost",
  },
  {
    id: "WTHID_5",
    cols: 6,
    select: false,
    label: "التكلفة الفعلية",
    name: "real_cost",
  },
  {
    id: "WTHID_6",
    cols: 6,
    select: false,
    label: "احداثيات",
    name: "latitude",
  },
  {
    id: "WTHID_7",
    cols: 6,
    select: false,
    label: "احداثيات",
    name: "longitude",
  },
  {
    id: "WTHID_8",
    cols: 6,
    select: true,
    label: "المقاول",
    name: "contractor_id",
  },
  { id: "WTHID_9", cols: 6, select: false, label: "المدة", name: "period" },
  {
    id: "WTHID_10",
    cols: 6,
    select: true,
    label: "حالة أمر العمل",
    name: "status",
  },
  {
    id: "WTHID_11",
    cols: 6,
    select: false,
    label: "تاريخ الاستناد",
    name: "start_date",
  },
];

const CreateOrUpdateWorkOrder = ({ show }: { show?: boolean }) => {
  // Declare
  const [procedures, setProcedures] = useState<{ name: string }[]>([
    { name: "" },
  ]);
  const { register, reset, handleSubmit, setValue } = useForm<FormFields>({
    defaultValues: {},
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isEdit, setIsEdit] = useState(false);
  let { id } = useParams();
  let itemToEdit = useLocation().state;
  const navigator = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [position, setPosition] = useState<[number, number]>([
    21.42251, 39.826168,
  ]);
  const [Contractors, setContractors] = useState<Contractor[]>([]);
  const [managements, setManagements] = useState<MangementType[]>([]);
  const [workOrderTypes, setWorkOrderTypes] = useState<WorkOrderType[]>([]);

  // TODO::handle which approach we will take (edit/add)
  useEffect(() => {
    setValue("latitude", position[0]);
    setValue("longitude", position[1]);
  }, [position]);

  // TODO::handle which approach we will take (edit/add)
  useEffect(() => {
    if (id && !itemToEdit) {
      console.log("SHould out");
      setIsEdit(false);
      enqueueSnackbar("لا يوجد بيانات لامر عمل", { variant: "error" });
    } else if (id) {
      setIsEdit(true);
      setLoading(true);
      // TODO::get work order type data
      console.log("we will edit:", itemToEdit, id);
      reset({
        reference_number: itemToEdit.reference_number,
        type_work_instruction_id: itemToEdit.type_work_instruction_id,
        costable_id: itemToEdit.costable_id,
        expected_cost: itemToEdit.expected_cost,
        real_cost: itemToEdit.real_cost,
        latitude: itemToEdit.latitude,
        longitude: itemToEdit.longitude,
        contractor_id: itemToEdit.contractor_id,
        period: itemToEdit.period,
        status: itemToEdit.status,
        start_date: itemToEdit.start_date,
      });
      console.log("Demo :-", itemToEdit);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    axios
      .get<{ contractors: Contractor[] }>(Api(`employee/contractor`))
      .then(({ data }) => {
        console.log("Data:", data);
        setContractors(data.contractors);
      })
      .catch((err) => {
        console.log("Error in fetch contractors:", err);
      });

    axios
      .get<{ managements: MangementType[] }>(Api(`employee/all-managements`))
      .then(({ data }) => {
        console.log("Data:", data);
        setManagements(data.managements);
      })
      .catch((err) => {
        console.log("Error in fetch managements:", err);
      });

    axios
      .get<{ work_type_instructions: WorkOrderType[] }>(
        Api(`employee/type-work-instruction`)
      )
      .then(({ data }) => {
        console.log("Response data:-", data);
        setWorkOrderTypes(data.work_type_instructions);
      })
      .catch((err) => {
        console.log("Error in fetch work_tupe_instructions:", err);
      });
  }, []);

  //TODO::declare helper variables (subcomponents)
  const ControlInputField = ({
    label,
    name,
    wmd,
    select,
  }: {
    label: string;
    name: registerFieldType;
    wmd?: number;
    select?: boolean;
  }) => {
    let options =
      name == "contractor_id"
        ? Contractors.map((ele) => ({
            id: ele.id,
            value: ele.id,
            name: ele.name,
            phone: "",
          }))
        : name == "type_work_instruction_id"
        ? workOrderTypes.map((ele) => ({
            id: ele.id,
            value: ele.id,
            name: ele.name,
            phone: "",
          }))
        : name == "costable_id"
        ? managements.map((ele) => ({
            id: ele.id,
            value: ele.id,
            name: ele.name,
            phone: "",
          }))
        : [
            { id: 1, value: "1", name: "نشط", phone: "" },
            { id: 2, value: "0", name: "غير نشط", phone: "" },
          ];

    //* select field
    if (select && select == true)
      return (
        <Grid item xs={12} md={wmd ?? 6} paddingX={1.5}>
          <AddLabelToEl label={label} required>
            <Select
              required
              {...register(name)}
              defaultValue={
                !isEdit
                  ? ""
                  : name == "contractor_id"
                  ? itemToEdit.contractor_id
                  : name == "costable_id"
                  ? itemToEdit.costable_id
                  : name == "type_work_instruction_id"
                  ? itemToEdit.type_work_instruction_id
                  : itemToEdit.status
              }
              color="primary"
              disabled={show === true}
              size={"small"}
            >
              {options &&
                options.map((option) => (
                  <MenuItem
                    key={`${label}_${option.value}`}
                    value={option.value}
                  >
                    {option.name}
                  </MenuItem>
                ))}
            </Select>
          </AddLabelToEl>
        </Grid>
      );

    //* normal text field
    return (
      <Grid
        item
        xs={12}
        md={wmd ?? 6}
        sx={{ padding: "0 0.3rem", marginY: "0.3rem" }}
      >
        <AddLabelToEl label={label} required>
          <TextField
            type="text"
            required
            size="small"
            disabled={loading || show === true}
            {...register(name)}
            placeholder={label}
          />
        </AddLabelToEl>
      </Grid>
    );
  };

  function formatDate(date: string): string {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const SubHeader = ({ text }: { text: string }) => {
    return (
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "space-between",
          padding: "0.5rem",
          alignItems: "center",
          borderRadius: "12px",
          marginY: "1rem",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {text}
        </Typography>
        <IndeterminateCheckBoxOutlinedIcon fontWeight={700} />
      </Box>
    );
  };

  //TODO::our functions
  const handleFormSubmit = handleSubmit((formData) => {
    setLoading(true);

    if (formData.start_date)
      formData = {
        ...formData,
        start_date: formatDate(formData.start_date),
      };

    console.log("formData ", formData);
    (isEdit
      ? axios.put<{ work_type_instruction: WorkOrderType }>(
          Api(`employee/work-instruction/update/${itemToEdit.id}`),
          formData
        )
      : axios.post<{ work_type_instruction: WorkOrderType }>(
          Api("employee/work-instruction"),
          formData
        )
    )
      .then((res) => {
        console.log("response101", res);
        if (!isEdit) {
          reset({});
          setProcedures([{ name: "" }]);
        }
        if (isEdit) enqueueSnackbar("تم التعديل امر العمل بنجاح");
        else enqueueSnackbar("تم أضافة امر العمل بنجاح");
        reset({});
        navigator("/react/electricity/workOrders");
      })
      .catch((err) => {
        console.log("Error101 :-", err);
        enqueueSnackbar("تعذر الحفظ", { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <Box id="addPageStyle">
      <MapDialog
        dialogProps={{
          onClose: () => setOpenDialog(false),
          open: openDialog === true,
        }}
        handleClose={() => setOpenDialog(false)}
        position={position}
        setPosition={setPosition}
      />
      <Box component="form" onSubmit={handleFormSubmit}>
        <Typography variant="h4">أضافة أمر عمل</Typography>
        <SubHeader text="بيانات أمر العمل" />
        <Grid
          container
          sx={{
            bgcolor: "background.paper",
            padding: "0.5rem",
            borderRadius: "12px",
          }}
        >
          {/* set form headers */}
          <ControlInputField
            wmd={headers[0].cols}
            select={headers[0].select}
            label={headers[0].label}
            name={headers[0].name}
          />
          <ControlInputField
            wmd={headers[1].cols}
            select={headers[1].select}
            label={headers[1].label}
            name={headers[1].name}
          />
          <ControlInputField
            wmd={headers[2].cols}
            select={headers[2].select}
            label={headers[2].label}
            name={headers[2].name}
          />
          <ControlInputField
            wmd={headers[3].cols}
            select={headers[3].select}
            label={headers[3].label}
            name={headers[3].name}
          />
          <Grid container xs={12}>
            <Grid xs={12} md={6}>
              <ControlInputField
                wmd={12}
                select={headers[4].select}
                label={headers[4].label}
                name={headers[4].name}
              />
              <ControlInputField
                wmd={12}
                select={headers[7].select}
                label={headers[7].label}
                name={headers[7].name}
              />
            </Grid>
            <Grid xs={12} md={6} sx={{ marginY: "0.3rem" }}>
              {/* coordinates */}
              <AddLabelToEl label={"الأحداثيات"} required>
                <Grid xs={12} container>
                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      required
                      size="small"
                      disabled={loading || show === true}
                      {...register(headers[5].name)}
                      placeholder={"خط الطول"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      required
                      size="small"
                      disabled={loading || show === true}
                      {...register(headers[6].name)}
                      placeholder={"دائرة العرض"}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "start",
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="primary"
                      sx={{ paddingX: "0.2rem" }}
                    >
                      تحديد الموقع من الخريطة
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "background.med",
                        margin: "0.4rem 0.2rem",
                        width: "100%",
                        borderRadius: "11px",
                        padding: "0 10px",
                        cursor: "pointer",
                        height: "2.5rem",
                      }}
                      onClick={() => {
                        setOpenDialog(true);
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontSize={17}
                        fontWeight={800}
                      >
                        فتح الخريطة
                      </Typography>
                      <KeyboardArrowLeftOutlinedIcon />
                    </Box>
                  </Box>
                </Grid>
              </AddLabelToEl>
            </Grid>
          </Grid>
          <ControlInputField
            wmd={headers[8].cols}
            select={headers[8].select}
            label={headers[8].label}
            name={headers[8].name}
          />
          <ControlInputField
            wmd={headers[9].cols}
            select={headers[9].select}
            label={headers[9].label}
            name={headers[9].name}
          />
          {/* <Grid p={1} item xs={12} md={6}>
            <Typography>ارفاق ملف</Typography>

            <UploadFileInput
              size="sm"
              value={file}
              subTitle=""
              setValue={(file) => {
                console.log("File :", file);
                setFile(file);
              }}
            />
          </Grid> */}
          <Grid item xs={12} md={6} sx={{ marginTop: "0.1rem" }}>
            <AddLabelToEl label={headers[10].label} required>
              <DatePicker
                sx={{ width: "98%" }}
                slotProps={{ textField: { size: "small" } }}
                defaultValue={
                  isEdit ? dayjs(itemToEdit.start_date) : dayjs(new Date())
                }
                disabled={show === true}
                // {...register('start_date')}
                onChange={(newValue) => {
                  console.log("Data ", newValue);
                  setValue("start_date", dayjs(newValue).toString());
                }}
              />
            </AddLabelToEl>
          </Grid>
        </Grid>

        {show !== true && (
          <Button
            variant="contained"
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginY: "2rem",
            }}
            type={"submit"}
          >
            حفظ
          </Button>
        )}
        {show === true && (
          <Button
            variant="contained"
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginY: "2rem",
            }}
            type={"button"}
            onClick={() => navigator("/react/electricity/workOrders")}
          >
            رجوع
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CreateOrUpdateWorkOrder;
