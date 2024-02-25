import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  DialogActions,
  GridProps,
  TextField,
  TextFieldProps,
  Button,
  DialogProps,
  Select,
} from "@mui/material";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { SetStateAction, useEffect, useState } from "react";
import SelectCustom from "../../../../components/MuiCustom";
import { Envoy } from "../../../../types/Envoys/Envoy";
import { EmployeeType } from "../../../../types";
import { MenuItem } from "@mui/material";
import { WorkOrderType } from "../../../../types/electricity/WorkOrderType";
import axios from "axios";
import { Api } from "../../../../constants";
type TaskType = {
  work_instruction_procedure_id: number;
  representative_id: number;
  employee_id: number;
  title: string;
  description: string;
  status: string;
  updated_at: string;
  created_at: string;
  id: number;
};

// TODO::define helper variable
const textFieldProps: TextFieldProps = {
  size: "small",
  fullWidth: true,
};
type Form = {
  title: string | undefined;
  reference_number: number | undefined;
  status: string | undefined;
  representative_id: string | undefined;
  employee: number;
  description: string | undefined;
  phone: string | undefined;
  work_instruction_procedure_id: number | undefined;
};
const Headers: {
  id: string;
  text: string;
  cols: number;
  name:
    | "title"
    | "reference_number"
    | "status"
    | "representative_id"
    | "employee"
    | "description"
    | "phone";
  select?: boolean;
}[] = [
  { id: "f2", text: "رقم أمر العمل", name: "reference_number", cols: 6 },
  { id: "f3", text: "الحالة", name: "status", cols: 6, select: true },
  {
    id: "f4",
    text: "المندوب",
    name: "representative_id",
    cols: 6,
    select: true,
  },
  { id: "f5", text: "جوال المندوب", name: "phone", cols: 6 },
  { id: "f6", text: "الموظف", name: "employee", cols: 6, select: true },
  { id: "f1", text: "أسم المهمة", name: "title", cols: 6 },
  { id: "f7", text: "المهمة", name: "description", cols: 12 },
];

