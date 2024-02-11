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
import { formatDate } from "../../../../methods";
export default function IncomingTable() {
  const { tasksControlData } = useContext(ControlPanelContext);
  if (Array.isArray(tasksControlData?.incoming))
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>الرقم المرجعي للمنافسة</TableCell>
            <TableCell>تاريخ الورود</TableCell>
            <TableCell>نوع الطلب</TableCell>
            <TableCell>عرض</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasksControlData?.incoming.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Typography
                  component={NavLink}
                  to={`../${task.id}`}
                  variant="body2"
                  color={"primary.main"}
                  fontWeight={700}
                >
                  {task?.id}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "100px" }}>
                {formatDate(task?.created_at)}
              </TableCell>
              <TableCell>
                {task?.taskable_type.includes("OrderStepForm")
                  ? "فحص تربة"
                  : ""}
              </TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  component={NavLink}
                  to={`../${task.id}`}
                >
                  <VisibilityOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  else if (tasksControlData?.incoming === "loading")
    return <LoadingTable rows={5} cols={4} />;
  else if (tasksControlData?.incoming === "empty")
    return <NotFound title="لا يوجد مهام واردة" />;
  else return <></>;
}
