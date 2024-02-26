// React and Material-UI components
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Stack, CssBaseline } from "@mui/material";
import { Container, Paper, Box, Grid, Typography, FormControlLabel , Link, TextField, Button, Radio, RadioGroup } from '@mui/material';
// Icons
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// Leaflet and Map-related components
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker as LeafletMarker, Popup as LeafletPopup, useMapEvents } from 'react-leaflet';
import { Marker, Tooltip } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';
import markerIcon from './loc.png'; // Import custom marker icon
import MapPopUp from "../components/MapPopUp";
import MapPopUpEmployee from "../components/MapPopUpEmployee";
// Dialog
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
// Axios and other utilities
import axios from 'axios';
import { Api } from '../../../../../constants';








/* eslint-disable @typescript-eslint/no-explicit-any */
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
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
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});









export default function SignInSide(props: any ) {


  const [popupMarker, setPopupMarker] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState('orders');
  const [data, setData] = useState([]);
  const [markers, setMarkers] = useState<Marker[]>([]);

  

  const handleMarkerClick = (marker:any)=>{
    console.log("marker clicked");
    // setShowPopup(!showPopup); // Toggle the showPopup state
    setIsOpen(true);
    setSelectedMarker(marker);

    // setOpen(true);
  }
  
  const handleClose = () => {
    setIsOpen(false);
  };

  const [selectedMarker, setSelectedMarker] = useState(null);


  const handleClosePopup = () => {
    setSelectedMarker(null);
  };

  function handleClick() {
    console.log('Container clicked!');
  }

// **************************************++++++++++++++++++++++++++++++++
const [fromDate, setFromDate] = useState<Date | null>(null);
const [toDate, setToDate] = useState<Date | null>(null);
const [selectedRadio, setSelectedRadio] = useState<string>('');

const handleFromDateChange = (date: Date ) => {

  setFromDate(date);

  console.log(date);

  
  
};

const handleToDateChange = (date: Date | null) => {
  setToDate(date);
  console.log(date);

};

const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSelectedRadio(event.target.value);
};

const [searchResults, setSearchResults] = useState('');