function CreateAndUpdateDialog({
  dialogProps,
  envoys,
  employees,
  workType,
  activeProcedureId,
  setTasks,
  handleClose,
  dialogAction,
  selectedItem,
  openDialog,
}: PropsType) {
  // TODO::declare our state variables
  const { register, reset, setValue, handleSubmit, control } = useForm<Form>(
    {}
  );
  const { enqueueSnackbar } = useSnackbar();
  const [phone, setPhone] = useState<string | undefined>("");

  useEffect(() => {
    console.log(dialogAction);
    if (dialogAction === "CREATE") {
      reset({
        title: "",
        description: "",
      });
    } else {
      let _phone =  envoys.filter(
        (ele) => ele.id == selectedItem.representative_id
      )[0].phone;
      console.log("Show in Dialog:", selectedItem,_phone);
      reset({
        title: selectedItem.title,
        description: selectedItem.description,
        employee: selectedItem.employee_id,
        representative_id: selectedItem.representative_id
          ? selectedItem.representative_id.toString()
          : undefined,
        phone: _phone,
      });
    }
  }, [openDialog, dialogAction]);
  //TODO::submit form functions
  const submit = handleSubmit((data) => {
    let body = {
      representative_id: data.representative_id,
      employee_id: data.employee,
      title: data.title,
      description: data.description,
      status: data.status,
      work_instruction_procedure_id: activeProcedureId,
    };

    try {
      console.log("Body", body, selectedItem.id);

      (dialogAction === "UPDATE"
        ? axios.put<{ task: TaskType }>(
            Api(`employee/work-instruction/task/update/${selectedItem.id}`),
            body
          )
        : axios.post<{ task: TaskType }>(
            Api(`employee/work-instruction/task`),
            body
          )
      )
        .then((response) => {
          if (dialogAction !== "UPDATE")
            setTasks((prev) => [...prev, response.data.task]);
          else
            setTasks((prev) =>
              prev.map((ele) => {
                if (ele.id === selectedItem.id) return response.data.task;
                return ele;
              })
            );
          console.log("response of request:", response);
          enqueueSnackbar("تم أضافة المهمة بنجاح");
          handleClose();
          setPhone("");
          reset({
            title: "",
            description: "",
          });
        })
        .catch((error) => {
          console.log("Error in save", error);
          enqueueSnackbar("تعذر الحفظ");
        });
    } catch (err) {
      console.log("error in save or edit :", err);
    }
  });

  //TODO::Declare helpers variables
  const FieldGrid = ({
    text,
    name,
    cols,
    select,
  }: {
    text: string;
    name:
      | "title"
      | "reference_number"
      | "status"
      | "representative_id"
      | "employee"
      | "description"
      | "phone";
    cols: number;
    select?: boolean;
  }) => {
    let options =
      name == "representative_id"
        ? envoys.map((p) => ({ value: +p.id, name: p.name, phone: p.phone }))
        : name == "employee"
        ? employees.map((p) => ({
            value: p ? p.id : 0,
            name: p.name,
            phone: p.phone,
          }))
        : [
            { id: 1, value: "1", name: "نشط", phone: "" },
            { id: 2, value: "0", name: "غير نشط", phone: "" },
          ];

    if (select && select == true)
      return (
        <Grid item xs={cols} paddingX={1.5}>
          <AddLabelToEl label={text} required>
            <Select
              required
              {...register(name)}
              color="primary"
              defaultValue={
                dialogAction === "CREATE"
                  ? ""
                  : name == "employee"
                  ? selectedItem.employee_id
                  : name == "status"
                  ? selectedItem.status
                  : selectedItem.representative_id
              }
              size={"small"}
              disabled={dialogAction === "SHOW"}
              onChange={(e) => {
                console.log(e.target.value);
                if (name === "representative_id") {
                  let _phone = envoys.filter(
                    (ele) => ele.id == e.target.value
                  )[0].phone;
                  console.log("target phone:", _phone);
                  setValue("phone", _phone);
                }
              }}
            >
              {options &&
                options.map((option) => (
                  <MenuItem
                    key={`${text}_${option.value}`}
                    value={option.value}
                  >
                    {option.name}
                  </MenuItem>
                ))}
            </Select>
          </AddLabelToEl>
        </Grid>
      );

    if (name === "description")
      return (
        <Grid
          item
          xs={12}
          md={6}
          sx={{ padding: "0 0.3rem", marginY: "0.3rem" }}
        >
          <AddLabelToEl label="وصف المهمة" required>
            <textarea
              required
              rows={5}
              {...register("description")}
              style={{
                width: "100%",
                border: "1px solid lightgray",
                borderRadius: "12px",
                outline: "none",
                padding: "0.4rem",
                backgroundColor: "inherit",
                color: "inherit",
                fontSize: "1rem",
              }}
              readOnly={dialogAction === "SHOW"}
            ></textarea>
          </AddLabelToEl>
        </Grid>
      );

    return (
      <Grid item xs={cols} paddingX={1.5}>
        <AddLabelToEl label={text} required>
          {name == "phone" ? (
            <TextField
              required
              {...textFieldProps}
              {...register(name)}
              placeholder={text}
              disabled={true}
            />
          ) : name === "reference_number" ? (
            <TextField
              {...textFieldProps}
              {...register(name)}
              value={workType?.reference_number}
              disabled={true}
              placeholder={text}
            />
          ) : (
            <TextField
              required
              {...textFieldProps}
              {...register(name)}
              placeholder={text}
              disabled={dialogAction === "SHOW"}
            />
          )}
        </AddLabelToEl>
      </Grid>
    );
  };

  return (
    <Dialog {...dialogProps} component={"form"} onSubmit={submit}>
      <DialogTitle sx={{ textAlign: "center" }} fontWeight={800}>
        المهام
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText color={"error.main"}>{error}</DialogContentText> */}
        <Grid container>
          {Headers.map((header) => {
            return (
              <FieldGrid
                key={header.id}
                text={header.text}
                name={header.name}
                cols={header.cols}
                select={header?.select}
              />
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {dialogAction !== "SHOW" && (
          <LoadingButton
            style={{ width: "45%" }}
            variant="contained"
            type="submit"
          >
            حفظ
          </LoadingButton>
        )}
        {dialogAction === "SHOW" && (
          <LoadingButton
            style={{ width: "45%" }}
            variant="contained"
            type="button"
            onClick={() => handleClose()}
          >
            رجوع
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  openDialog: boolean;
  dialogProps: DialogProps;
  dialogAction: "CREATE" | "UPDATE" | "SHOW";
  envoys: Envoy[];
  employees: Partial<EmployeeType>[];
  workType: WorkOrderType | undefined;
  activeProcedureId: number | undefined;
  setTasks: React.Dispatch<SetStateAction<TaskType[]>>;
  handleClose: () => void;
  selectedItem: Partial<TaskType>;
};

export default CreateAndUpdateDialog;
