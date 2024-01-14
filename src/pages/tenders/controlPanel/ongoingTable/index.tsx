import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import StatusChip from "../../../../components/StatusChip";
import { useContext } from "react";
import { ControlPanelContext } from "../controlPanelContext";
import LoadingTable from "../../../../components/LoadingTable";
import NotFound from "../../../../components/NotFound";

export default function OngoingTable() {
  const { tenderControlData } = useContext(ControlPanelContext);
  if (Array.isArray(tenderControlData?.ongoing))
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "150px" }}>
              الرقم المرجعي للمنافسة
            </TableCell>
            <TableCell>اسم المنافسة</TableCell>
            <TableCell>حالة الترسية</TableCell>
            <TableCell>عرض</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tenderControlData?.ongoing.map((tender) => (
            <TableRow key={tender.id}>
              <TableCell>{tender.tenderdata?.code_reference}</TableCell>
              <TableCell>{tender.tenderdata?.name}</TableCell>
              <TableCell>
                <StatusChip label="جاري" color="success" />
              </TableCell>
              <TableCell>
                <IconButton size="small">
                  <VisibilityOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  else if (tenderControlData?.ongoing === "loading")
    return <LoadingTable rows={5} cols={6} />;
  else if (tenderControlData?.ongoing === "empty")
    return <NotFound title="لا يوجد منافسات الجارية" />;
  else return <></>;
}
