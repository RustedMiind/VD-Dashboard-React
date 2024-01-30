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

function DialogAddFloor(props: TypeProps) {
  const intialAreaData: TypeFloorData = {
    number_floors: "",
    depth: "",
    minimum: "",
  };
  const { getSoil, soilData, setSoilData } = useContext(SoilContext);
  const snackbar = useSnackbar();
  const [amountData, setAmountData] = useState<TypeFloorData>(intialAreaData);

  useEffect(() => {
    if (props.idToUpdate != null) {
      const obj: Floor | undefined =
        typeof soilData === "object"
          ? soilData.soil_floor.find((index) => index.id == props.idToUpdate)
          : undefined;
      const objLocation: TypeFloorData = {
        number_floors: obj?.number_floors.toString() || "",
        depth: obj?.depth?.toString() || "",
        minimum: obj?.minimum.toString() || "",
      };
      setAmountData(obj ? objLocation : intialAreaData);
    } else setAmountData(intialAreaData);
  }, [props.idToUpdate]);

  function updateAmountData(partial: Partial<TypeFloorData>) {
    setAmountData({
      ...amountData,
      ...partial,
    });
  }
  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    axios
      .post(Api(`employee/soil/floor`), { ...amountData })
      .then((res) => {
        snackbar.enqueueSnackbar("تم حفظ الموقع");
        setSoilData && setSoilData();
        props.closeDialog();
      })
      .catch((err) => {
        snackbar.enqueueSnackbar(" تعذر في حفظ الموقع ", {
          variant: "error",
        });
      });
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
        <Paper sx={{ padding: 2, my: 2 }}>
          <Grid container spacing={2} component="form">
            <Grid item md={12}>
              <Stack>
                <Typography fontSize={14} component={"label"}>
                  عدد الأدوار{" "}
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  value={amountData.number_floors}
                  onChange={(e) => {
                    if (isStringAllNumbers(e.target.value))
                      updateAmountData({
                        number_floors: e.target.value,
                      });
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
                  type="text"
                  size="small"
                  value={amountData.depth}
                  onChange={(e) => {
                    if (isStringAllNumbers(e.target.value))
                      updateAmountData({
                        depth: e.target.value,
                      });
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
                  type="text"
                  size="small"
                  value={amountData.minimum}
                  onChange={(e) => {
                    if (isStringAllNumbers(e.target.value))
                      updateAmountData({
                        minimum: e.target.value,
                      });
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        <Grid container padding={2}>
          <Grid item md={12}>
            <LoadingButton variant="contained" type="submit" fullWidth>
              <AddCircleOutlineIcon />
              إضافة مساحة أخرى
            </LoadingButton>
          </Grid>
        </Grid>
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
  idToUpdate: number | null;
};
type TypeFloorData = {
  number_floors: string;
  depth: string;
  minimum: string;
};
