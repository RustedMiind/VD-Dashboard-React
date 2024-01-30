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
import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { SoilContext } from "../../../SoilContext";

function GridItem({ children }: { children: React.ReactNode }) {
  return (
    <Grid item xs={12} md={6}>
      <Stack height={1} justifyContent={"end"}>
        {children}
      </Stack>
    </Grid>
  );
}
type DesignForm = {
  inputAreaFrom: string;
  inputAreaTo: string;
  inputNumber: string;
  InputMin: string;
};

const designFileInitial: DesignForm = {
  inputAreaFrom: "",
  inputAreaTo: "",
  inputNumber: "",
  InputMin: "",
};
function DialogAddArea(props: TypeProps) {
  const [designForms, setDesignForms] = useState<DesignForm[]>([
    designFileInitial,
  ]);
  const setDesignForm = (updatedDesignForm: DesignForm, index: number) => {
    setDesignForms((designFiles) => {
      const updatedUtilities: DesignForm[] = [];
      designFiles.forEach((designForms, i) => {
        if (index === i) {
          updatedUtilities.push(updatedDesignForm);
        } else {
          updatedUtilities.push(designForms);
        }
        console.log(updatedUtilities);
      });
      console.log("updatedUtilities ", updatedUtilities);
      return updatedUtilities;
    });
  };
  const { soilData, setSoilData, getSoil } = useContext(SoilContext);
  const snackbar = useSnackbar();
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
    axios
      .post(Api(`employee/soil/area`), { ...amountData })
      .then((res) => {
        console.log(res);
        snackbar.enqueueSnackbar("تم حفظ الموقع");
        props.closeDialog();
      })
      .catch((err) => {
        console.log(err);
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
      {designForms.map((designForm, index, arr) => (
        <DialogContent sx={{ bgcolor: "Background", height: "800px" }}>
          <Paper sx={{ padding: 2, my: 2 }}>
            <Grid container spacing={2} component="form">
              <GridItem>
                <Typography component={"label"}>المساحة من</Typography>
                <TextField
                  type="text"
                  size="small"
                  placeholder={"المساحة من"}
                  value={amountData.area_from}
                  onChange={(e) => {
                    updateAmountData({ area_from: e.target.value });
                  }}
                />
              </GridItem>
              <GridItem>
                <Typography component={"label"}>المساحة إلى</Typography>
                <TextField
                  type="text"
                  size="small"
                  placeholder={"المساحة إلى"}
                  value={amountData.area_to}
                  onChange={(e) => {
                    updateAmountData({ area_to: e.target.value });
                  }}
                />
              </GridItem>
              <Grid item md={12}>
                <Stack>
                  <Typography component={"label"}>العدد المقابل </Typography>
                  <TextField
                    type="text"
                    size="small"
                    placeholder={"العدد المقابل "}
                    value={amountData.number}
                    onChange={(e) => {
                      updateAmountData({ number: e.target.value });
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item md={12}>
                <Stack>
                  <Typography component={"label"}>الحد الأدنى </Typography>
                  <TextField
                    type="text"
                    size="small"
                    placeholder={"الحد الأدنى "}
                    value={amountData.minimum}
                    onChange={(e) => {
                      updateAmountData({ minimum: e.target.value });
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
                  variant="contained"
                  fullWidth
                >
                  <AddCircleOutlineIcon />
                  إضافة مساحة أخرى
                </LoadingButton>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      ))}

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
};

type TypeAreaData = {
  area_from: string;
  area_to: string;
  number: string;
  minimum: string;
};
