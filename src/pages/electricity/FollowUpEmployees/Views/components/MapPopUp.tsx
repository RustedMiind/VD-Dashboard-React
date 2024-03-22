import React from 'react';
import { Dialog, DialogContent, Typography, RadioGroup, FormControlLabel, Radio, TextField, IconButton, Button, Grid } from '@mui/material';
import { Close, Phone, CameraAlt, Chat, LocationOn } from '@mui/icons-material';
import { marker } from 'leaflet';
type MapPopUpProps = {
  isOpen: boolean;
  handleClose: () => void;
  marker?: { 
    reference_number: string;
    expected_cost: string;
    latitude: string;
    longitude: string;
    status: number;
    period: number;
    created_at: string;
    contractor: {
      id: number;
      name: string;
      phone: string;
      email: string;
      created_at: string;
      updated_at: string;
    }
    id: number;  costable_id: number; label: string ;
    type_work_instruction: {
    id: number;
    reference_number: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };} | null;
};


const MapPopUp: React.FC<MapPopUpProps> = ({ isOpen, handleClose, marker }) => {
  if (!marker) {
    return null;
  }
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>
        <Typography variant="h5" align="center">فلتر البحث</Typography>
        <Grid container spacing={2} sx={{ mb: 2, marginTop: '5px' }}>
          <Grid item xs={6}>
            <TextField
              label="الرقم المرجعي"
              variant="outlined"
              fullWidth
              disabled
              value={marker.reference_number}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="نوع أمر العمل"
              variant="outlined"
              fullWidth
              disabled
              value={marker.type_work_instruction ? marker.type_work_instruction.name : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="وصف أمر العمل"
              variant="outlined"
              fullWidth
              disabled
              value={marker.type_work_instruction ? marker.type_work_instruction.description : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="التكلفة التقديرية"
              variant="outlined"
              fullWidth
              disabled
              value={marker.expected_cost}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="الاحداثيات "
              variant="outlined"
              fullWidth
              disabled
              value={`Longitude: ${marker.longitude} - Latitude: ${marker.latitude} `}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="المقاول"
              variant="outlined"
              fullWidth
              disabled
              value={marker.contractor ? marker.contractor.name : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="حالة أمر العمل"
              variant="outlined"
              fullWidth
              disabled
              value={marker.status}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="المدة"
              variant="outlined"
              fullWidth
              disabled
              value={marker.period}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="تاريخ الاسناد"
              variant="outlined"
              fullWidth
              disabled
              value={marker.created_at}
            />
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











