// --- (1), (2) & (3): install and import ---
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Polyline,
  Polygon,
} from "react-leaflet";
import { Icon, LeafletMouseEvent } from "leaflet";
import { Box, Stack } from "@mui/material";
import img1 from "../../assets/images/pngwing.com.png";

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
export function ShowMap({ positionClick, lat, long }: PropsType) {
  const customIcon = new Icon({
    iconUrl: img1,
    iconSize: [50, 50],
  });

  let centerLat = 0,
    centerLong = 0;

  if (!!positionClick.length) {
    positionClick.forEach(([lat, lng]) => {
      centerLat += lat;
      centerLong += lng;
    });
    centerLat /= positionClick.length;
    centerLong /= positionClick.length;
  }

  function createPolylines() {
    const polylines = [];
    for (let i = 0; i < positionClick.length - 1; i++) {
      const startPoint = positionClick[i];
      const endPoint = positionClick[i + 1];
      const polyline = <Polyline key={i} positions={[startPoint, endPoint]} />;
      polylines.push(polyline);
    }

    return polylines;
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
        center={[centerLat, centerLong]}
        zoom={15}
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
        <Marker position={[lat, long]} icon={customIcon}></Marker>
        {/* Second TileLayer without background color */}
        <Polygon
          positions={positionClick}
          pathOptions={{ fillColor: "yellow", fillOpacity: 0.4 }}
        />

        <MapClickHandler onMapClick={() => {}} />
        {createPolylines()}
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
