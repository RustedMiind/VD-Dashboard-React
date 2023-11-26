import { Accordion, AccordionSummary, Button, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useReducer, useState } from "react";
import { AccordionDetails } from "@mui/material";
import { StepType } from "../types/Step";
import { FormData } from "../types/FormData";
import TableComponent from "./Table";
import reducer from "./reducer";

const LevelItem = ({
  dataForm,
  nameBtn,
  level,
  updateLevel,
  onDelete,
}: PropsType) => {
  const [expanded, setExpanded] = useState(false);
  const [update, setUpdate] = useState(false);
  const [localLevel, dispatch] = useReducer(reducer, level);

  const localUpdateLevel = () => {
    updateLevel(localLevel);
    setUpdate(false);
    setExpanded(true);
  };

  useEffect(() => {
    dispatch({ type: "SET_RESET", payload: level });
  }, [
    level.management_id,
    level.employee_id,
    level.accept,
    level.approval,
    level.period,
    level.form_id,
    level.id,
  ]);
  console.log(level);

  const formDisabled = !update;

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
              {update && (
                <>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={localUpdateLevel}
                    color={"success"}
                    variant={"contained"}
                    disableElevation
                  >
                    حفظ التعديل
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch({ type: "SET_RESET", payload: level });
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
            formDisabled={formDisabled}
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
