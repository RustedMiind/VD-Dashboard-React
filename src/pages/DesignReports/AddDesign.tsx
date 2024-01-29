import { Box, Button, Grid, GridProps, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import AddLabelToEl from '../../components/AddLabelToEl';
import { useForm } from 'react-hook-form';


const GridItem = (props: GridProps) => (<Grid sx={{ padding: '0.5rem' }} item md={6} {...props} />);

function AddDesign() {
    const { register, reset, handleSubmit } = useForm({
        defaultValues: {
            visionInArabic: "",
            visionInEnglish: "",
            arbicSummary: "",
            englishSummary: "",
            arabicFeatures: "",
            englishFeatures: "",
        },
    });
    const handleFormSubmit = handleSubmit(formData => { console.log(formData) });

    return (
        <>
            <Typography variant="h5" fontWeight={700} mb={3}>
                هيكل تصميم المباني
            </Typography>
            <Box
                className='AddDesignFormContainer'
                sx={{ width: '703px', height: '373px', padding: '1rem' }}
                component="form"
                onSubmit={handleFormSubmit}
                noValidate
                autoComplete="on">
                <Grid
                    sx={{ display: 'flex', width: '100%', height: '100%', borderRadius: '14px', bgcolor: 'primary.lightest', paddingTop: '2rem' }}
                    container rowSpacing={3}>
                    <GridItem>
                        <Stack>
                            <AddLabelToEl label="الرؤيا بالعربي" required>
                                <TextField
                                    id="outlined-name-input"
                                    type="text"
                                    required
                                    size="small"
                                    {...register("visionInArabic")}
                                    placeholder='الرؤيا بالعربي'
                                />
                            </AddLabelToEl>
                        </Stack>
                    </GridItem>
                    <GridItem>
                        <Stack>
                            <AddLabelToEl label="الرؤيا بالأنجليزي" required>
                                <TextField
                                    id="outlined-name-input"
                                    type="text"
                                    required
                                    size="small"
                                    {...register("visionInEnglish")}
                                    placeholder='الرؤيا بالأنجليزي'
                                />
                            </AddLabelToEl>
                        </Stack>
                    </GridItem>
                    <GridItem>
                        <Stack>
                            <AddLabelToEl label="نبذة عنا في مجال التصميم عربي" required>
                                <TextField
                                    id="outlined-name-input"
                                    type="text"
                                    required
                                    size="small"
                                    {...register("arbicSummary")}
                                    placeholder='نبذة عن التصميم'
                                />
                            </AddLabelToEl>
                        </Stack>
                    </GridItem>
                    <GridItem>
                        <Stack>
                            <AddLabelToEl label="نبذة عنا في مجال التصميم بالانجليزي" required>
                                <TextField
                                    id="outlined-name-input"
                                    type="text"
                                    required
                                    size="small"
                                    {...register("englishSummary")}
                                    placeholder='نبذة عن التصميم بالانجليزي'
                                />
                            </AddLabelToEl>
                        </Stack>
                    </GridItem>
                    <GridItem>
                        <Stack>
                            <AddLabelToEl label="مميزات خدمة التصميم عربي" required>
                                <TextField
                                    id="outlined-name-input"
                                    type="text"
                                    required
                                    size="small"
                                    {...register("arabicFeatures")}
                                    placeholder='المميزات'
                                />
                            </AddLabelToEl>
                        </Stack>
                    </GridItem>
                    <GridItem>
                        <Stack>
                            <AddLabelToEl label="مميزات خدمة التصميم بالانجليزي" required>
                                <TextField
                                    id="outlined-name-input"
                                    type="text"
                                    required
                                    size="small"
                                    {...register("englishFeatures")}
                                    placeholder='المميزات'
                                />
                            </AddLabelToEl>
                        </Stack>
                    </GridItem>
                </Grid>
                <Button
                    type='submit'
                    variant="contained"
                    sx={{ bgcolor: "text.primary", marginTop: '1rem', width: '100%' }}
                    size="large">
                    حفظ
                </Button>
            </Box>
        </>
    )
}

export default AddDesign