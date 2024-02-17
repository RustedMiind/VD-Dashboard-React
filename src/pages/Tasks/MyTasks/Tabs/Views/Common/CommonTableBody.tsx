import { IconButton, TableBody, TableCell, TableRow } from "@mui/material";
import { createTaskType } from "../../../../../../types/Tasks/Type.enum";
import dayjs from "dayjs";
import { EmployeeTask } from "../../../../../../types/Tasks";
import { NavLink } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { DateFormatString } from "../../../../../../constants/DateFormat";

function CommonTableBody({ tasks }: PropsType) {
  return (
    <TableBody>
      {tasks?.map((task) => {
        const { name, route } = createTaskType(task.taskable_type);
        return (
          <TableRow>
            <TableCell>{task.id}</TableCell>
            <TableCell>{task.detailed_type}</TableCell>
            <TableCell>{task.refrence_number}</TableCell>
            <TableCell>{task.client_name}</TableCell>
            <TableCell>
              {dayjs(task.created_at).format(DateFormatString)}
            </TableCell>
            <TableCell>
              {task.apply_date &&
                dayjs(task.apply_date).format(DateFormatString)}
            </TableCell>
            <TableCell>{task.last_status}</TableCell>
            <TableCell>{task.manager_name}</TableCell>
            <TableCell>
              <IconButton component={NavLink} to={route(task.taskable_id)}>
                <RemoveRedEyeIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}

type PropsType = {
  tasks?: EmployeeTask[];
};
export default CommonTableBody;
