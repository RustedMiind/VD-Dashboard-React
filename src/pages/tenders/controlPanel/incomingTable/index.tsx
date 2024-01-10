import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ControlPanelContext } from "../controlPanelContext";
import { useContext } from "react";
export default function IncomingTable() {
  const { tenderControlData } = useContext(ControlPanelContext);

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
        {typeof tenderControlData === "object" &&
          tenderControlData.incoming.length > 0 &&
          tenderControlData.incoming.map((tender) => (
            <TableRow key={tender.id}>
              <TableCell>{tender.tenderdata?.code_reference}</TableCell>
              <TableCell sx={{ width: "100px" }}>
                {tender.tenderdata?.strat_date}
              </TableCell>
              <TableCell>{tender.tenderdata?.name}</TableCell>
              <TableCell>{tender.tenderdata?.period}</TableCell>
              <TableCell>{tender.tenderdata?.end_date}</TableCell>
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
}
