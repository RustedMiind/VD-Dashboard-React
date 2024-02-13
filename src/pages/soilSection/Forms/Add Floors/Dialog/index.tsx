import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DialogTitle } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SoilContext } from "../../../SoilContext";
import { Area, Floor } from "../../../../../types/Soil";
import { useSnackbar } from "notistack";
import { Api } from "../../../../../constants";
import { isStringAllNumbers } from "../../../../../methods";
type DesignForm = {
  number_floors: string;
  depth: string;
  minimum: string;
};

const designFileInitial: DesignForm = {
  number_floors: "",
  depth: "",
  minimum: "",
};

function DialogAddFloor(props: TypeProps) {
  const [designForms, setDesignForms] = useState<DesignForm[]>([
    designFileInitial,
  ]);
  const intialAreaData: TypeFloorData = {
    number_floors: "",
    depth: "",
    minimum: "",
  };
  const { soilData, setSoilData } = useContext(SoilContext);
  const snackbar = useSnackbar();
  const setDesignForm = (
    updatedDesignForm: Partial<DesignForm>,
    index: number
  ) => {
    setDesignForms((designFiles) => {
      const updatedUtilities: DesignForm[] = [];
      designFiles.forEach((designForms, i) => {
        if (index === i) {
          updatedUtilities.push({
            ...designForms,
            ...updatedDesignForm,
          });
        } else {
          updatedUtilities.push(designForms);
        }
        console.log(updatedUtilities);
      });
      console.log("updatedUtilities ", updatedUtilities);
      return updatedUtilities;
    });
  };
  useEffect(() => {
    if (props.idToUpdate) {
      const obj: Floor | undefined =
        typeof soilData === "object"
          ? soilData.soil_floor.find((index) => index.id == props.idToUpdate)
          : undefined;
      const objLocation: TypeFloorData = {
        number_floors: obj?.number_floors.toString() || "",
        depth: obj?.depth?.toString() || "",
        minimum: obj?.minimum.toString() || "",
      };
      objLocation && setDesignForms([objLocation]);
    } else {
      setDesignForms([designFileInitial]);
    }
  }, [props.idToUpdate]);

  // function updateAmountData(partial: Partial<TypeFloorData>) {
  //   setAmountData({
  //     ...amountData,
  //     ...partial,
  //   });
  // }
  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    if (props.createOrEdit === "create") {
      axios
        .post(Api(`employee/soil/floor`), designForms)
        .then((res) => {
          snackbar.enqueueSnackbar("تم حفظ الدور");
          setSoilData && setSoilData();
          props.closeDialog();
        })
        .catch((err) => {
          snackbar.enqueueSnackbar(" تعذر في حفظ الدور ", {
            variant: "error",
          });
        });
    }
    if (props.createOrEdit === "edit") {
      axios
        .post(Api(`employee/soil/floor/${props.idToUpdate}`), designForms)
        .then((res) => {
          snackbar.enqueueSnackbar("تم تعديل الدور");
          setSoilData && setSoilData();
          props.closeDialog();
        })
        .catch((err) => {
          snackbar.enqueueSnackbar(" تعذر في تعديل الدور ", {
            variant: "error",
          });
        });
    }
  }
  return (
    <Dialog
      open={props.open}
      fullWidth
      maxWidth={"md"}
      onClose={props.closeDialog}
      component="form"
      onSubmit={handleSubmit}
    >
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          right: 20,
          mt: 3,
          border: "solid 1px ",
          borderRadius: "8px",
        }}
        color="primary"
        onClick={props.closeDialog}
      >
        <GridCloseIcon fontSize="inherit" />
      </IconButton>

      <DialogTitle
        sx={{
          bgcolor: "Background",
          fontWeight: 800,
          fontSize: "28px",
          textAlign: "center",
        }}
      >
        إضافة الأدوار
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "Background" }}>
        {designForms.map((designForm, index, arr) => (
          <>
            <Paper sx={{ padding: 2, my: 2 }}>
              <Grid container spacing={2} component="form">
                <Grid item md={12}>
                  <Stack>
                    <Typography fontSize={14} component={"label"}>
                      عدد الأدوار{" "}
                    </Typography>
                    <TextField
                      type="number"
                      size="small"
                      value={designForm.number_floors}
                      placeholder="عدد الأدوار"
                      onChange={(e) => {
                        setDesignForm(
                          {
                            number_floors: e.target.value,
                          },
                          index
                        );
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item md={12}>
                  <Stack>
                    <Typography fontSize={14} component={"label"}>
                      العمق{" "}
                    </Typography>
                    <TextField
                      placeholder="العمق"
                      type="nu"
                      size="small"
                      value={designForm.depth}
                      onChange={(e) => {
                        setDesignForm(
                          {
                            depth: e.target.value,
                          },
                          index
                        );
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item md={12}>
                  <Stack>
                    <Typography fontSize={14} component={"label"}>
                      الحد الأدنى
                    </Typography>
                    <TextField
                      placeholder=" الحد الأدنى"
                      type="number"
                      size="small"
                      value={designForm.minimum}
                      onChange={(e) => {
                        setDesignForm(
                          {
                            minimum: e.target.value,
                          },
                          index
                        );
                      }}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
            {index === arr.length - 1 && (
              <Grid container padding={2}>
                <Grid item md={12}>
                  <LoadingButton
                    variant="contained"
                    disabled={props.createOrEdit === "edit"}
                    onClick={() => {
                      setDesignForms([...designForms, designFileInitial]);
                    }}
                    fullWidth
                  >
                    <AddCircleOutlineIcon />
                    إضافة مساحة أخرى
                  </LoadingButton>
                </Grid>
              </Grid>
            )}
          </>
        ))}
      </DialogContent>

      <DialogActions sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <LoadingButton variant="contained" type="submit" sx={{ width: 0.7 }}>
          حفظ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default DialogAddFloor;

type TypeProps = {
  open: boolean;
  closeDialog: () => void;
  idToUpdate: number | [];
  createOrEdit: "create" | "edit" | "none";
};
type TypeFloorData = {
  number_floors: string;
  depth: string;
  minimum: string;
};
