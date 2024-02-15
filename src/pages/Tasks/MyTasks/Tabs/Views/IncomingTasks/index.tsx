import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useContext } from "react";
import { tasksContext } from "../../../context";
import CommonTableHead from "../CommonTableHead";
import LoadingTable from "../../../../../../components/LoadingTable";
import { formatDate } from "../../../../../../methods";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { createTaskType } from "../../../../../../types/Tasks/Type.enum";
import { NavLink } from "react-router-dom";

function IncomingTasks() {
  const { incomingTasks } = useContext(tasksContext);

  const { status } = useContext(tasksContext);

  return (
    <Stack>
      {status === "loading" && <LoadingTable height={600} />}
      {status === "none" && (
        <TableContainer component={Paper} sx={{ minHeight: 600 }}>
          <Table stickyHeader sx={{ maxHeight: 600 }}>
            <CommonTableHead />
            <TableBody>
              {incomingTasks?.map((task) => {
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

export default IncomingTasks;
