import {
  Box,
  InputAdornment,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TextField,
} from "@mui/material";
import SelectCustom from "../../../../components/MuiCustom";
import { ActionTypes } from "./reducer";
import { ProceduresModelTypeCode, Step } from "../types";
import { DepartmentWithEmployeesType } from "../../../../methods/HandleData/HandleDepartmentWithEmployees";
import { modelNamesIds } from "../ModelTypes";

function TableComponent({
  level,
  formDisabled,
  dispatch,
  departments,
}: PropsType) {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>مدير القسم الوظيفي</TableCell>
            <TableCell>الموظف</TableCell>
            <TableCell>موافقة</TableCell>
            <TableCell>اعتماد</TableCell>
            <TableCell>مدة التجاوز</TableCell>
            <TableCell>النموذج</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Box width={{ lg: 150, xl: 200 }}>
                <FormControl
                  fullWidth
                  size={"small"}
                  // disabled={props.disabled}
                >
                  <InputLabel size="small">القسم</InputLabel>
                  <Select
                    label={"القسم"}
                    size={"small"}
                    value={level.department_id}
                    disabled={formDisabled}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_EMPLOYEE",
                        payload: 0,
                      });
                      dispatch({
                        type: "SET_MANAGER",
                        payload: e.target.value as number,
                      });
                    }}
                  >
                    {departments.map((department) => (
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
            </TableCell>
            <TableCell>
              <Box width={{ lg: 150, xl: 200 }}>
                <FormControl
                  fullWidth
                  size={"small"}
                  // disabled={props.disabled}
                >
                  <InputLabel size="small">الموظف</InputLabel>
                  <Select
                    label={"الموظف"}
                    size={"small"}
                    value={level.employee_id}
                    disabled={formDisabled}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_EMPLOYEE",
                        payload: e.target.value as number,
                      });
                    }}
                  >
                    {departments
                      .find(
                        (department) =>
                          department.departmentId === level.department_id
                      )
                      ?.employees.map((employee) => (
                        <MenuItem key={employee.id} value={employee.id}>
                          {employee.employeeName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </TableCell>
            <TableCell>
              <Checkbox
                name="accepted"
                disabled={formDisabled}
                checked={level.action === 1 || level.action === 3}
                onChange={(e) => {
                  dispatch({
                    type: "SET_ACCEPTED",
                    payload: 1,
                  });
                }}
              />
            </TableCell>
            <TableCell>
              <Checkbox
                disabled={formDisabled}
                name="approved"
                checked={level.action === 2 || level.action === 3}
                onChange={(e) => {
                  dispatch({
                    type: "SET_APPROVED",
                    payload: 2,
                  });
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                size="small"
                disabled={formDisabled}
                label="مدة التجاوز"
                value={level.duration}
                onChange={(e) => {
                  dispatch({
                    type: "SET_DURATION",
                    payload: e.target.value,
                  });
                }}
                sx={{ width: { lg: 150, xl: 200 }, minWidth: "none" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">ساعة</InputAdornment>
                  ),
                }}
              />
            </TableCell>
            <TableCell>
              <Box width={{ lg: 150, xl: 200 }}>
                <FormControl
                  fullWidth
                  size={"small"}
                  // disabled={props.disabled}
                >
                  <InputLabel size="small">النموذج</InputLabel>
                  <Select
                    label={"النموذج"}
                    size={"small"}
                    value={level.model}
                    disabled={formDisabled}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_MODEL",
                        payload: e.target.value as ProceduresModelTypeCode,
                      });
                    }}
                  >
                    {modelNamesIds.map((model) => (
                      <MenuItem key={model.id} value={model.id}>
                        {model.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

type PropsType = {
  formDisabled: boolean;
  dispatch: React.Dispatch<ActionTypes>;
  level: Step;
  departments: DepartmentWithEmployeesType[];
};

export default TableComponent;
