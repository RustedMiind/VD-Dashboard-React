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
import { TaskStatusType, tasksContext } from "../../../context";
import CommonTableHead from "./CommonTableHead";
import LoadingTable from "../../../../../../components/LoadingTable";
import { formatDate } from "../../../../../../methods";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { createTaskType } from "../../../../../../types/Tasks/Type.enum";
import { NavLink } from "react-router-dom";
import { EmployeeTask } from "../../../../../../types/Tasks";
import CommonTableBody from "./CommonTableBody";

function CommonTasksTable({ status, tasks }: PropsType) {
  return (
    <Stack>
      {status === "loading" && <LoadingTable height={600} />}
      {status === "none" && (
        <TableContainer component={Paper} sx={{ minHeight: 600 }}>
          <Table stickyHeader sx={{ maxHeight: 600 }}>
            <CommonTableHead />
            <CommonTableBody tasks={tasks} />
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}

type PropsType = {
  tasks?: EmployeeTask[];
  status: TaskStatusType;
};

export default CommonTasksTable;
