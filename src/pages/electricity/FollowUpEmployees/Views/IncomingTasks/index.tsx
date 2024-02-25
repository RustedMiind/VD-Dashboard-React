import { useContext } from "react";
import { tasksContext } from "../../context";
import CommonTasksTable from "../Common/CommonTable";

function IncomingTasks() {
  const { status, incomingTasks } = useContext(tasksContext);

  return <CommonTasksTable tasks={incomingTasks} status={status} />;
}

export default IncomingTasks;
