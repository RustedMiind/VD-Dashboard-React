import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import { useState } from "react";
import { formatDate } from "../../../../methods";

// icons
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

type DesignReportType = {
    id: string,
    name: string,
    type: string,
    price: number,
    date: string,
    buyerName: string
}

/*
-1 pending
1 active
0 rejected
*/

function DesignReportsTable(props: PropsType) {
    const [rowsCount] = useState(10);
    const toView = props.designReports.slice(0, rowsCount);

    return (
        <>
            <TableContainer sx={{ minHeight: 500, margin: '3rem auto', height: '343px', borderRadius: '12px', backgroundColor: '#f3f5f7', padding: '1rem' }} >
                <Typography variant="h6" fontWeight={700} mb={3}>
                    {props.title}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<PrintOutlinedIcon />}
                    sx={{ bgcolor: "text.primary" }}
                    style={{ float: 'left', marginBottom: '0.3rem' }}
                    size="large">
                    طباعة التقرير
                </Button>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>اسم التصميم</TableCell>
                            <TableCell>نوع المبني</TableCell>
                            <TableCell>السعر</TableCell>
                            <TableCell>تاريخ الطلب</TableCell>
                            <TableCell>اسم المشتري</TableCell>
                            <TableCell>الأعدادات</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {toView.map((desugnReport, index) => {
                            return (
                                <TableRow key={desugnReport.id}>
                                    <TableCell>{desugnReport.name}</TableCell>
                                    <TableCell>{desugnReport.type}</TableCell>
                                    <TableCell>{desugnReport.price}</TableCell>
                                    <TableCell>{formatDate(desugnReport.date)}</TableCell>
                                    <TableCell>{desugnReport.buyerName}</TableCell>
                                    <TableCell>
                                        <IconButton size="small">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton size="small">
                                            <SendOutlinedIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                {props.designReports.length === 0 && (
                    <Typography variant="h5" textAlign="center" p={2} py={4}>
                        لم يتم ايجاد اي من الطلبات المطلوبة
                    </Typography>
                )}
            </TableContainer>
        </>
    );
}

type PropsType = {
    designReports: DesignReportType[];
    title: string
};

export default DesignReportsTable;
