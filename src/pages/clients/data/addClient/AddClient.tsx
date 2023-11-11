import { Stack, Typography, Box, Tabs, Tab, Paper, Button, TextField, Input } from "@mui/material";
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel, {
    FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useState } from "react";
import FormAdd from "./FormAdd";

interface StyledFormControlLabelProps extends FormControlLabelProps {
    checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
    <FormControlLabel {...props} />
))(({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
        color: theme.palette.primary.main,
    },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
        checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
}

function AddClient() {
    const [typeAdd, settypeAdd] = useState<string>('فرد')
    console.log(typeAdd);

    return (
        <Stack>
            <Typography variant="h6" fontWeight={600} mb={3} mt={2} >
                اضافة عميل
            </Typography>
            <RadioGroup name="use-radio-group" defaultValue="فرد" >
                <Box sx={{ mb: 2 }}>
                    <MyFormControlLabel onClick={() => settypeAdd('فرد')} value="فرد" label="فرد" control={<Radio />} />
                    <MyFormControlLabel onClick={() => settypeAdd('شركه')} value="شركه" label="شركه" control={<Radio />} />
                </Box>
            </RadioGroup>
            {typeAdd === 'فرد' ?
                <FormAdd typeAdd={typeAdd} />
                :
                <FormAdd typeAdd={typeAdd} />
            }

        </Stack >
    )
}

export default AddClient

