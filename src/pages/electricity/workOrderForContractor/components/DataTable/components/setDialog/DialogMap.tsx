import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import { Icon, LeafletMouseEvent } from "leaflet";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import positionPoint from "../../../../../../../assets/images/MapPosition.png";
import DialogConfirmMap from "./DialogConfirmMap";
import { useState } from "react";

let TargetPositions: [number, number][] = [];

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ onMapClick }) => {
  const map = useMapEvents({
    click: (event: LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      const position: [number, number] = [lat, lng];
      TargetPositions.push(position);
      onMapClick(position);
    },
  });

  return null;
};

const customIcon = new Icon({
  iconUrl: positionPoint,
  iconSize: [20, 20],
});

function DialogMap(props: PropsType) {
  const [open, setOpen] = useState(false);
  function handleConfirmMap() {
    setOpen(!open);
  }
  // TODO::define and declare component state and variables
  let { positionClick, setPositionClick, lat, long } = props;
  let centerLat = 0,
    centerLong = 0;

  // TODO::define and declare component helper methods
  if (!!positionClick.length) {
    positionClick.forEach(([lat, lng]) => {
      centerLat += lat;
      centerLong += lng;
    });
    centerLat /= positionClick.length;
    centerLong /= positionClick.length;
  }

  return (
    <>
      <Dialog
        open={props.openMap}
        onClose={props.handleCloseMap}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: 600, px: 20 }}>
          ارسم مسار امر العمل على الخريطة
        </DialogTitle>
        <DialogContent>
          <Stack
            sx={{
              width: "100%",
              height: "340px",
              margin: "auto",
            }}
          >
            <MapContainer
              center={[lat, long]}
              zoom={4}
              scrollWheelZoom={true}
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              {/* First TileLayer with background color */}
              <TileLayer
                className="tile"
                opacity={0.5}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* set clicked positions */}
              {positionClick.map((position, idx) => (
                <Marker key={idx} position={position} icon={customIcon} />
              ))}
              {/* draw lines */}
              {positionClick.length > 1 && (
                <Polyline positions={positionClick} color="blue" />
              )}
              <MapClickHandler
                onMapClick={(p) => {
                  setPositionClick((ar) => [...ar, p]);
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  mt: 2,
                  position: "absolute",
                  right: "10px",
                  top: "60px",
                  zIndex: "100000",
                  bgcolor: "primary.contrastText",
                }}
              ></Box>
            </MapContainer>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ pb: 3 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{ mx: 8 }}
            onClick={handleConfirmMap}
          >
            تاكيد
          </Button>
        </DialogActions>
      </Dialog>
      <DialogConfirmMap
        open={open}
        handleConfirmMap={handleConfirmMap}
        handleCloseMap={props.handleCloseMap}
      />
    </>
  );
}
interface MapClickHandlerProps {
  onMapClick: (position: [number, number]) => void;
}
type PropsType = {
  positionClick: [number, number][];
  setPositionClick: React.Dispatch<React.SetStateAction<[number, number][]>>;
  lat: number;
  long: number;
  openMap: boolean;
  handleCloseMap: () => void;
};

export default DialogMap;
