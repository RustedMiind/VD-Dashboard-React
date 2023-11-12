import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack, TextField, Typography } from "@mui/material";
import { Grid, Button } from '@mui/material';
import { Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';


export default function CreateContracts() {
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
                                        <Typography component='label' sx={{ ml: 2 }}>
                                            اسم الشركه
                                        </Typography>
                                        <TextField
                                            id="outlined-name-input"
                                            type="text"
                                            required
                                            size="small"
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item p={paddingSize} md={6}>
                                    <Stack >
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
                                </Grid>
                                <Grid item p={paddingSize} md={6}>
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
                                </Grid>
                                <Grid item p={paddingSize} md={6}>
                                    <Stack >
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
                                </Grid>
                                <Grid item p={paddingSize} md={6}>
                                    <Stack>
                                        <Typography sx={{ ml: 2 }} component='label'>
                                            اسم الوكيل
                                        </Typography>
                                        <TextField
                                            id="outlined-address-input"
                                            type="text"
                                            required
                                            size="small"
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item p={paddingSize} md={6}>
                                    <Stack>
                                        <Typography sx={{ ml: 2 }} component='label'>
                                            الوسيط
                                        </Typography>
                                        <TextField
                                            id="outlined-address-input"
                                            type="text"
                                            required
                                            size="small"
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item p={paddingSize} md={6}>
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
                                </Grid>
                                <Grid item p={paddingSize} md={6}>
                                    <Stack>
                                        <Typography sx={{ ml: 2 }} component='label'>
                                            الوسيط
                                        </Typography>
                                        <TextField
                                            id="outlined-address-input"
                                            type="text"
                                            required
                                            size="small"
                                        />
                                    </Stack>
                                </Grid>

                                <Grid item p={paddingSize} md={6}>
                                    <Stack >
                                        <Typography sx={{ ml: 2 }} component='label'>
                                            ارفاق صورة الهويه
                                        </Typography>
                                        <Box sx={{ mt: 1, ml: 1 }}>
                                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                                Upload file
                                                <VisuallyHiddenInput type="file" />
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Grid>

                                <Grid item p={paddingSize} md={12} >
                                    <Stack width='100%' maxWidth="100%" >
                                        <Typography sx={{ ml: 2 }} component='label'>
                                            عنوان المراسلات
                                        </Typography>
                                        <TextField
                                            id="outlined-address-input"
                                            type="text"
                                            required
                                            size="small"
                                            fullWidth
                                        />
                                    </Stack>
                                </Grid>

                                <Grid item p={paddingSize} md={5}>
                                    <Stack>
                                        <Typography sx={{ ml: 2 }} component='label'>
                                            ارفاق صورة الهويه
                                        </Typography>
                                        <Box sx={{ mt: 1, ml: 1, }}>
                                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                                ارفاق صورة
                                                <VisuallyHiddenInput type="file" />
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Grid>
                                <Grid item p={paddingSize} md={9} sx={{ marginX: 'auto', mt: 2 }}>
                                    <Button fullWidth type="submit" variant="contained" >حفظ</Button>
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
                        <Typography>Accordion 2</Typography>
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
                        <Typography>Accordion 2</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

            </div>

        </Stack>
    )
}
