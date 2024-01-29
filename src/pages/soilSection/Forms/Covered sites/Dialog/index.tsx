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
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItem } from "@mui/material";
import RequiredSymbol from "../../../../../components/RequiredSymbol";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../../../constants";
import { useSnackbar } from "notistack";
import { City } from "../../../../../types/Soil";
import { SoilContext } from "../../../SoilContext";

export default function DialogAddLocation(props: TypeProps) {
  const { getSoil } = useContext(SoilContext);
  const snackbar = useSnackbar();
  const [city, setCity] = useState<City[]>([]);
  const intialLocationData = {
    location_name: "",
    city_id: "",
    building_system: "",
    status: "1",
  };
  const [amountData, setAmountData] =
    useState<TypeLocationData>(intialLocationData);
  useEffect(() => {
    axios
      .get<{ data: City[] }>(Api(`employee/soil/use`))
      .then((res) => {
        getSoil && getSoil();
        setCity(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function updateAmountData(partial: Partial<TypeLocationData>) {
    setAmountData({
      ...amountData,
      ...partial,
    });
  }
  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    axios
      .post(Api(`employee/soil/location`), { ...amountData })
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
                  {city.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name}
                    </MenuItem>
                  ))}
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
