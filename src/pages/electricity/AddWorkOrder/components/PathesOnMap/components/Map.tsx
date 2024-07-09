import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import { Icon, LeafletMouseEvent } from "leaflet";
import { Box, Stack } from "@mui/material";
import positionPoint from "../../../../../../assets/images/MapPosition.png";

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

export function ShowMap(props: PropsType) {
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
};
