import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ControlPanelContext } from "../controlPanelContext";
import { useContext } from "react";
import LoadingTable from "../../../../components/LoadingTable";
import NotFound from "../../../../components/NotFound";
import { NavLink } from "react-router-dom";
export default function IncomingTable() {
  const { tenderControlData } = useContext(ControlPanelContext);
  if (Array.isArray(tenderControlData?.incoming))
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>الرقم المرجعي للمنافسة</TableCell>
            <TableCell>تاريخ الورود</TableCell>
            <TableCell>اسم المنافسة</TableCell>
            <TableCell>مدة العقد</TableCell>
            <TableCell> تاريخ الانتهاء </TableCell>
            <TableCell>عرض</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tenderControlData?.incoming.map((tender) => (
            <TableRow key={tender.id}>
              <TableCell>
                <Typography
                  component={NavLink}
                  to={`../${tender.id}`}
                  variant="body2"
                  color={"primary.main"}
                  fontWeight={700}
                >
                  {tender.tenderdata?.code_reference}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "100px" }}>
                {tender.tenderdata?.strat_date}
              </TableCell>
              <TableCell>{tender.tenderdata?.name}</TableCell>
              <TableCell>{tender.tenderdata?.period}</TableCell>
              <TableCell>{tender.tenderdata?.end_date}</TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  component={NavLink}
                  to={`../${tender.id}`}
                >
                  <VisibilityOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  else if (tenderControlData?.incoming === "loading")
    return <LoadingTable rows={5} cols={6} />;
  else if (tenderControlData?.incoming === "empty")
    return <NotFound title="لا يوجد منافسات واردة" />;
  else return <></>;
}
