import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack, InputAdornment } from "@mui/material";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import DataInputLike from "../../../../../components/DataInputLike";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateField } from "@mui/x-date-pickers/DateField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker as LeafletMarker,
  Popup as LeafletPopup,
  useMapEvents,
} from "react-leaflet";

import { Marker, Popup, Tooltip } from "react-leaflet";

import L, { LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css"; // Ensure Leaflet CSS is imported
import markerIcon from "./loc.png"; // Import custom marker ico
import { Card } from "@mui/material";
import FullScreenPopup from "./FullScreenPopup";
import MapPopUp from "../components/MapPopUp";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

/* eslint-disable @typescript-eslint/no-explicit-any */
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// Define custom marker icon
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 27], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
});

interface MapClickHandlerProps {
  onMapClick: (position: [number, number]) => void;
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ onMapClick }) => {
  const map = useMapEvents({
    click: (event: LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      const position: [number, number] = [lat, lng];
      console.log("map clicked");

      onMapClick(position);
    },
  });

  return null;
};

interface MarkerType {
  id: number;
  lat: number;
  lng: number;
  title: string;
  description: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignInSide(props: any) {
  const [popupMarker, setPopupMarker] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleMarkerClick = (marker: any) => {
    console.log("marker clicked");
    // setShowPopup(!showPopup); // Toggle the showPopup state
    setIsOpen(true);
    setSelectedMarker(marker);

    // setOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const markers = [
    { id: 1, lat: 51.505, lng: -0.09, label: "Marker 1" },
    { id: 2, lat: 51.51, lng: -0.1, label: "Marker 2" },
    { id: 3, lat: 51.515, lng: -0.095, label: "Marker 3" },
  ];

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleClosePopup = () => {
    setSelectedMarker(null);
  };

  function handleClick() {
    console.log("Container clicked!");
  }

  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <MapPopUp
          isOpen={isOpen}
          handleClose={handleClose}
          marker={selectedMarker}
        />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {markers.map((marker) => (
              <Container key={marker.id}>
                <Marker
                  position={[marker.lat, marker.lng]}
                  icon={customIcon}
                  eventHandlers={{ click: () => handleMarkerClick(marker) }}
                ></Marker>
              </Container>
            ))}
          </MapContainer>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 0,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "right",
            }}
          >
            <Stack>
              <Box
                borderBottom={1}
                mb={2}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FilterAltIcon sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                  فلتر
                </Typography>
              </Box>

              <Paper
                sx={{
                  overflow: "hidden",
                  mb: 7,
                }}
                elevation={4}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flexDirection="row"
                  flexWrap="wrap"
                  alignItems="end"
                  padding={3}
                >
                  <Stack direction="column" spacing={2}>
                    <DatePicker label="تاريخ التقديم" />

                    <DatePicker label="تاريخ الإنتهاء" />

                    <TextField
                      label="بحث"
                      value={props.search}
                      size="small"
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => {
                        props.setSearch(e.target.value);
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end"></InputAdornment>
                        ),
                      }}
                    />

                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="jobOrders"
                          control={<Radio />}
                          label="أوامر العمل"
                        />
                        <FormControlLabel
                          value="employees"
                          control={<Radio />}
                          label="الموظفين"
                        />
                      </RadioGroup>
                    </FormControl>

                    <Button
                      variant="contained"
                      //  disabled
                      type={props.search ? "submit" : "button"}
                      onClick={() => props.getContractorsData()}
                    >
                      بحث
                    </Button>
                  </Stack>
                </Box>
                <Box></Box>
              </Paper>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
