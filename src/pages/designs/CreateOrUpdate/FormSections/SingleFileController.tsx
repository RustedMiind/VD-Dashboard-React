import { Box, Button, Grid, GridProps, MenuItem, Select, Stack, TextField } from "@mui/material";
import { GridItemTextInputWithLabel } from "..";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const options: { value: number, name: string }[] = [
    { value: 1, name: "مرفق 1" },
    { value: 2, name: "مرفق 2" },
    { value: 3, name: "مرفق 3" }
];

function SingleAttachedFileController(props: PropsType) {
    return (
        <>
            <Grid container sx={{ boxSizing: 'border-box', display: 'flex', alignItems: 'center' }}>
                <Grid item md={6}>
                    <AddLabelToEl label="اسم الملف" required>
                        <TextField
                            id="outlined-name-input"
                            type="text"
                            required
                            size="small"
                            value={props.fileName}
                            placeholder='اسم الملف'
                        />
                    </AddLabelToEl>
                </Grid>
                <Grid item md={3} sx={{ padding: '0 0.3rem' }}>
                    <AddLabelToEl label="المرفقات">
                        <Select size='small' value={props.option} sx={{ color: '#000' }}>
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </AddLabelToEl>
                </Grid>
            </Grid>
        </>
    );
};
type PropsType = {
    fileName: string,
    option: number,
    abilityToAdd: boolean,
}
export default SingleAttachedFileController;