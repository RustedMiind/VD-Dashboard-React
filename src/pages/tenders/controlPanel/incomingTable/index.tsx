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
import { useContext, useEffect } from "react";
import LoadingTable from "../../../../components/LoadingTable";
import NotFound from "../../../../components/NotFound";
import { NavLink } from "react-router-dom";
import { formatDate } from "../../../../methods";
import { TaskType } from "../../../../types/Tasks/Type.enum";
export default function IncomingTable() {
  const { tasksControlData } = useContext(ControlPanelContext);
  const handleType = (type: string | undefined): JSX.Element => {
    let typo: JSX.Element = <></>;
    switch (type) {
      case TaskType.SOIL:
        typo = <Typography>فحص تربة</Typography>;
        break;
      case TaskType.CLIENT_REQUEST:
        typo = <Typography>طلبات الموظفين</Typography>;
        break;
      case TaskType.EMPLOYEE_REQUEST:
        typo = <Typography>طلبات العملاء</Typography>;
        break;
      case TaskType.TENDER:
        typo = <Typography>العقود</Typography>;
        break;
      default:
        type = "";
        break;
    }
    return typo;
  };
  const handleNavigation = (type?: string, id?: number): string => {
    let url: string = "";
    switch (type) {
      case TaskType.SOIL:
        url = `../../services/soil/show/${id}`;
        break;
      // case TaskType.CLIENT_REQUEST:
      //   url = `../../services/soil/show/${id}`;
      //   break;
      // case TaskType.EMPLOYEE_REQUEST:
      //   url = `../../services/soil/show/${id}`;
      //   break;
      // case TaskType.TENDER:
      //   url = `../../services/soil/show/${id}`;
      //   break;
      default:
        url = "";
        break;
    }
    return url;
  };
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
              <TableCell>{handleType(task?.taskable_type)}</TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  component={NavLink}
                  to={handleNavigation(task?.taskable_type, task?.id)}
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
