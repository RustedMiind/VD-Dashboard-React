import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useReducer, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { EmployeeExcType } from "../types";
import reducer, { VacationsInitial } from "../reducer";
import dayjs from "dayjs";
import { DateFormatString } from "../../../../constants/DateFormat";
import axios from "axios";
import { Api } from "../../../../constants";

const PopupVacations = ({
  open,
  handleClose,
  title,
  employeeRequest,
  vacationRequest,
}: PropsType) => {
  const [personName, setPersonName] = useState<string[]>([]);
  const [vacation, dispatch] = useReducer(reducer, VacationsInitial);

  const handleSendVacation = () => {
    if (vacationRequest === "post") {
      axios
        .post(Api("employee/client/vacations/store"), vacation)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (vacationRequest === "put") {
      axios
        .put(Api("employee/client/vacations/update"), vacation)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChangeForm = () => {
    console.log(vacation);
    handleSendVacation();
  };

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
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
              value={vacation.vacation_name}
              onChange={(e) =>
                dispatch({ type: "SET_VACATION_NAME", payload: e.target.value })
              }
            />
          </Grid>

          <Grid item md={6} p={1} px={2}>
            <Typography variant="body1" fontWeight={700} gutterBottom>
              عدد الايام
            </Typography>
            <TextField
              size="small"
              sx={{ width: 1 }}
              value={vacation.number_days}
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
              value={dayjs(vacation.date_from)}
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
              value={dayjs(vacation.date_to)}
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
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-checkbox-label">
                الموظفين
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={(e) => {
                  handleChange(e);
                  console.log(e.target.value);
                  dispatch({
                    type: "SET_EMPLOYEES",
                    payload: e.target.value as [],
                  });
                }}
                input={<OutlinedInput label="" />}
                renderValue={(selected) => {
                  return selected
                    .map(
                      (selectedId) =>
                        employeeRequest?.find(
                          // eslint-disable-next-line eqeqeq
                          (employee) => employee.id.toString() == selectedId
                        )?.name
                    )
                    .join(", ");
                }}
                MenuProps={MenuProps}
              >
                {employeeRequest?.map(({ name, id }) => (
                  <MenuItem key={id} value={id}>
                    <Checkbox
                      checked={personName.indexOf(id.toString()) > -1}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type PropsType = {
  vacationRequest: "post" | "put" | "null";
  open: boolean;
  handleClose?: () => void;
  title: string;
  employeeRequest?: EmployeeExcType[] | undefined;
};

export default PopupVacations;
