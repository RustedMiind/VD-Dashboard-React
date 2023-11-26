import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { EmployeeRequest, EmployeeType } from "../../../../types";
import { ProceduresModelTypeCode } from "../types/ProceduresModel";
import { modelNamesIds } from "../ModelTypes";
import { useEffect, useReducer, useState } from "react";
import { ModelFormInitial, reducer } from "./reducer";
import { ModelStatusType } from "./ModelFormType";
import axios from "axios";
import { Api } from "../../../../constants";

function ModelDialog(props: PropsType) {
  const model =
    modelNamesIds.find((x) => props.modelType === x.id) || modelNamesIds[0];
  const [employees, setEmployees] = useState<EmployeeType[] | undefined>(
    undefined
  );
  const [formData, dispatch] = useReducer(reducer, ModelFormInitial);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
    show: boolean;
  }>({
    type: "success",
    message: "تم الحفظ بنجاح",
    show: false,
  });

  useEffect(() => {
    dispatch({ type: "SET_RESET", payload: null });
  }, [props.open]);

  useEffect(() => {
    axios
      .post<{ data: EmployeeType[] }>(Api("employee/employees"))
      .then(({ data }) => {
        setEmployees(data.data);
      });
  }, []);
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        component={"form"}
        onSubmit={handleSubmit}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{model.name}</DialogTitle>
        <DialogContent>
          <Stack direction={"row"} pt={2}>
            <Stack width={0.5} direction="row" alignItems="center" gap={1}>
              <Typography variant="body1" component="label" htmlFor="status">
                حالة الطلب
              </Typography>
              <FormControl sx={{ width: 200 }} size="small">
                <InputLabel id="demo-simple-select-label" size="small">
                  حالة الطلب
                </InputLabel>
                <Select
                  size="small"
                  value={formData.status}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_STATUS",
                      payload: e.target.value as ModelStatusType,
                    });
                  }}
                  label="حالة  الطلب"
                  // onChange={handleChange}
                >
                  <MenuItem value={0}>مرفوض</MenuItem>
                  <MenuItem value={1}>مقبول</MenuItem>
                  <MenuItem value={2}>معتمد</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            {model.id === 2 && (
              <Stack width={0.5} direction="row" alignItems="center" gap={1}>
                <Typography variant="body1" component="label" htmlFor="status">
                  اختر الموظف البديل
                </Typography>
                <FormControl sx={{ width: 200 }} size="small">
                  <InputLabel id="demo-simple-select-label" size="small">
                    الموظف البديل
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.employee_id}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_EMPLOYEE_ID",
                        payload: e.target.value as number,
                      });
                    }}
                    // value={age}
                    label="الموظف البديل"
                    // onChange={handleChange}
                  >
                    {employees?.map((emp) => (
                      <MenuItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            )}
          </Stack>
          <Stack mt={2}>
            <Typography
              variant="body1"
              component="label"
              display="block"
              gutterBottom
              mb={1}
            >
              الملاحظة
            </Typography>
            <TextField
              id=""
              value={formData.note}
              onChange={(e) => {
                dispatch({ type: "SET_NOTE", payload: e.target.value });
              }}
              inputProps={{ style: { minHeight: 100 } }}
              label="الملاحظة"
              multiline
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" type="button" onClick={props.onClose}>
            الغاء
          </Button>
          <Button variant="contained" type="submit" autoFocus>
            ارسال
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={status.show}
        autoHideDuration={6000}
        onClose={() => {
          setStatus({ ...status, show: false });
        }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert severity={status.type} sx={{ width: 1 }}>
          {status.message}
        </Alert>
      </Snackbar>
    </>
  );

  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    console.log(formData);
    axios
      .post(
        Api(`employee/general-requests/approve_steps/${props.request?.id}`),
        formData
      )
      .then((res) => {
        console.log("Dialog Response: ", res);
        setStatus({
          ...status,
          show: true,
          message: "تم اتخاذ الاجراء بنجاح",
        });
        props.resetTable();
        props.onClose();
      })
      .catch((err) => {
        setStatus({
          ...status,
          show: true,
          message: err.response.data.message || "",
        });
      });
  }
}

type PropsType = {
  open: boolean;
  request: EmployeeRequest | null;
  onClose: () => void;
  onSubmit: () => void;
  modelType: ProceduresModelTypeCode;
  resetTable: () => void;
};

export default ModelDialog;
