import { Box, Button, Grid, GridProps, MenuItem, Select, Stack, TextField } from "@mui/material";
import { GridItemTextInputWithLabel } from "..";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useState } from "react";
import SingleAttachedFileController from "./SingleFileController";
const options: { value: number, name: string }[] = [
    { value: -1, name: "أختر" },
    { value: 1, name: "مرفق 1" },
    { value: 2, name: "مرفق 2" },
    { value: 3, name: "مرفق 3" }
];

function AttachedFilesController() {
    const [files, setFiles] = useState<{ id: String, file: string, option: number }[]>([
        { id: 'f-1', file: 'مرفق 101', option: 2 }
    ]);
    const [fileName, setFileName] = useState('');
    const [fileOption, setFileOption] = useState(-1);

    const HandleSetFiles = () => {
        console.log(fileName, fileOption);
        setFiles(prev => ([...prev, { id: `p-${prev.length + 1}`, file: fileName, option: fileOption }]));
        setFileName('');
        setFileOption(-1);
    }
    return (
        <>
            {
                files.map(_file => {
                    return <SingleAttachedFileController fileName={_file.file} option={_file.option} abilityToAdd={false} />
                })
            }
            <Grid container sx={{ boxSizing: 'border-box', display: 'flex', alignItems: 'center' }}>
                <Grid item md={6}>
                    <AddLabelToEl label="اسم الملف" required>
                        <TextField
                            id="outlined-name-input"
                            type="text"
                            required
                            size="small"
                            value={fileName}
                            onChange={e => setFileName(e.target.value)}
                            placeholder='اسم الملف'
                        />
                    </AddLabelToEl>
                </Grid>
                <Grid item md={3} sx={{ padding: '0 0.3rem' }}>
                    <AddLabelToEl label="المرفقات">
                        <Select size='small' value={fileOption} onChange={e => setFileOption(+e.target.value)} sx={{ color: '#000' }}>
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </AddLabelToEl>
                </Grid>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        sx={{ bgcolor: "primary.main", marginTop: '1.6rem' }}
                        size="large"
                        onClick={HandleSetFiles}
                        endIcon={<AddBoxOutlinedIcon />}
                    >
                        إضافة مرفق
                    </Button>
                </Grid>
            </Grid>

        </>
    );
};

export default AttachedFilesController;