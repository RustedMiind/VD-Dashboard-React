import { Box, Button, FormControl, FormControlLabel, Paper, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';
import { NavLink } from 'react-router-dom';
interface FadeProps {
    children: React.ReactElement;
    in?: boolean;
    onClick?: any;
    onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
    onExited?: (node: HTMLElement, isAppearing: boolean) => void;
    ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
    const {
        children,
        in: open,
        onClick,
        onEnter,
        onExited,
        ownerState,
        ...other
    } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter(null as any, true);
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited(null as any, true);
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {React.cloneElement(children, { onClick })}
        </animated.div>
    );
});

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '56%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
                    <Typography sx={{ fontSize: '28px', fontWeight: '700' }} >
                        لا يوجد لم  يتم البدء في عمل التعاقدات
                    </Typography>
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <div>
                            <Button variant='contained' onClick={handleOpen}>انشاء عقد جديد</Button>
                            <Modal
                                aria-labelledby="spring-modal-title"
                                aria-describedby="spring-modal-description"
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                slots={{ backdrop: Backdrop }}
                                slotProps={{
                                    backdrop: {
                                        TransitionComponent: Fade,
                                    },
                                }}
                            >
                                <Fade in={open}>
                                    <Box sx={style}>
                                        <Typography sx={{ fontWeight: "bold" }} id="spring-modal-title" variant="h5" component="h2">
                                            انشاء عقد جديد
                                        </Typography>
                                        <FormControl sx={{ py: 4 }}>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
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

                                        >
                                            الذهاب لصفحة الادخال المباشر
                                        </Button>

                                    </Box>
                                </Fade>
                            </Modal>
                        </div>
                    </Box>
                </Stack>
            </Paper >

        </Stack >
    )
}
