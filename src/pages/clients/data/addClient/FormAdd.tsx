import { Stack, Typography, Box, Tabs, Tab, Paper, Button, TextField, Input } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
export default function FormAdd(props: FormProps) {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Box sx={{ display: "flex", mb: 1 }}>
                <Stack>
                    <Typography sx={{ ml: 2 }} component='label'>
                        {props.typeAdd == 'فرد' ? 'اسم العميل *' : 'اسم الشركه *'}
                    </Typography>
                    <TextField
                        id="outlined-name-input"
                        type="text"
                        required
                        size="small"
                    />
                </Stack>
                <Stack sx={{ ml: 4 }}>
                    <Typography sx={{ ml: 2 }} component='label'>
                        رقم الهويه *
                    </Typography>
                    <TextField
                        id="outlined-idNumber-input"
                        type="number"
                        required
                        size="small"
                    />
                </Stack>
            </Box>
            <Box sx={{ display: "flex", mb: 1 }}>
                <Stack>
                    <Typography sx={{ ml: 2 }} component='label'>
                        رقم الجوال *
                    </Typography>
                    <TextField
                        id="outlined-phone-input"
                        type="number"
                        required
                        size="small"
                    />
                </Stack>
                <Stack sx={{ ml: 4 }}>
                    <Typography sx={{ ml: 2 }} component='label'>
                        البريد الالكتروني
                    </Typography>
                    <TextField
                        id="outlined-email-input"
                        type="email"
                        required
                        size="small"
                    />
                </Stack>

            </Box>
            <Box sx={{ display: "flex", mb: 1 }}>
                <Stack>
                    <Typography sx={{ ml: 2 }} component='label'>
                        الفرع *
                    </Typography>
                    <TextField
                        id="outlined-branch-input"
                        type="text"
                        required
                        size="small"
                    />
                </Stack>
                <Stack sx={{ ml: 4 }}>
                    <Typography sx={{ ml: 2 }} component='label'>
                        الوسيط
                    </Typography>
                    <TextField
                        id="outlined-mediator-input"
                        type="text"
                        required
                        size="small"
                    />
                </Stack>
            </Box>
            <Box sx={{ display: "flex", mb: 1 }}>
                <Stack>
                    <Typography sx={{ ml: 2 }} component='label'>
                        عنوان المراسلات
                    </Typography>
                    <TextField
                        id="outlined-address-input"
                        type="text"
                        required
                        size="small"
                    />
                </Stack>
                <Stack sx={{ ml: 4 }}>
                    <Typography sx={{ ml: 2 }} component='label'>
                        ارفاق صورة الهويه
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload file
                            <VisuallyHiddenInput type="file" />
                        </Button>
                    </Box>
                </Stack>
            </Box>
            <Button type="submit" variant="contained">حفظ</Button>
        </Box >
    )
}

type FormProps = { typeAdd: string }