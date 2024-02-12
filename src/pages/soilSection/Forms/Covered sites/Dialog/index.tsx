import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  IconButton,
  FormControl,
  Select,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItem } from "@mui/material";
import RequiredSymbol from "../../../../../components/RequiredSymbol";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../../../constants";
import { useSnackbar } from "notistack";
import { City, Location, Position } from "../../../../../types/Soil";
import { SoilContext } from "../../../SoilContext";
import { LoadingButton } from "@mui/lab";
import { Map } from "../Leaflet/Map";

export default function DialogAddLocation(props: TypeProps) {
  const [positionClick, setPositionClick] = useState<[number, number][]>([]);
  const [formStatus, setFormStatus] = useState<"loading" | "none" | "error">(
    "none"
  );
  const { soilData, setSoilData } = useContext(SoilContext);
  const snackbar = useSnackbar();
  const intialLocationData: TypeLocationData = {
    location_name: "",
    city_id: "",
    building_system: "",
    status: "1",
    price: "",
    map: [],
  };
  const [city, setCity] = useState<City[]>([]);
  const [amountData, setAmountData] =
    useState<TypeLocationData>(intialLocationData);

  useEffect(() => {
    if (props.idToUpdate) {
      // Edit Phase
      const obj: Location | undefined =
        typeof soilData === "object"
          ? soilData.soil_location.find((index) => index.id == props.idToUpdate)
          : undefined;
      let objLocation: TypeLocationData = {
        location_name: obj?.location_name || "",
        city_id: obj?.city_id?.toString() || "",
        building_system: obj?.building_system || "",
        price: obj?.map?.price?.toString() || "",
        status: "1",
        map: null,
      };
      try {
        objLocation.map =
          (JSON.parse(obj?.map?.map || "[]") as Position[]) || null;
        console.log(objLocation);
      } catch (err) {
        console.log(err);
      }
      setPositionClick(
        objLocation.map?.map((point) => [point.lat, point.long]) || []
      );
      setAmountData(obj ? objLocation : intialLocationData);
    } else {
      setAmountData(intialLocationData);
    }
  }, [props.idToUpdate]);

  useEffect(() => {
    axios
      .get<{ data: City[] }>(Api(`employee/soil/use`))
      .then((res) => {
        setCity(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function updateAmountData(partial: Partial<TypeLocationData>) {
    //  {"lat": 40.7128, "long": -74.0060},
    let _positions: { lat: number; long: number }[] = positionClick.map(
      (ele) => ({ lat: ele[0], long: ele[1] })
    );
    setAmountData({
      ...amountData,
      ...partial,
    });
  }
  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    setFormStatus("loading");
    e.preventDefault();
    if (props.createOrEdit === "create") {
      axios
        .post(Api(`employee/soil/location`), { ...amountData })
        .then((res) => {
          setFormStatus("none");
          snackbar.enqueueSnackbar("تم حفظ الموقع");
          setSoilData && setSoilData();
          props.closeDialog();
        })
        .catch((err) => {
          setFormStatus("error");
          snackbar.enqueueSnackbar(" تعذر في حفظ الموقع ", {
            variant: "error",
          });
        });
    }
    if (props.createOrEdit === "edit") {
      setFormStatus("loading");
      axios
        .post(Api(`employee/soil/location/${props.idToUpdate}`), {
          ...amountData,
        })
        .then((res) => {
          setFormStatus("none");
          snackbar.enqueueSnackbar("تم تعديل الموقع");
          setSoilData && setSoilData();
          props.closeDialog();
        })
        .catch((err) => {
          setFormStatus("error");
          snackbar.enqueueSnackbar(" تعذر في تعديل الموقع ", {
            variant: "error",
          });
        });
    }
  }
  return (
    <>
      <Dialog
        maxWidth={"md"}
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
                placeholder="اسم الموقع"
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
                  value={amountData.city_id}
                  onChange={(e) => {
                    updateAmountData({ city_id: e.target.value as string });
                  }}
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
                placeholder="نظام البناء"
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
              <TextField
                disabled
                type="text"
                size="small"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => {
                        props.setDisplayMap(!props.displayMap);
                      }}
                    >
                      تحديد
                    </Button>
                  ),
                }}
                placeholder=" الموقع"
              />
            </Grid>
            <Grid item md={6}>
              <Typography sx={{ ml: 2 }}>
                السعر <RequiredSymbol />
              </Typography>
              <TextField
                InputProps={{
                  endAdornment: <Typography>ر.س</Typography>,
                }}
                placeholder=" السعر المتر في هذه المنطقة"
                value={amountData?.price}
                type="number"
                size="small"
                fullWidth
                onChange={(e) => {
                  updateAmountData({ price: e.target.value });
                }}
              />
            </Grid>
            {props.displayMap && (
              <Grid item md={12}>
                <Map
                  updateAmountData={updateAmountData}
                  positionClick={positionClick}
                  setPositionClick={setPositionClick}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "center", py: 3 }}
        >
          <LoadingButton
            loading={formStatus === "loading"}
            variant="contained"
            type="submit"
            sx={{ width: 0.2 }}
          >
            حفظ
          </LoadingButton>
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
  idToUpdate: number | [];
  createOrEdit: "create" | "edit" | "none";
  displayMap: boolean;
  setDisplayMap: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TypeLocationData = {
  location_name: string;
  city_id: string;
  building_system: string;
  status: string;
  price: string;
  map: Position[] | null;
};
