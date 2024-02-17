import { Stack } from "@mui/material";
import Tabs from "./Tabs";
import TasksContextProvider, { tasksContext } from "./context";
import Filters from "./Filters";
import ProgressSection from "./Progress";
import { useContext } from "react";

function MyTasks() {
  return (
    <TasksContextProvider>
      <Component />
    </TasksContextProvider>
  );
}

function Component() {
  const { incomingTasks, ongoingTasks } = useContext(tasksContext);

  return (
    <Stack spacing={3}>
      {/* Filters Component */}
      <Filters />
      {/* Tabs */}
      <Tabs />
      {/* Progress Bar Component */}
      <ProgressSection
        incoming={incomingTasks?.length || 0}
        ongoing={ongoingTasks?.length || 0}
      />
    </Stack>
  );
}

export default MyTasks;
