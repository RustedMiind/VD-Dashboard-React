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
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { EmployeeExcType } from "../types";

const PopupVacations = ({
  open,
  handleClose,
  title,
  employeeRequest,
}: PropsType) => {
  const [personName, setPersonName] = useState<string[]>([]);
  console.log(employeeRequest);

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
            <TextField size="small" sx={{ width: 1 }} />
          </Grid>

          <Grid item md={6} p={1} px={2}>
            <Typography variant="body1" fontWeight={700} gutterBottom>
              عدد الايام
            </Typography>
            <TextField size="small" sx={{ width: 1 }} />
          </Grid>

          <Grid item md={6} p={1} px={2}>
            <Typography variant="body1" fontWeight={700} gutterBottom>
              التاريخ من
            </Typography>
            <DatePicker
              slotProps={{ textField: { size: "small" } }}
              label="التاريخ من"
              sx={{ width: 1 }}
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
            />
          </Grid>

          <Grid item md={12} p={1} px={2}>
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
                onChange={handleChange}
                input={<OutlinedInput label="" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {employeeRequest?.map(({ name, id }) => (
                  <MenuItem key={id} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

type PropsType = {
  open: boolean;
  handleClose?: () => void;
  title: string;
  employeeRequest?: EmployeeExcType[] | undefined;
};

export default PopupVacations;
