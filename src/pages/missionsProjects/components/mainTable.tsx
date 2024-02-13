import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
} from "@mui/material";
import { useState } from "react";

// icons
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { formatDate } from "../../../methods";

type missionType = {
  id: string;
  incommingNumber: number;
  serviceType: string;
  referenceNumber: string;
  clientNumber: number;
  clientName: string;
  incommingDate: string;
  finishDate: string;
  prevState: string;
  responsibleName: string;
};

/*
  -1 pending
  1 active
  0 rejected
  */

function MissionsDataTable(props: PropsType) {
  const [rowsCount] = useState(10);
  const missions = props.missions.slice(0, rowsCount);

  return (
    <>
      <TableContainer
        sx={{
          minHeight: 500,
          margin: "1rem auto",
          height: "343px",
          borderRadius: "12px",
          backgroundColor: "#f3f5f7",
          padding: "1rem",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>رقم الوارد</TableCell>
              <TableCell>نوع الخدمة</TableCell>
              <TableCell>الرقم المرجعي</TableCell>
              <TableCell>رقم العميل</TableCell>
              <TableCell>اسم العميل</TableCell>
              <TableCell>تاريخ الوارد</TableCell>
              <TableCell>تاريخ الانتهاء</TableCell>
              <TableCell>الحالة السابقة</TableCell>
              <TableCell>أسم المسئول</TableCell>
              <TableCell>عرض</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {missions.map((mission) => {
              return (
                <TableRow key={mission.id}>
                  <TableCell>{mission.incommingNumber}</TableCell>
                  <TableCell>{mission.serviceType}</TableCell>
                  <TableCell>{mission.referenceNumber}</TableCell>
                  <TableCell>{mission.clientNumber}</TableCell>
                  <TableCell>{mission.clientName}</TableCell>
                  <TableCell>{formatDate(mission.incommingDate)}</TableCell>
                  <TableCell>{formatDate(mission.finishDate)}</TableCell>
                  <TableCell>{mission.prevState}</TableCell>
                  <TableCell>{mission.responsibleName}</TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <VisibilityOutlinedIcon sx={{ color: "primary.main" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {props.missions.length === 0 && (
          <Typography variant="h5" textAlign="center" p={2} py={4}>
            لا يوجد بيانات
          </Typography>
        )}
      </TableContainer>
    </>
  );
}

type PropsType = {
  missions: missionType[];
};

export default MissionsDataTable;
