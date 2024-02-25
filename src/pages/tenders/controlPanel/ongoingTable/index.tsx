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
import { useContext } from "react";
import { ControlPanelContext } from "../controlPanelContext";
import LoadingTable from "../../../../components/LoadingTable";
import NotFound from "../../../../components/NotFound";
import { NavLink } from "react-router-dom";
import StatusOrDropdown from "./StatusOrDropdown";
import { TenderEntityStatus } from "../../../../types/Tenders/Status.enum";
import axios from "axios";
import { Api } from "../../../../constants";
import { useSnackbar } from "notistack";
import { AxiosErrorType } from "../../../../types/Axios";
import { LaravelValidationError } from "../../../../types/LaravelValidationError";
import { formatDate } from "../../../../methods";
import { TaskType } from "../../../../types/Tasks/Type.enum";

export default function OngoingTable() {
  const { tasksControlData, setTasksControlData, isManager } =
    useContext(ControlPanelContext);
  const { enqueueSnackbar } = useSnackbar();
  const handleType = (type: string | undefined): JSX.Element => {
    let typo: JSX.Element = <></>;
    switch (type) {
      case TaskType.SOIL:
        typo = <>فحص تربة</>;
        break;
      case TaskType.CLIENT_REQUEST:
        typo = <>طلبات العملاء</>;
        break;
      case TaskType.EMPLOYEE_REQUEST:
        typo = <>طلبات الموظفين</>;
        break;
      case TaskType.TENDER:
        typo = <>العقود</>;
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
        url = `../../services/soil/show/-1/${id}`;
        break;
      case TaskType.CLIENT_REQUEST:
        url = `../../clients/requests/`;
        break;
      case TaskType.EMPLOYEE_REQUEST:
        url = `../../employees/requests`;
        break;
      case TaskType.TENDER:
        url = `../../tenders/${id}`;
        break;
      default:
        url = "";
        break;
    }
    return url;
  };
  function changeTenderStatus(id: string | number) {
    return function (status: TenderEntityStatus) {
      axios
        .post(Api(`employee/tender/form/change-directorate-for-tender/${id}`), {
          status,
        })
        .then(() => {
          setTasksControlData && setTasksControlData();
          enqueueSnackbar("تم حفظ حالة الترسية بنجاح");
          console.log(setTasksControlData);
        })
        .catch((err: AxiosErrorType<LaravelValidationError<unknown>>) => {
          enqueueSnackbar(
            err.response?.data?.message ||
              err.response?.data?.msg ||
              "تعذر في تغيير حالة الترسية",
            { variant: "error" }
          );
        });
    };
  }
  if (Array.isArray(tasksControlData?.ongoing))
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>الرقم المرجعي للمنافسة</TableCell>
            <TableCell>تاريخ الورود</TableCell>
            <TableCell>نوع الطلب</TableCell>
            <TableCell>حالة الترسية</TableCell>
            <TableCell>عرض</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasksControlData?.ongoing.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Typography
                  component={NavLink}
                  to={handleNavigation(task?.taskable_type, task?.taskable_id)}
                  variant="body2"
                  color={"primary.main"}
                  fontWeight={700}
                >
                  {task?.id}
                </Typography>
              </TableCell>
              <TableCell> {formatDate(task?.created_at)}</TableCell>
              <TableCell> {handleType(task?.taskable_type)}</TableCell>

              <TableCell>
                {/* <StatusOrDropdown
                  current={task.directorate_status}
                  setCurrent={
                    isManager || !!task.eng
                      ? changeTenderStatus(task.id)
                      : undefined
                  }
                /> */}
              </TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  component={NavLink}
                  to={handleNavigation(task?.taskable_type, task?.taskable_id)}
                >
                  <VisibilityOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  else if (tasksControlData?.ongoing === "loading")
    return <LoadingTable rows={5} cols={4} />;
  else if (tasksControlData?.ongoing === "empty")
    return <NotFound title="لا يوجد معاملات الجارية" />;
  else return <></>;
}
