import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { FormData } from "../types/FormData";
import { StepType } from "../types/Step";
import React from "react";

const TableComponent = ({
  formDisabled,
  level,
  dataForm,
  dispatch,
}: PropsType) => {
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
                <FormControl fullWidth size={"small"}>
                  <InputLabel size="small">القسم</InputLabel>
                  <Select
                    label={"القسم"}
                    size={"small"}
                    value={level.department_id}
                    disabled={formDisabled}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_MANAGEMENT",
                        payload: e.target.value as number,
                      });
                    }}
                  >
                    {dataForm?.department?.map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </TableCell>

            <TableCell>
              <Box width={{ lg: 150, xl: 200 }}>
                <FormControl fullWidth size={"small"}>
                  <InputLabel size="small">الموظف</InputLabel>
                  <Select
                    label={"الموظف"}
                    size={"small"}
                    disabled={formDisabled}
                    value={level.employee_id}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_EMPLOYEE",
                        payload: e.target.value as number,
                      });
                    }}
                  >
                    {dataForm?.employees?.map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </TableCell>

            <TableCell>
              <Checkbox
                name="accepted"
                checked={level.accept === 1}
                disabled={formDisabled}
                onChange={(e, checked) => {
                  dispatch({
                    type: "SET_ACCEPT",
                    payload: checked ? 1 : 0,
                  });
                }}
              />
            </TableCell>

            <TableCell>
              <Checkbox
                name="approved"
                disabled={formDisabled}
                checked={level.approval === 1}
                onChange={(e, checked) => {
                  dispatch({
                    type: "SET_APPROVAL",
                    payload: checked ? 1 : 0,
                  });
                }}
              />
            </TableCell>

            <TableCell>
              <TextField
                size="small"
                label="مدة التجاوز"
                disabled={formDisabled}
                value={level.period}
                onChange={(e) => {
                  dispatch({
                    type: "SET_DURATION",
                    payload: e.target.value,
                  });
                }}
              />
            </TableCell>

            <TableCell>
              <Box width={{ lg: 150, xl: 200 }}>
                <FormControl fullWidth size={"small"}>
                  <InputLabel size="small">النموذج</InputLabel>
                  <Select
                    label={"النموذج"}
                    size={"small"}
                    disabled={formDisabled}
                    value={level.form_id}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_MODEL",
                        payload: e.target.value as number,
                      });
                    }}
                  >
                    {dataForm?.contractForm?.map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
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
};

type PropsType = {
  formDisabled: boolean;
  level: StepType;
  dataForm: FormData;
  dispatch: React.Dispatch<any>;
};

export default TableComponent;
