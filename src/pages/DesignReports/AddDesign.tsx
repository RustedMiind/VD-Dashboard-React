import { Box, Button, Grid, GridProps, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import AddLabelToEl from '../../components/AddLabelToEl';


const GridItem = (props: GridProps) => (<Grid style={{ padding: '0.5rem' }} item md={6} {...props} />);

function AddDesign() {
    const [visionInArabic, setVisionInArabic] = useState('');
    const [visionInEnglish, setVisionInEnglish] = useState('');
    const [arbicSummary, setArbicSummary] = useState('');
    const [englishSummary, setEnglishSummary] = useState('');
    const [arabicFeatures, setArabicFeatures] = useState('');
    const [englishFeatures, setEnglishFeatures] = useState('');


    return (
        <>
            <Typography variant="h5" fontWeight={700} mb={3}>
                هيكل تصميم المباني
            </Typography>
            <Box
                className='AddDesignFormContainer'
                style={{ width: '703px', height: '373px', padding: '1rem' }}
                component="form"
                noValidate
                autoComplete="on">
                <Grid
                    style={{ display: 'flex', width: '100%', height: '100%', borderRadius: '14px', backgroundColor: '#f3f5f7', paddingTop: '2rem' }}
                    container rowSpacing={3}>
                    <GridItem>
                        <Stack>
                            <AddLabelToEl label="الرؤيا بالعربي" required>
                                <TextField
                                    id="outlined-name-input"
                                    type="text"
                                    required
                                    size="small"
                                    value={visionInArabic}
                                    onChange={(e) => {
                                        setVisionInArabic(e.target.value)
                                    }}
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
                                    value={visionInEnglish}
                                    onChange={(e) => {
                                        setVisionInEnglish(e.target.value)
                                    }}
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
                                    value={arbicSummary}
                                    onChange={(e) => {
                                        setArbicSummary(e.target.value)
                                    }}
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
                                    value={englishSummary}
                                    onChange={(e) => {
                                        setEnglishSummary(e.target.value)
                                    }}
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
                                    value={arabicFeatures}
                                    onChange={(e) => {
                                        setArabicFeatures(e.target.value)
                                    }}
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
                                    value={englishFeatures}
                                    onChange={(e) => {
                                        setEnglishFeatures(e.target.value)
                                    }}
                                    placeholder='المميزات'
                                />
                            </AddLabelToEl>
                        </Stack>
                    </GridItem>
                </Grid>
                <Button
                    variant="contained"
                    sx={{ bgcolor: "text.primary" }}
                    style={{ marginTop: '1rem', width: '100%' }}
                    size="large">
                    حفظ
                </Button>
            </Box>
        </>
    )
}

export default AddDesign