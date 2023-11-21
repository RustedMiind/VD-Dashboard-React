import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import { DepartmentWithEmployeesType } from "../../../../methods/HandleData/HandleDepartmentWithEmployees";
import { useState } from "react";

function SelectManagerDialog(props: PropsType) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        variant="outlined"
        size="large"
        sx={{ width: 200 }}
      >
        اختر اسم القسم
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>اختر اسم القسم</DialogTitle>
        <DialogContent>
          <Box my={3}>
            <FormControl
              fullWidth
              size={"small"}
              // disabled={props.disabled}
            >
              <InputLabel size="small">القسم</InputLabel>
              <Select
                label={"القسم"}
                size={"small"}
                value={props.deparment_id}
                onChange={(e) => {
                  props.setDepartmentId(e.target.value as number);
                }}
              >
                {props.departments.map((department) => (
                  <MenuItem
                    key={department.departmentId}
                    value={department.departmentId}
                  >
                    {department.departmentName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
/*
(e) => {
  dispatch({
    type: "SET_EMPLOYEE",
    payload: 0,
  });
  dispatch({
    type: "SET_MANAGER",
    payload: e.target.value as number,
  });
}
*/

type PropsType = {
  deparment_id: number;
  setDepartmentId: (value: number) => void;
  departments: DepartmentWithEmployeesType[];
};

export default SelectManagerDialog;
