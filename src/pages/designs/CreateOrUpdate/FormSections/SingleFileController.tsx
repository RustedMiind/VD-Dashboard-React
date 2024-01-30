import { Box, Button, Grid, GridProps, MenuItem, Select, Stack, TextField } from "@mui/material";
import { GridItemTextInputWithLabel } from "..";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useEffect, useState } from "react";
import axios from "axios";

type optionType = {
    id: number,
    name: string
}

function SingleAttachedFileController(props: PropsType) {
    const [options, setOptions] = useState<optionType[]>([]);

    useEffect(() => {
        // TODO::fetch options data
        axios.get('https://visiondimensions.com/api/client/design/attachment-option', {
            headers: {
                Accept: 'application/json',
                from: "website"
            }
        })
            .then(res => {
                return res?.data?.attachments_type;
            }).then(data => {
                let _arr: optionType[] = [];
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        _arr.push({ id: data[key], name: key });
                    }
                }
                console.log("response data ", data, _arr);
                setOptions(_arr);
            }).catch(err => {
                console.log("error in fetch options data:", err);
            });
    }, []);

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
                                <MenuItem key={option.id} value={option.id}>
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