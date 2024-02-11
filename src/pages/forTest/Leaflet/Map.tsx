// --- (1), (2) & (3): install and import ---
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import { Icon, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { LatLngLiteral } from "leaflet";

// --- ---------------------------------- ---
const MapClickHandler: React.FC<MapClickHandlerProps> = ({ onMapClick }) => {
  const map = useMapEvents({
    click: (event: LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      const position: [number, number] = [lat, lng];
      onMapClick(position);
    },
  });

  return null;
};
export function Map() {
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const customIcon = new Icon({
    iconUrl: "/icons8-select-24.png",
    iconSize: [20, 20],
    // iconAnchor: [1, 1],
    // popupAnchor: [-0, -76]
  });
  const [positionClick, setPositionClick] = useState<[number, number][]>([]);
  const handleMapClick = (position: [number, number]) => {
    setPositionClick((prev) => [...prev, position]);
    console.log(positionClick);
  };

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
    <section className="map-component">
      <div className="map">
        <MapContainer center={center} zoom={12} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[13.084622, 80.248357]} icon={customIcon}></Marker>
          <MapClickHandler onMapClick={handleMapClick} />
          {createPolylines()}
        </MapContainer>
      </div>
    </section>
  );
}

interface Position {
  lat: number;
  lng: number;
}
interface MapClickHandlerProps {
  onMapClick: (position: [number, number]) => void;
}
