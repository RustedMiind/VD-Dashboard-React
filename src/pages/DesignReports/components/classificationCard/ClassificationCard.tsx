import React from 'react'
import { Button, ButtonBase, Typography } from '@mui/material';

function ClassificationCard(props: PropsType) {
    // extract props data
    let title: string = props.title;
    let count: number = props.count;
    let currentTab: string = props.currentTab;

    return (
        <ButtonBase
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: title === currentTab ? '#004693' : 'aliceblue', borderRadius: '12px', border: '1px solid #004693', width: '353.31px', height: '87px', color: title !== currentTab ? '#004693' : '#fff', cursor: 'pointer' }}
            onClick={() => props.handleChangeTitle(title)}>
            <Typography variant="h6" fontWeight={700} fontSize={14}>
                {title}
            </Typography>
            <Typography style={{ color: title !== currentTab ? '#f19b02' : '#fff' }} fontWeight={700}>
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