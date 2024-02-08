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
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import RequiredSymbol from "../../../../../../../components/RequiredSymbol";
import { Map } from "../Leaflet/Map";
import { SoilDataContext } from "../../../..";

export default function DialogShowLocation(props: TypeProps) {
  const [positionClick, setPositionClick] = useState<[number, number][]>([]);
  const { soilData } = useContext(SoilDataContext);

  useEffect(() => {
    let str =
      typeof soilData === "object" &&
      soilData?.soil_order?.soil_location_map?.map.slice(2, -2);
    let arr = str?.toString().split("},{");
    let positions: [number, number][] = [];
    for (let i = 0; i < arr?.length; i++) {
      let cordin = arr[i].split(",");
      let temp: [number, number] = [
        +cordin[0].split(":")[1],
        +cordin[1].split(":")[1],
      ];

      positions.push(temp);
    }
    setPositionClick(positions);
    console.log(positionClick);
  }, []);

  function closeDialog() {
    props.setOpenDialog(false);
  }
  return (
    <>
      <Dialog
        maxWidth={"md"}
        fullWidth
        open={props.openDialog}
        onClose={closeDialog}
        component={"form"}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            fontSize: "28px",
            textAlign: "center",
          }}
        >
          الموقع
        </DialogTitle>
        {typeof soilData === "object" && (
          <DialogContent>
            <Grid container p={1} spacing={4}>
              <Grid item md={6}>
                <Typography>
                  اسم الموقع <RequiredSymbol />
                </Typography>
                <TextField
                  value={
                    soilData?.soil_order?.soil_location_map?.soil_location
                      ?.location_name
                  }
                  disabled
                  type="text"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={6}>
                <Typography>
                  المدينة <RequiredSymbol />
                </Typography>
                <TextField
                  disabled
                  value={
                    soilData?.soil_order?.soil_location_map?.soil_location?.city
                      ?.name
                  }
                  type="text"
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item md={12}>
                <Map
                  positionClick={positionClick}
                  setPositionClick={setPositionClick}
                />
              </Grid>
            </Grid>
          </DialogContent>
        )}

        <DialogActions
          sx={{ display: "flex", justifyContent: "center", py: 3 }}
        >
          <Button onClick={closeDialog} variant="contained" sx={{ width: 0.2 }}>
            الغاء
          </Button>
        </DialogActions>
        <IconButton
          onClick={closeDialog}
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
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};
