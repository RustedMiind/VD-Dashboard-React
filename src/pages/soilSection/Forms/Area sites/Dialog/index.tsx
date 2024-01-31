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
import axios from "axios";
import { Api } from "../../../../../constants";
import { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { SoilContext } from "../../../SoilContext";
import { Area } from "../../../../../types/Soil";
import { isStringAllNumbers } from "../../../../../methods";

function GridItem({ children }: { children: React.ReactNode }) {
  return (
    <Grid item xs={12} md={6}>
      <Stack justifyContent={"end"}>{children}</Stack>
    </Grid>
  );
}

type DesignForm = {
  area_from: string;
  area_to: string;
  number: string;
  minimum: string;
};

const designFileInitial: DesignForm = {
  area_from: "",
  area_to: "",
  number: "",
  minimum: "",
};

function DialogAddArea(props: TypeProps) {
  const snackbar = useSnackbar();
  const { soilData, setSoilData } = useContext(SoilContext);
  const [designForms, setDesignForms] = useState<DesignForm[]>([
    designFileInitial,
  ]);

  const intialAreaData: TypeAreaData = {
    area_from: "",
    area_to: "",
    number: "",
    minimum: "",
  };

  useEffect(() => {
    if (props.idToUpdate != null) {
      const obj: Area | undefined =
        typeof soilData === "object"
          ? soilData.soil_area.find((index) => index.id == props.idToUpdate)
          : undefined;
      const objArea: TypeAreaData = {
        area_from: obj?.area_from?.toString() || "",
        area_to: obj?.area_to?.toString() || "",
        number: obj?.number?.toString() || "",
        minimum: obj?.minimum?.toString() || "",
      };
      objArea && setDesignForms([objArea]);
    }
  }, [props.idToUpdate]);
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

  const intialLocationData = {
    area_from: "",
    area_to: "",
    number: "",
    minimum: "",
  };
  const [amountData, setAmountData] =
    useState<TypeAreaData>(intialLocationData);

  function updateAmountData(partial: Partial<TypeAreaData>) {
    setAmountData({
      ...amountData,
      ...partial,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    if (props.createOrEdit === "create") {
      axios
        .post(Api(`employee/soil/area`), designForms[0])
        .then((res) => {
          snackbar.enqueueSnackbar("تم حفظ المساحة");
          setSoilData && setSoilData();
          props.closeDialog();
        })
        .catch((err) => {
          snackbar.enqueueSnackbar(" تعذر في حفظ المساحة ", {
            variant: "error",
          });
        });
    }
    if (props.createOrEdit === "edit") {
      axios
        .post(Api(`employee/soil/area/${props.idToUpdate}`), designForms[0])
        .then((res) => {
          snackbar.enqueueSnackbar("تم تعديل المساحة");
          setSoilData && setSoilData();
          props.closeDialog();
        })
        .catch((err) => {
          snackbar.enqueueSnackbar(" تعذر في تعديل المساحة ", {
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
      onSubmit={handleSubmit}
      component="form"
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
        إضافة مساحة
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "Background", height: "800px" }}>
        {designForms.map((designForm, index, arr) => (
          <>
            <Paper sx={{ padding: 2, my: 2 }}>
              <Grid container spacing={2} component="form">
                <GridItem>
                  <Typography component={"label"}>المساحة من</Typography>
                  <TextField
                    type="number"
                    size="small"
                    placeholder={"المساحة من"}
                    value={designForm.area_from}
                    onChange={(e) => {
                      setDesignForm(
                        {
                          area_from: e.target.value,
                        },
                        index
                      );
                    }}
                  />
                </GridItem>
                <GridItem>
                  <Typography component={"label"}>المساحة إلى</Typography>
                  <TextField
                    type="number"
                    size="small"
                    placeholder={"المساحة إلى"}
                    value={designForm.area_to}
                    onChange={(e) => {
                      setDesignForm(
                        {
                          area_to: e.target.value,
                        },
                        index
                      );
                    }}
                  />
                </GridItem>
                <Grid item md={12}>
                  <Stack>
                    <Typography component={"label"}>العدد المقابل </Typography>
                    <TextField
                      type="number"
                      size="small"
                      placeholder={"العدد المقابل "}
                      value={designForm.number}
                      onChange={(e) => {
                        setDesignForm(
                          {
                            number: e.target.value,
                          },
                          index
                        );
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item md={12}>
                  <Stack>
                    <Typography component={"label"}>الحد الأدنى </Typography>
                    <TextField
                      type="number"
                      size="small"
                      placeholder={"الحد الأدنى "}
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
                    onClick={() => {
                      setDesignForms([...designForms, designFileInitial]);
                    }}
                    disabled={props.createOrEdit === "edit"}
                    variant="contained"
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

export default DialogAddArea;
type TypeProps = {
  open: boolean;
  closeDialog: () => void;
  idToUpdate: number | null;
  createOrEdit: "create" | "edit" | "none";
};

type TypeAreaData = {
  area_from: string;
  area_to: string;
  number: string;
  minimum: string;
};
