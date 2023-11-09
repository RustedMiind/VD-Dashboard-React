import {
  Stack,
  Button,
  Box,
  InputAdornment,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useEffect, useReducer, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TextField,
} from "@mui/material";
// icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SelectCustom from "../../../components/MuiCustom";
import { Step } from "./types";
import { isStringAllNumbers } from "../../../methods/isStringAllNumbers";
import { DepartmentWithEmployeesType } from "../../../methods/HandleData/HandleDepartmentWithEmployees";

interface ReducerAction<P> {
  type: string;
  payload: P;
}

interface ManagerActionType extends ReducerAction<number> {
  type: "SET_MANAGER";
}
interface EmployeeActionType extends ReducerAction<number> {
  type: "SET_EMPLOYEE";
}
interface AcceptedActionType extends ReducerAction<0 | 1 | 2 | 3> {
  type: "SET_ACCEPTED";
}
interface ApprovedActionType extends ReducerAction<0 | 1 | 2 | 3> {
  type: "SET_APPROVED";
}
interface DurationActionType extends ReducerAction<string> {
  type: "SET_DURATION";
}
interface ModelActionType extends ReducerAction<1 | 2 | 3 | 4> {
  type: "SET_MODEL";
}
interface ModelActionResetType extends ReducerAction<Step> {
  type: "SET_RESET";
}

type ActionTypes =
  | ManagerActionType
  | EmployeeActionType
  | AcceptedActionType
  | ApprovedActionType
  | DurationActionType
  | ModelActionType
  | ModelActionResetType;
function reducer(state: Step, action: ActionTypes): Step {
  switch (action.type) {
    case "SET_MANAGER":
      return { ...state, department_id: action.payload };
    case "SET_EMPLOYEE":
      return { ...state, employee_id: action.payload };
    case "SET_APPROVED":
      if (state.action === 1) {
        return { ...state, action: 3 };
      } else if (state.action === 2) {
        return { ...state, action: 0 };
      } else if (state.action === 3) {
        return { ...state, action: 1 };
      } else {
        return { ...state, action: 2 };
      }
    case "SET_ACCEPTED":
      if (state.action === 2) {
        return { ...state, action: 3 };
      } else if (state.action === 1) {
        return { ...state, action: 0 };
      } else if (state.action === 3) {
        return { ...state, action: 2 };
      } else {
        return { ...state, action: 1 };
      }
    case "SET_DURATION":
      if (isStringAllNumbers(action.payload)) {
        return { ...state, duration: parseInt(action.payload) || 0 };
      } else {
        return state;
      }
    case "SET_MODEL":
      return { ...state, model: action.payload };
    case "SET_RESET":
      return action.payload;
    default:
      return state;
  }
}

function LevelItem(props: PropsType) {
  const [expanded, setExpanded] = useState(false);
  const [update, setUpdate] = useState(false);
  const [level, dispatch] = useReducer(reducer, props.level);

  const formDisabled = !update;

  function updateLevel() {
    props.updateLevel(level);
    setUpdate(false);
    setExpanded(true);
  }

  useEffect(() => {
    dispatch({ type: "SET_RESET", payload: props.level });
  }, [
    props.level.action,
    props.level.department_id,
    props.level.duration,
    props.level.id,
    props.level.employee_id,
    props.level.model,
  ]);

  return (
    <Stack my={0.5}>
      <Accordion
        sx={{ bgcolor: "background.med", overflow: "hidden" }}
        expanded={update || expanded}
        elevation={0}
        disableGutters
      >
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          sx={{ ".MuiAccordionSummary-content": { my: 0.75 } }}
          id="panel1a-header"
        >
          <Stack
            direction="row"
            alignItems="center"
            width={1}
            justifyContent="space-between"
          >
            <Button
              size="large"
              variant="text"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => {
                // setUpdate(true);
                setExpanded(!expanded);
              }}
            >
              {props.name}
            </Button>
            <Stack direction="row" alignItems="center" gap={1}>
              {update && (
                <>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={updateLevel}
                    color={"success"}
                    variant={"contained"}
                    disableElevation
                  >
                    حفظ التعديل
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch({ type: "SET_RESET", payload: props.level });
                      setUpdate(false);
                    }}
                    color={"error"}
                    variant={"contained"}
                    disableElevation
                  >
                    الغاء التعديل
                  </Button>
                </>
              )}
              <Button
                onClick={() => {
                  setUpdate(true);
                }}
                variant={update ? "contained" : "outlined"}
                disableElevation
              >
                تعديل
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                disabled={!props.onDelete}
                onClick={props.onDelete}
              >
                حذف
              </Button>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "background.paper", my: 0 }}>
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
                          {props.departments
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
                      <SelectCustom
                        disabled={formDisabled}
                        options={[
                          { name: "نموذج المرحلة الاولي", value: "1" },
                          { name: "نموذج المرحلة الثانية", value: "2" },
                        ]}
                        size="small"
                        label="اختر النموذج"
                        // disabled
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

type PropsType = {
  onDelete?: () => void;
  level: Step;
  departments: DepartmentWithEmployeesType[];
  updateLevel: (payload: Step) => void;
  name: string;
};

export default LevelItem;
