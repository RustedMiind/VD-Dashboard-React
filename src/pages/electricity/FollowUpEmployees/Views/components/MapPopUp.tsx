import React from 'react';
import { Dialog, DialogContent, Typography, RadioGroup, FormControlLabel, Radio, TextField, IconButton, Button, Grid } from '@mui/material';
import { Close, Phone, CameraAlt, Chat, LocationOn } from '@mui/icons-material';
import { marker } from 'leaflet';
type MapPopUpProps = {
  isOpen: boolean;
  handleClose: () => void;
  marker?: { id: number; lat: number; lng: number; label: string } | null;
};

const MapPopUp: React.FC<MapPopUpProps> = ({ isOpen, handleClose, marker }) => {
  if (!marker) {
    return null;
  }
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>
        <Typography variant="h5" align="center">فلتر البحث</Typography>

        <RadioGroup aria-label="التصنيف">
          <FormControlLabel value="commands" control={<Radio />} label="أوامر العمل" />
          <FormControlLabel value="employees" control={<Radio />} label="الموظفين" />
        </RadioGroup>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>

            <TextField
              label="الأسم"
              variant="outlined"
              fullWidth
              disabled
              value={marker.label}
            />

          </Grid>
          <Grid item xs={6}>
            <TextField
              label="رقم الجوال"
              variant="outlined"
              fullWidth
              disabled
              value={marker.lat}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField label="العنوان" variant="outlined" fullWidth disabled value={marker.lng} InputProps={{
              endAdornment: <IconButton><LocationOn /></IconButton>,
            }} />
          </Grid>
          <Grid item xs={6}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton><Phone /></IconButton>
              <Typography>اتصال</Typography>
              <IconButton><CameraAlt /></IconButton>
              <Typography>فيديو</Typography>
              <IconButton><Chat /></IconButton>
              <Typography>محادثة</Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Button onClick={handleClose} variant="contained">الرجوع</Button>
        </Grid>
        <IconButton onClick={handleClose} style={{ position: 'absolute', top: 0, left: 0 }}><Close /></IconButton>
      </DialogContent>
    </Dialog>

  );
};

export default MapPopUp;




























// import * as React from 'react';
// import {
//     Dialog, DialogTitle, DialogContent, DialogActions,
//     Box,
//     Button,
//     Grid,
//     GridProps,
//     Stack,
//     TextField,
//     Typography,
//     GridItem
//   } from "@mui/material";
//   import { useState } from "react";
//   import { useForm } from "react-hook-form";

// export default function MapPopUp({ isOpen, handleClose }) {
//   const [open, setOpen] = React.useState(true);

// //   const handleClickOpen = () => {
// //     setOpen(true);
// //   };

// //   const handleClose = () => {
// //     setOpen(false);
// //   };
// // const handleClose = () => {
// //     setOpen(false);
// //   };

//   return (
//     <Dialog open={isOpen} handleClose={handleClose}>
//     <DialogTitle>Popup Dialog</DialogTitle>
//     <DialogContent>
//       This is a popup dialog.
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={handleClose}>Close</Button>
//     </DialogActions>
//   </Dialog>

//   );
// }