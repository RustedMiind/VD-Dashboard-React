import { Stack, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useEffect, useReducer, useState } from "react";
// icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Step } from "../types";
import { DepartmentWithEmployeesType } from "../../../../methods/HandleData/HandleDepartmentWithEmployees";
import reducer from "./reducer";
import TableComponent from "./Table";

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

              {formDisabled && (
                <Button
                  onClick={() => {
                    setUpdate(true);
                  }}
                  variant={update ? "contained" : "outlined"}
                  disableElevation
                >
                  تعديل
                </Button>
              )}
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
