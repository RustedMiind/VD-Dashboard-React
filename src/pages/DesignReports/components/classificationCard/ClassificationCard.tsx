import React from 'react'
import { Button, ButtonBase, Typography } from '@mui/material';

function ClassificationCard(props: PropsType) {
    // extract props data
    let title: string = props.title;
    let count: number = props.count;
    let currentTab: string = props.currentTab;

    return (
        <ButtonBase
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', bgcolor: title === currentTab ? 'primary.main' : 'primary.lightest', borderRadius: '12px', border: '1px solid priimary.main', width: '353.31px', height: '87px', color: title !== currentTab ? 'primary.main' : 'primary.contrastText', cursor: 'pointer' }}
            onClick={() => props.handleChangeTitle(title)}>
            <Typography variant="h6" fontWeight={700} fontSize={14}>
                {title}
            </Typography>
            <Typography sx={{ color: title !== currentTab ? 'secondary.main' : 'primary.contrastText' }} fontWeight={700}>
                {count}
            </Typography>

        </ButtonBase>
    )
}

type PropsType = {
    title: string;
    count: number;
    currentTab: string;
    handleChangeTitle: (v: string) => void
};
export default ClassificationCard