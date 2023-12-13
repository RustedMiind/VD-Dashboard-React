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
import reducer, { VacationsInitial } from "../reducer";
import dayjs from "dayjs";
import { DateFormatString } from "../../../../constants/DateFormat";
import axios from "axios";
import { Api } from "../../../../constants";
import { getDateDiff, getDateDiffNegativeAllowed } from "../../../../methods";
import { EmployeeType } from "../../../../types";

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
      getDateDiffNegativeAllowed(
        new Date(vacationForm.date_to),
        new Date(vacationForm.date_from)
      ) /
        (1000 * 60 * 60 * 24)
    ) || 0;
  const isValidDateRange = numberOfDays > 0;
  const toShow =
    typeof numberOfDays === "number" && numberOfDays > 0
      ? numberOfDays
      : "برجاء ادخال فترة اجازة صحيحة";
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
  const disabledInToDate = (date: dayjs.Dayjs | null) => {
    // Disable dates after the selected date
    if (date) {
      const dateFrom = dayjs(vacationForm.date_from);
      return date.isBefore(dateFrom) || date.isSame(dateFrom);
      // || date.year() !== 2022;
    }
    return false;
  };
  const disabledInFromDate = (date: dayjs.Dayjs | null) => {
    // Disable dates after the selected date
    if (date) {
      const dateTo = dayjs(vacationForm.date_to);
      return date.isAfter(dateTo) || date.isSame(dateTo);
      // || date.year() !== 2022;
    }
    return false;
  };

  const handleChangeForm = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(vacationForm);
    handleSendVacation();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      component={"form"}
      onSubmit={handleChangeForm}
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
              shouldDisableDate={disabledInFromDate}
              slotProps={{
                textField: {
                  size: "small",
                  error: !isValidDateRange && !!vacationForm.date_from,
                },
              }}
              label="التاريخ من"
              sx={{ width: 1 }}
              value={
                vacationForm.date_from ? dayjs(vacationForm.date_from) : null
              }
              onChange={(newValue) =>
                newValue &&
                newValue.format &&
                dispatch({
                  type: "SET_DATE_FROM",
                  payload: newValue?.format(DateFormatString) || "",
                })
              }
            />
          </Grid>

          <Grid item md={6} p={1} px={2}>
            <Typography variant="body1" fontWeight={700} gutterBottom>
              التاريخ الى
            </Typography>
            <DatePicker
              shouldDisableDate={disabledInToDate}
              label="التاريخ الى"
              sx={{ width: 1 }}
              slotProps={{
                textField: {
                  size: "small",
                  error: !isValidDateRange && !!vacationForm.date_to,
                },
              }}
              value={vacationForm.date_to ? dayjs(vacationForm.date_to) : null}
              onChange={(newValue) =>
                newValue &&
                newValue.format &&
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
        type="submit"
        disabled={!isValidDateRange}
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
  employeeRequest?: EmployeeType[] | undefined;
};

export default PopupVacations;
