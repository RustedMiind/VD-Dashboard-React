import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import CommonTableHead from "../CommonTableHead";
import { useContext } from "react";
import { tasksContext } from "../../../context";
import LoadingTable from "../../../../../../components/LoadingTable";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { formatDate } from "../../../../../../methods";
import { createTaskType } from "../../../../../../types/Tasks/Type.enum";
import { NavLink } from "react-router-dom";

function OngoingTasks() {
  const { status, ongoingTasks } = useContext(tasksContext);

  return (
    <Stack>
      {status === "loading" && <LoadingTable height={600} />}
      {status === "none" && (
        <TableContainer component={Paper} sx={{ minHeight: 600 }}>
          <Table stickyHeader sx={{ maxHeight: 600 }}>
            <CommonTableHead />
            <TableBody>
              {ongoingTasks?.map((task) => {
                const { name, route } = createTaskType(task.taskable_type);
                return (
                  <TableRow>
                    <TableCell>{task.id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{task.refrence_number}</TableCell>
                    <TableCell>{formatDate(task.created_at)}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <IconButton
                        component={NavLink}
                        to={route(task.taskable_id)}
                      >
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}

export default OngoingTasks;
