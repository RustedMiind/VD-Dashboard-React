import { Stack, Typography, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel, {
    FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useState } from "react";
import FormAdd from "./FormAdd";
import { Api, Domain } from "../../../constants";

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
    console.log(Api("wdcw"));

    const [typeAdd, settypeAdd] = useState<TypeAdd>('فرد')
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
            <FormAdd typeAdd={typeAdd} />
        </Stack >
    )
}

export default AddClient

export type TypeAdd = "فرد" | "شركه"