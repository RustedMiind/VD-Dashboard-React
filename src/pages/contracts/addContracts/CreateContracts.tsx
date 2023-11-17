import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack, TextField, Typography } from "@mui/material";
import { Grid, Button } from '@mui/material';
import { Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const paddingSize = .1
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


export default function CreateContracts() {

    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <Stack>
            <Typography variant="h5" fontWeight={600} mb={3}>
                انشاء عقد ادخال مباشر
            </Typography>
            <div>
                <Accordion sx={{ mb: 3 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>بيانات العقد</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '50ch' }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Grid container  >
                                <Grid item p={paddingSize} md={6}>
                                    <Stack>
                                        <Typography sx={{ ml: 2 }} component='label'>
                                            نوع الفرع
                                        </Typography>
                                        <FormControl sx={{ m: 1, width: 470 }}>
                                            <Select
                                                size='small'
                                                multiple
                                                displayEmpty
                                                value={personName}
                                                onChange={handleChange}
                                                input={<OutlinedInput />}
                                                renderValue={(selected) => {
                                                    if (selected.length === 0) {
                                                        return <em>نوع الفرع</em>;
                                                    }

                                                    return selected.join(', ');
                                                }}
                                                MenuProps={MenuProps}
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem disabled value="">
                                                    <em>نوع الفرع</em>
                                                </MenuItem>
                                                {names.map((name) => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                        style={getStyles(name, personName, theme)}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                </Grid>
                                <Grid item p={paddingSize} md={6}>
                                    <Stack>
                                        <Typography sx={{ ml: 2 }} component='label'>
                                            الاداره
                                        </Typography>
                                        <FormControl sx={{ m: 1, width: 470 }}>
                                            <Select
                                                size='small'
                                                multiple
                                                displayEmpty
                                                value={personName}
                                                onChange={handleChange}
                                                input={<OutlinedInput />}
                                                renderValue={(selected) => {
                                                    if (selected.length === 0) {
                                                        return <em>الاداره</em>;
                                                    }

                                                    return selected.join(', ');
                                                }}
                                                MenuProps={MenuProps}
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem disabled value="">
                                                    <em>الاداره</em>
                                                </MenuItem>
                                                {names.map((name) => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                        style={getStyles(name, personName, theme)}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                </Grid>
                                <Grid item p={paddingSize} md={6}>
                                    <Stack>
                                        <Typography sx={{ ml: 2 }} component='label'>
                                            مده العقد
                                        </Typography>
                                        <TextField
                                            id="outlined-phone-input"
                                            type="text"
                                            required
                                            size="small"
                                            placeholder='مده العقد'
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item p={paddingSize} md={6}>
                                    <Stack >
                                        <Typography sx={{ ml: 2 }} component='label'>
                                            رقم العقد
                                        </Typography>
                                        <TextField
                                            id="outlined-email-input"
                                            type="text"
                                            required
                                            size="small"
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item p={paddingSize} md={6}>
                                    <Stack>
                                        <Typography sx={{ ml: 2 }} component='label'>
                                            نوع العقد
                                        </Typography>
                                        <FormControl sx={{ m: 1, width: 470 }}>
                                            <Select
                                                size='small'
                                                multiple
                                                displayEmpty
                                                value={personName}
                                                onChange={handleChange}
                                                input={<OutlinedInput />}
                                                renderValue={(selected) => {
                                                    if (selected.length === 0) {
                                                        return <em>اختر</em>;
                                                    }

                                                    return selected.join(', ');
                                                }}
                                                MenuProps={MenuProps}
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem disabled value="">
                                                    <em>اختر</em>
                                                </MenuItem>
                                                {names.map((name) => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                        style={getStyles(name, personName, theme)}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                </Grid>
                                <Grid item p={paddingSize} md={6}>
                                    <Stack>
                                        <Typography sx={{ ml: 2 }} component='label'>
                                            موضوع العقد
                                        </Typography>
                                        <TextField
                                            id="outlined-address-input"
                                            type="text"
                                            required
                                            size="small"
                                        />
                                    </Stack>
                                </Grid>




                            </Grid>

                        </Box >
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ mb: 3 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>بنود ومهام العقد</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>دفعات العقد</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor سصسضsit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

            </div>

        </Stack>
    )
}
