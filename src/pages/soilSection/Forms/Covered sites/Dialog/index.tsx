import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItem } from "@mui/material";
import RequiredSymbol from "../../../../../components/RequiredSymbol";
import { useState } from "react";
import axios from "axios";
import { Api } from "../../../../../constants";
import { useSnackbar } from "notistack";

export default function DialogAddLocation(props: TypeProps) {
  const intialLocationData = {
    location_name: "",
    city_id: "",
    building_system: "",
    status: "1",
  };
  const [amountData, setAmountData] =
    useState<TypeLocationData>(intialLocationData);
  function updateAmountData(partial: Partial<TypeLocationData>) {
    setAmountData({
      ...amountData,
      ...partial,
    });
  }
  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    axios
      .post(Api(`employee/soil/location}`), { ...amountData })
      .then((res) => {
        console.log(res);
        // snackbar.enqueueSnackbar("تم حفظ بيانات البند");
        // snackbar.enqueueSnackbar(
        //   tenderAmount ? "تم تعديل بيانات البند" : "تم حفظ بيانات البند"
        // );
        // setError(undefined);
        // tenderContext.getTenderData && tenderContext.getTenderData();
        // setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Dialog
        maxWidth={"sm"}
        fullWidth
        open={props.open}
        onClose={props.closeDialog}
        onSubmit={handleSubmit}
        component={"form"}
      >
        <DialogTitle
          sx={{
            bgcolor: "Background",
            fontWeight: 800,
            fontSize: "28px",
            textAlign: "center",
          }}
        >
          اضافة موقع
        </DialogTitle>
        <DialogContent>
          <Grid container p={1} spacing={4}>
            <Grid item md={6}>
              <Typography sx={{ ml: 2 }}>
                اسم الموقع <RequiredSymbol />
              </Typography>
              <TextField
                type="text"
                size="small"
                fullWidth
                value={amountData.location_name}
                onChange={(e) => {
                  updateAmountData({ location_name: e.target.value });
                }}
              />
            </Grid>
            <Grid item md={6}>
              <Typography>
                المدينة <RequiredSymbol />
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  onChange={(e) => {
                    updateAmountData({ city_id: e.target.value });
                  }}
                  value={amountData.city_id}
                >
                  <MenuItem value={"0"}>None</MenuItem>
                  <MenuItem value={"10"}>Ten</MenuItem>
                  <MenuItem value={"20"}>Twenty</MenuItem>
                  <MenuItem value={"30"}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <Typography sx={{ ml: 2 }}>
                نظام البناء <RequiredSymbol />
              </Typography>
              <TextField
                value={amountData.building_system}
                type="text"
                size="small"
                fullWidth
                onChange={(e) => {
                  updateAmountData({ building_system: e.target.value });
                }}
              />
            </Grid>
            <Grid item md={6}>
              <Typography sx={{ ml: 2 }}>
                الموقع <RequiredSymbol />
              </Typography>
              <TextField type="text" size="small" fullWidth />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" type="submit" sx={{ mb: 2 }}>
            حفظ
          </Button>
        </DialogActions>
        <IconButton
          onClick={props.closeDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>
    </>
  );
}
type TypeProps = {
  open: boolean;
  closeDialog: () => void;
};

type TypeLocationData = {
  location_name: string;
  city_id: string;
  building_system: string;
  status: string;
  map?: null;
};
