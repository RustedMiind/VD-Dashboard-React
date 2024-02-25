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
import CommonTableHead from "../Common/CommonTableHead";
import { useContext } from "react";
import { tasksContext } from "../../../context";
import LoadingTable from "../../../../../../components/LoadingTable";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { formatDate } from "../../../../../../methods";
import { createTaskType } from "../../../../../../types/Tasks/Type.enum";
import { NavLink } from "react-router-dom";
import CommonTasksTable from "../Common/CommonTable";

function OngoingTasks() {
  const { status, ongoingTasks } = useContext(tasksContext);

  return <CommonTasksTable tasks={ongoingTasks} status={status} />;
}

export default OngoingTasks;
