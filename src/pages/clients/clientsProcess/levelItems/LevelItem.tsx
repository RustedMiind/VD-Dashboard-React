import { Accordion, AccordionSummary, Button, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { AccordionDetails } from "@mui/material";
import { StepType } from "../types/Step";
import { FormData } from "../types/FormData";
import TableComponent from "./Table";
import useReducer, { ActionType } from "./reducer";

const LevelItem = ({
  dataForm,
  nameBtn,
  level,
  updateLevel,
  onDelete,
}: PropsType) => {
  const [expanded, setExpanded] = useState(false);
  const [update, setUpdate] = useState(false);
  const reducer = useReducer(level);
  const dispatch = (action: ActionType) => {
    updateLevel(reducer(action));
  };
  const localLevel = level;

  useEffect(() => {
    dispatch({ type: "SET_RESET", payload: level });
  }, [
    level.department_id,
    level.employee_id,
    level.accept,
    level.approval,
    level.period,
    level.form_id,
    level.branch_id,
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
                setExpanded(!expanded);
              }}
            >
              {nameBtn}
            </Button>

            <Stack direction="row" alignItems="center" gap={1}>
              <Button
                onClick={() => {
                  setExpanded(!expanded);
                  setUpdate(!update);
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
                disabled={!onDelete}
                onClick={onDelete}
              >
                حذف
              </Button>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "background.paper", my: 0 }}>
          <TableComponent
            dataForm={dataForm}
            level={localLevel}
            dispatch={dispatch}
          />
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

type PropsType = {
  onDelete?: () => void;
  level: StepType;
  dataForm: FormData;
  updateLevel: (payload: StepType) => void;
  nameBtn: string;
};

export default LevelItem;
