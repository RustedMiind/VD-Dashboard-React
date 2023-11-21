import { Stack, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useEffect, useState } from "react";
// icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Step } from "../types";
import { DepartmentWithEmployeesType } from "../../../../methods/HandleData/HandleDepartmentWithEmployees";
import useReducer, { ActionTypes } from "./reducer";
import TableComponent from "./Table";

function LevelItem(props: PropsType) {
  const [expanded, setExpanded] = useState(false);
  const reducer = useReducer(props.level);
  const dispatch = (action: ActionTypes) => {
    props.updateLevel(reducer(action));
  };
  const level = props.level;
  const formDisabled = false;

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
                // setUpdate(true);
                setExpanded(!expanded);
              }}
            >
              {props.name}
            </Button>
            <Stack direction="row" alignItems="center" gap={1}>
              {/* {update && (
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
              )} */}

              <Button
                onClick={() => {
                  setExpanded(true);
                }}
                variant={"outlined"}
                disableElevation
                startIcon={<EditIcon />}
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
          <TableComponent
            departments={props.departments}
            dispatch={dispatch}
            formDisabled={formDisabled}
            level={level}
          />
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