const fetchData = async () => {
  let apiUrl = '';
  if (selectedRadio === 'orders') {
    apiUrl = 'https://visiondimensions.com/api/employee/report-work-instructions/1';
  } else if (selectedRadio === 'employees') {
    apiUrl = 'https://visiondimensions.com/api/employee/report-work-instructions/2';
  }

  try {
    const response = await axios.get(apiUrl);
    setSearchResults(response.data); // Assuming response.data is an array
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};





interface Marker {
  contractor_id: number;
  costable_id: number;
  created_at: string;
  expected_cost: string;
  id: number;
  latitude: string;
  longitude: string;
  period: number;
  real_cost: string;
  reference_number: string;
  start_date: string;
  status: number;
  type_work_instruction_id: string;
  updated_at: string;
  employee_track: {
    latitude: string;
    longitude: string;

  }
}


const fetchMapData = async () => {
  try {
    const response = await axios.get<{map_report:Marker[]}>(Api('employee/report-work-instructions/1')).then((response)=>{
      setMarkers(response.data.map_report);
      console.log(response.data);
    }).finally(()=>{});
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
console.log(markers);

  

const handleSearch = () => {
  fetchData();
  
};

useEffect(() => {
  fetchData();
  fetchMapData();
  
}, []); // Run once when the component mounts
  
const [referenceNumber, setReferenceNumber] = useState('');
const [typeName, setTypeName] = useState('');
const [description, setDescription] = useState('');
const [employeePhoneNumber, setEmployeePhoneNumber] = useState('');
const [employeeName, setEmployeeName] = useState('');
const [address, setAddress] = useState('');
const [type, setType] = useState('');
const [searchResult, setSearchResult] = useState<SearchResultItem[]>([]);
const [employeeSearchResult, setEmploeeSearchResult] = useState<SearchEmployeeResultItem[]>([]);
const [searchType, setSearchType] = useState<'orders' | 'employees'>('orders');
const [dateFrom, setDateFrom] = useState('');
const [dateTo, setDateTo] = useState('');

const handleOrderSearchButton = async () => {
  let url = 'employee/report-work-instructions/1?';
  if (referenceNumber) {
      url += `reference_number=${referenceNumber}&`;
  } 
  if (typeName) {
      url += `type_work_instruction_id=${typeName}&`;
  } 
  if (description) {
      url += `expected_cost=${description}&`;
  } 
  if (type) {
      url += `real_cost=${type}&`;
  } 
  // if (!((!referenceNumber)&&(!typeName)&&(!description)&&(!type)&&(!dateFrom)&&(!dateTo))) {
  //     setSearchResult([]);
  //     return;
  // }
      // Add date filters
      if (dateFrom) {
        const formattedDateFrom = new Date(dateFrom).toISOString().split('T')[0];
        url += `date_from=${formattedDateFrom}&`;
    }
    if (dateTo) {
        const formattedDateTo = new Date(dateTo).toISOString().split('T')[0];
        url += `date_to=${formattedDateTo}&`;
    }

    // Remove trailing '&'
    url = url.slice(0, -1);
    console.log(url);
    

  try {
      // const response = await fetch(url);
      const response = await axios.get<{map_report:SearchResultItem[]}>(Api(url)).then((response)=>{
        // setMarkers(response.data.map_report);
        console.log(response.data.map_report);
        setSearchResult(response.data.map_report);
      }).finally(()=>{});
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};
console.log(searchResult);


const handleEmployeeSearchButton = async () => {
  let url = 'employee/report-work-instructions/2?';
  if (employeePhoneNumber) {
      url += `phone=${employeePhoneNumber}&`;
  }
   if (employeeName) {
      url += `full_name=${employeeName}&`;
  } 
  if (address) {
      url += `address=${address}&`;
  } 
  
  // {
  //   setEmploeeSearchResult([]);
  //     return;
  // }
  if (dateFrom) {
    const formattedDateFrom = new Date(dateFrom).toISOString().split('T')[0];
    url += `date_from=${formattedDateFrom}&`;
}
if (dateTo) {
    const formattedDateTo = new Date(dateTo).toISOString().split('T')[0];
    url += `date_to=${formattedDateTo}&`;
}
    // Remove trailing '&'
    url = url.slice(0, -1);
    console.log(url);
    
  try {
      
      const response = await axios.get<{map_report:SearchEmployeeResultItem[]}>(Api(url)).then((response)=>{
        console.log(response.data.map_report);
        setEmploeeSearchResult(response.data.map_report);
      }).finally(()=>{});
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};
console.log(employeeSearchResult);




type SearchResultItem = {
  id: number;
  reference_number: string;
  created_at: string;
  type_work_instruction_id: string;
  start_date: string;
  
};

type SearchEmployeeResultItem = {
  id: number;
  name: string;
  phone: string;
  address: string;
  
};

const handleMarkerChange = (event:any) => {
  setSelectedOption(event.target.value);
};

const fetchMarkerData = async () => {
  let apiUrl: string = '';
  if (selectedOption === 'orders') {
      apiUrl = 'employee/report-work-instructions/1?';
  } else if (selectedOption === 'employees') {
      apiUrl = 'employee/report-work-instructions/2?';
  }
  try {
    const response = await axios.get<{map_report:Marker[]}>(Api(apiUrl)).then((response)=>{
      console.log(response.data.map_report);
      console.log(response.data.map_report);
      setMarkers(response.data.map_report);
    }).finally(()=>{});
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
console.log(markers);


useEffect(() => {
  fetchMarkerData();
  renderMarker(markers);
}, [selectedOption]);

function renderMarker(marker:any) {
  let  latitude, longitude;

  if (selectedOption === 'employees' && marker.employee_track) {
      latitude = marker.employee_track.latitude;
      longitude = marker.employee_track.longitude;
  } else {
      latitude = marker.latitude;
      longitude = marker.longitude;
  }

  // let position: number[] = [latitude, longitude];
  console.log(`latitude: ${latitude} - longitude: ${longitude}`);
  
  if (latitude === null || longitude === null || latitude == undefined || longitude == undefined ) {
    return null;
}
  return (
      <Marker
          key={marker.id}
          position= {[parseFloat(latitude), parseFloat(longitude)]}
          icon={customIcon}
          eventHandlers={{ click: () => handleMarkerClick(marker) }}
      >
          <Tooltip>
              Latitude: {latitude} - Longitude: {longitude}
          </Tooltip>
      </Marker>
  );
}


  return (
    <div>
              
        
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {selectedOption === 'orders' ? (
        <MapPopUp isOpen={isOpen} handleClose={handleClose} marker={selectedMarker} />
        ) : (
        <MapPopUpEmployee isOpen={isOpen} handleClose={handleClose} marker={selectedMarker} />
        )}

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >



<MapContainer center={[24, 45]} zoom={3} style={{ height: '500px', width: '100%' }}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {markers.map(marker => renderMarker(marker))}
</MapContainer>


  {/* {markers.map(marker => (   
    <Container key={marker.id}>

      <Marker 
      position={[parseFloat(selectedOption === 'employees' ? marker.employee_track.latitude : marker.latitude), 
      parseFloat(selectedOption === 'employees' ? marker.employee_track.longitude : marker.longitude)]}
      icon={customIcon} eventHandlers={{click: () => handleMarkerClick(marker)}}>
      <Tooltip>Latitude: {selectedOption === 'employees' ? marker.employee_track.latitude : marker.latitude} - Longitude: {selectedOption === 'employees' ? marker.employee_track.longitude : marker.longitude}</Tooltip>

      </Marker>
    </Container>
  ))} */}







    {/* position={[parseFloat(marker.latitude) , parseFloat(marker.longitude)]}  */}
  {/* <Tooltip>Latitude: {marker.latitude} - Longitude: {marker.longitude}</Tooltip> */}





          </Grid>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 0,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'right',
            }}
          >





             
<Stack>
    <Box borderBottom={1} mb={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <FilterAltIcon sx={{ mr: 1 }} />
       <Typography variant="h6" fontWeight={600} >
        فلتر
       </Typography>
      </Box>



      {/* <FormControl component="fieldset" sx={{ marginTop: 2 }}>
      <RadioGroup
        aria-label="form-selector"
        name="form-selector"
        value={selectedValue}
        onChange={handleChange}
        sx={{ flexDirection: 'row' }}
      >
        <FormControlLabel value="أوامر العمل" control={<Radio />} label="أوامر العمل" />
        <FormControlLabel value="الموظفين" control={<Radio />} label="الموظفين" />
      </RadioGroup>
      {selectedValue === 'أوامر العمل' && (
        <div>
          <TextField
            label="الرقم المرجعي"
            fullWidth
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="اسم أمر العمل"
            fullWidth
            value={typeWorkInstructionId}
            onChange={(e) => setTypeWorkInstructionId(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="وصف أمر العمل"
            fullWidth
            value={expectedCost}
            onChange={(e) => setExpectedCost(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="نوع أمر العمل"
            fullWidth
            value={realCost}
            onChange={(e) => setRealCost(e.target.value)}
            sx={{ marginTop: 2 }}
          />
        </div>
      )}
      {selectedValue === 'الموظفين' && (
        <div>
          <TextField label="رقم الجوال" fullWidth sx={{ marginTop: 2 }} />
          <TextField label="الاسم" fullWidth sx={{ marginTop: 2 }} />
          <TextField label="العنوان" fullWidth sx={{ marginTop: 2 }} />
        </div>
      )}
      <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: 2 }}>ابحث</Button>
      {searchMessage && <div>{searchMessage}</div>}
      
    </FormControl>
     
    <LocalizationProvider >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="تاريخ التقديم من"
            value={fromDate}
            onChange={handleFromDateChange}
            {...props}
            slots={{
              textField: textFieldProps => <TextField {...textFieldProps} />,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="تاريخ التقديم إلى"
            value={toDate}
            onChange={handleToDateChange}
            {...props}
            slots={{
              textField: textFieldProps => <TextField {...textFieldProps} />,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">اختر نوع البحث</FormLabel>
            <RadioGroup
              aria-label="searchType"
              name="searchType"
              value={selectedRadio}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="orders" control={<Radio />} label="أوامر العمل" />
              <FormControlLabel value="employees" control={<Radio />} label="الموظفين" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSearch}>ابحث</Button>
        </Grid>
        
        
        {Array.isArray(searchResults) && searchResults.map((result) => (
          <Grid item xs={12} key={result.id}>
            
          </Grid>
        ))}
      </Grid>
    </LocalizationProvider> */}



















<div>
            <RadioGroup
                aria-label="searchType"
                name="searchType"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'orders' | 'employees')}
            >
                <FormControlLabel value="orders" control={<Radio />} label="أوامر العمل" onChange={handleMarkerChange} checked={selectedOption === 'orders'} />
                <FormControlLabel value="employees" control={<Radio />} label="الموظفين" onChange={handleMarkerChange} checked={selectedOption === 'employees'}/>
            </RadioGroup>
            <Box mt={2}>
    {searchType === 'orders' ? (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <TextField
    id="date_from"
    label="التاريخ من"
    type="date"
    defaultValue=""
    InputLabelProps={{
        shrink: true,
    }}
    onChange={(e) => setDateFrom(e.target.value)}
    InputProps={{
        inputProps: { min: '1900-01-01', max: '2100-01-01' }
    }}
/>
<TextField
    id="date_to"
    label="التاريخ إلى"
    type="date"
    defaultValue=""
    InputLabelProps={{
        shrink: true,
    }}
    onChange={(e) => setDateTo(e.target.value)}
    InputProps={{
        inputProps: { min: '1900-01-01', max: '2100-01-01' }
    }}
/>




                <TextField
                    label="الرقم المرجعى"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                />
                <TextField
                    label="اسم أمر العمل"
                    value={typeName}
                    onChange={(e) => setTypeName(e.target.value)}
                />
                <TextField
                    label="وصف أمر العمل"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    label="نوع أمر العمل"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
            </div>
            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleOrderSearchButton}>
                    ابحث
                </Button>
            </Box>
        </div>
    ) : (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
    id="date_from"
    label="التاريخ من"
    type="date"
    defaultValue=""
    InputLabelProps={{
        shrink: true,
    }}
    onChange={(e) => setDateFrom(e.target.value)}
    InputProps={{
        inputProps: { min: '1900-01-01', max: '2100-01-01' }
    }}
/>
<TextField
    id="date_to"
    label="التاريخ إلى"
    type="date"
    defaultValue=""
    InputLabelProps={{
        shrink: true,
    }}
    onChange={(e) => setDateTo(e.target.value)}
    InputProps={{
        inputProps: { min: '1900-01-01', max: '2100-01-01' }
    }}
/>
            <TextField
                    label="رقم الجوال"
                    value={employeePhoneNumber}
                    onChange={(e) => setEmployeePhoneNumber(e.target.value)}
                />
                <TextField
                    label="الاسم"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                />
                <TextField
                    label="العنوان"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleEmployeeSearchButton}>
                    ابحث
                </Button>
            </Box>
        </div>
    )}
</Box>

{employeeSearchResult.length === 0 && searchResult.length === 0 && (
  <p>لا يوجد نتائج للبحث</p>
)}

            
            {searchResult.length === 0 ? (
              <p></p>
            ) : (
            <ul>
 {searchResult.length === 0 ? (
    <p></p>
) : (
    <Box sx={{ mt: 4 }}>
        <ul>
            {searchResult.map((item) => (
                <li key={item.id}>
                    <Box sx={{ '& > :not(style)': { mb: 2 } }}>
                        <TextField
                            label="الرقم المرجعي"
                            value={item.reference_number}
                            disabled
                        />
                        <TextField
                            label="اسم أمر العمل"
                            value={item.created_at}
                            disabled
                        />
                        <TextField
                            label="وصف أمر العمل"
                            value={item.type_work_instruction_id}
                            disabled
                        />
                        <TextField
                            label="نوع أمر العمل"
                            value={item.start_date}
                            disabled
                        />
                    </Box>
                </li>
            ))}
        </ul>
    </Box>
)}
    </ul>
)}






{employeeSearchResult.length === 0 ? (
              <p></p>
            ) : (
            <ul>
 {employeeSearchResult.length === 0 ? (
    <p></p>
) : (
    <Box sx={{ mt: 4 }}>
        <ul>
            {employeeSearchResult.map((item) => (
                <li key={item.id}>
                    <Box sx={{ '& > :not(style)': { mb: 2 } }}>
                        <TextField
                            label="رقم الجوال"
                            value={item.phone}
                            disabled
                        />
                        <TextField
                            label="الأسم"
                            value={item.name}
                            disabled
                        />
                        <TextField
                            label="العنوان"
                            value={item.address}
                            disabled
                        />

                    </Box>
                </li>
            ))}
        </ul>
    </Box>
)}
    </ul>
)}
        </div>



    </Stack>
          </Box>
        </Grid>
      </Grid>
      </div>
    
  );
}



