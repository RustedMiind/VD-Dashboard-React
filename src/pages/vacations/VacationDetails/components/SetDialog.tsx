import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useReducer } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { EmployeeExcType } from "../types";
import reducer, { VacationsInitial } from "../reducer";
import dayjs from "dayjs";
import { DateFormatString } from "../../../../constants/DateFormat";
import axios from "axios";
import { Api } from "../../../../constants";
import { getDateDiff } from "../../../../methods";

const PopupVacations = ({
  open,
  handleClose,
  title,
  employeeRequest,
  vacationRequest,
}: PropsType) => {
  const [vacationForm, dispatch] = useReducer(reducer, VacationsInitial);
  console.log(vacationForm);
  const numberOfDays =
    Math.round(
      getDateDiff(
        new Date(vacationForm.date_from),
        new Date(vacationForm.date_to)
      ) /
        (1000 * 60 * 60 * 24)
    ) || 0;
  const toShow =
    typeof numberOfDays === "number"
      ? numberOfDays
      : "برجاء ادخال تواريخ صحيحة";
  const handleSendVacation = () => {
    if (vacationRequest === "post") {
      axios
        .post(Api("employee/client/vacations/store"), vacationForm)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (vacationRequest === "put") {
      axios
        .put(Api("employee/client/vacations/update"), vacationForm)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChangeForm = () => {
    console.log(vacationForm);
    handleSendVacation();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      component={"form"}
      maxWidth="md"
      fullWidth
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          borderRadius: "10px",
          border: "1px solid",
          p: 0.5,
          position: "absolute",
          top: 8,
          right: 8,
        }}
        size="large"
        color="primary"
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item md={6} p={1} px={2}>
            <Typography variant="body1" fontWeight={700} gutterBottom>
              اسم الاجازة
            </Typography>
            <TextField
              size="small"
              sx={{ width: 1 }}
              value={vacationForm.vacation_name}
              onChange={(e) =>
                dispatch({ type: "SET_VACATION_NAME", payload: e.target.value })
              }
            />
          </Grid>

          <Grid item md={6} p={1} px={2}>
            <Typography
              variant="body1"
              color={"text.disabled"}
              fontWeight={700}
              gutterBottom
            >
              عدد الايام
            </Typography>
            <TextField
              size="small"
              sx={{ width: 1 }}
              value={toShow}
              disabled
              onChange={(e) =>
                dispatch({
                  type: "SET_NUMBER_DAYS",
                  payload: Number(e.target.value),
                })
              }
            />
          </Grid>

          <Grid item md={6} p={1} px={2}>
            <Typography variant="body1" fontWeight={700} gutterBottom>
              التاريخ من
            </Typography>
            <DatePicker
              slotProps={{ textField: { size: "small" } }}
              label="التاريخ من"
              sx={{ width: 1 }}
              value={dayjs(vacationForm.date_from)}
              onChange={(newValue) =>
                dispatch({
                  type: "SET_DATE_FROM",
                  payload: newValue?.format(DateFormatString) || "",
                })
              }
              disableFuture
            />
          </Grid>

          <Grid item md={6} p={1} px={2}>
            <Typography variant="body1" fontWeight={700} gutterBottom>
              التاريخ الى
            </Typography>
            <DatePicker
              label="التاريخ الى"
              sx={{ width: 1 }}
              slotProps={{ textField: { size: "small" } }}
              value={dayjs(vacationForm.date_to)}
              onChange={(newValue) =>
                dispatch({
                  type: "SET_DATE_TO",
                  payload: newValue?.format(DateFormatString) || "",
                })
              }
            />
          </Grid>

          <Grid item md={12} p={1} px={2}>
            name
            <Typography variant="body1" fontWeight={700} gutterBottom>
              اضافة موظفين لا تنطبق عليهم*
            </Typography>
            <Select
              fullWidth
              variant="outlined"
              size="small"
              multiple
              multiline
              value={vacationForm.exception_employees}
              onChange={(e) => {
                const values = e.target.value;
                Array.isArray(values) &&
                  dispatch({ type: "SET_EMPLOYEES", payload: values });
              }}
              renderValue={(selected) => {
                const selectedNames = vacationForm.exception_employees.map(
                  (id) => {
                    const selectedOption = employeeRequest?.find(
                      (employee) => employee.id === id
                    );
                    return selectedOption;
                  }
                );
                return selectedNames.map((chip) => (
                  <Chip
                    key={chip?.id}
                    size="small"
                    label={chip?.name}
                    sx={{ ml: 1 }}
                  />
                ));
              }}
            >
              {employeeRequest?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </DialogContent>
      <Button
        variant="contained"
        onClick={handleChangeForm}
        sx={{
          mb: 4,
          width: "fit-content",
          alignSelf: "center",
          px: 5,
          py: 1,
        }}
      >
        حفظ
      </Button>
    </Dialog>
  );
};

type PropsType = {
  vacationRequest: "post" | "put" | "null";
  open: boolean;
  handleClose?: () => void;
  title: string;
  employeeRequest?: EmployeeExcType[] | undefined;
};

export default PopupVacations;
