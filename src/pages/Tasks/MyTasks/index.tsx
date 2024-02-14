import { Stack } from "@mui/material";
import Tabs from "./Tabs";
import TasksContextProvider from "./context";
import Filters from "./Filters";
import ProgressSection from "./Progress";

function MyTasks() {
  return (
    <TasksContextProvider>
      <Component />
    </TasksContextProvider>
  );
}

function Component() {
  return (
    <Stack spacing={3}>
      {/* Filters Component */}
      <Filters />
      {/* Tabs */}
      <Tabs />
      {/* Progress Bar Component */}
      <ProgressSection incoming={5} ongoing={15} />
    </Stack>
  );
}

export default MyTasks;
