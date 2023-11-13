import { FormControl, Modal } from '@mui/base';
import { Box, Button, FormControlLabel, Paper, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    textAlign: 'center'
};
export default function ContractsNotFound() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Stack>
            <Typography variant="h5" fontWeight={600} mb={3}>
                بيانات العقود
            </Typography>
            <Paper sx={{ height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack>
                    <Typography sx={{ fontSize: '28px', fontWeight: '700' }}>
                        لا يوجد لم  يتم البدء في عمل التعاقدات
                    </Typography>
                    <Button
                        variant='contained'
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleOpen}
                        sx={{ width: '50%', mx: 'auto', mt: 4 }}
                    >
                        انشاء عقد جديد
                    </Button>
                    <div>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"

                        >
                            <Box sx={style}>
                                <Button onClick={() => setOpen(!open)} sx={{ position: 'absolute', right: 0 }} startIcon={<CloseIcon />} ></Button>
                                <Typography sx={{ fontWeight: "bold", my: 5 }} id="spring-modal-title" variant="h5" component="h2">
                                    انشاء عقد جديد
                                </Typography>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        sx={{ display: 'flex', justifyContent: 'center' }}

                                    >
                                        <FormControlLabel disabled value="عرض السعر" control={<Radio />} label="عرض السعر" />
                                        <FormControlLabel disabled value="تعميد" control={<Radio />} label="تعميد" />
                                        <FormControlLabel disabled value="ملحق عقد" control={<Radio />} label="ملحق عقد" />
                                        <FormControlLabel value="ادخال مباشر" control={<Radio />} label="ادخال مباشر" />
                                    </RadioGroup>
                                </FormControl>
                                <Button
                                    variant='contained'
                                    component={NavLink}
                                    to={'create'}
                                    sx={{ my: 5 }}
                                >
                                    الذهاب لصفحة الادخال المباشر
                                </Button>
                            </Box>
                        </Modal>
                    </div>


                </Stack>
            </Paper >

        </Stack >
    );
}
