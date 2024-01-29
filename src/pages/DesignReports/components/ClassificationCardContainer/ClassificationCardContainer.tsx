import { TypographyProps } from '@mui/material'

function ClassificationCardContainer(props: TypographyProps) {
    return (
        <div
            style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            {props.children}
        </div >
    )
}

export default ClassificationCardContainer