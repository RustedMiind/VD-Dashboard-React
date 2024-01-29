import { Box, TypographyProps } from '@mui/material'

function ClassificationCardContainer(props: TypographyProps) {
    return (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            {props.children}
        </Box >
    )
}

export default ClassificationCardContainer