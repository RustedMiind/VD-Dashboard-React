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
import { useReducer, useState } from "react";
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
import { DepartmentType, LevelType } from ".";
import { ProceduresModelsType } from "./types";
import { isStringAllNumbers } from "../../../methods/isStringAllNumbers";

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
interface AcceptedActionType extends ReducerAction<boolean> {
  type: "SET_ACCEPTED";
}
interface ApprovedActionType extends ReducerAction<boolean> {
  type: "SET_APPROVED";
}
interface DurationActionType extends ReducerAction<string> {
  type: "SET_DURATION";
}
interface ModelActionType extends ReducerAction<ProceduresModelsType> {
  type: "SET_MODEL";
}

type ActionTypes =
  | ManagerActionType
  | EmployeeActionType
  | AcceptedActionType
  | ApprovedActionType
  | DurationActionType
  | ModelActionType;
function reducer(state: LevelType, action: ActionTypes): LevelType {
  switch (action.type) {
    case "SET_MANAGER":
      return { ...state, departmentManagerId: action.payload };
    case "SET_EMPLOYEE":
      return { ...state, employeeId: action.payload };
    case "SET_ACCEPTED":
      return { ...state, accepted: action.payload };
    case "SET_APPROVED":
      return { ...state, approval: action.payload };
    case "SET_DURATION":
      if (isStringAllNumbers(action.payload)) {
        return { ...state, duration: action.payload };
      } else {
        return state;
      }
    case "SET_MODEL":
      return { ...state, model: action.payload };
    default:
      return state;
  }
}

function LevelItem(props: PropsType) {
  const [expanded, setEcpanded] = useState(false);
  const [update, setUpdate] = useState(false);
  const [level, dispatch] = useReducer(reducer, props.level);

  return (
    <Stack my={0.5}>
      <Accordion
        sx={{ bgcolor: "background.med", overflow: "hidden" }}
        expanded={expanded}
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
                setEcpanded(!expanded);
              }}
            >
              {"مرحلة للتجربة"}
            </Button>
            <Stack direction="row" alignItems="center" gap={1}>
              <Button variant="outlined" startIcon={<EditIcon />}>
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
                          value={level.departmentManagerId}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_MANAGER",
                              payload: e.target.value as number,
                            });
                          }}
                        >
                          {props.departments.map((department) => (
                            <MenuItem key={department.id} value={department.id}>
                              {department.name}
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
                          value={level.employeeId}
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
                                department.id === level.departmentManagerId
                            )
                            ?.employees.map((employee) => (
                              <MenuItem key={employee.id} value={employee.id}>
                                {employee.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      name="accepted"
                      value={level.accepted}
                      onChange={(e) => {
                        dispatch({
                          type: "SET_ACCEPTED",
                          payload: e.target.checked,
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      name="approved"
                      value={level.approval}
                      onChange={(e) => {
                        dispatch({
                          type: "SET_ACCEPTED",
                          payload: e.target.checked,
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
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
  level: LevelType;
  departments: DepartmentType;
};

export default LevelItem;
