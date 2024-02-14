import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Api } from "../../../../constants";
import { EmployeeTask } from "../../../../types/Tasks";

export enum SearchType {
  SERVICE_TYPE = "service_type",
  REFERENCE_NUMBER = "reference_number",
  CLIENT_NAME = "client_name",
  GOVERNMENT = "government",
}

const initalTasksContext: TasksContext = {
  status: "none",
  applySearch() {},
  incomingTasks: [],
  ongoingTasks: [],
  search: "",
  searchType: SearchType.SERVICE_TYPE,
  setSearch(newSearchValue) {},
  setSearchType(newSearchType) {},
};

export const tasksContext = createContext<TasksContext>(initalTasksContext);

function TasksContextProvider({ children }: { children: React.ReactNode }) {
  const [incomingTasks, setIncomingTasks] = useState<undefined | IncomingTasks>(
    undefined
  );
  const [ongoingTasks, setOngoingTasks] = useState<undefined | OngoingTasks>(
    undefined
  );
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState<SearchType>(
    SearchType.REFERENCE_NUMBER
  );
  const [status, setStatus] = useState<StatusType>("none");

  function applySearch() {
    setStatus("loading");

    let params = {};
    if (search)
      switch (searchType) {
        case SearchType.SERVICE_TYPE:
          params = { taskable_type: search };
          break;
        case SearchType.REFERENCE_NUMBER:
          params = { refrence_number: search };
          break;
        case SearchType.CLIENT_NAME:
          params = { refrence_number: search };
          break;
        case SearchType.GOVERNMENT:
          params = { refrence_number: search };
          break;
        default:
          params = {};
          break;
      }

    axios
      .get<{
        incoming: IncomingTasks;
        is_manager: boolean;
        ongoing: OngoingTasks;
      }>(Api("employee/tender/form"), { params })
      .then(({ data }) => {
        setStatus("none");
        setIncomingTasks(data.incoming);
        setOngoingTasks(data.ongoing);
      })
      .catch((err) => {
        setStatus("error");
      });
  }

  // initially get the tasks data
  useEffect(applySearch, []);

  return (
    <tasksContext.Provider
      value={{
        applySearch,
        search,
        searchType,
        setSearch,
        setSearchType,
        incomingTasks,
        ongoingTasks,
        status,
      }}
    >
      {children}
    </tasksContext.Provider>
  );
}

type TasksContext = {
  status: StatusType;
  incomingTasks?: IncomingTasks;
  ongoingTasks?: OngoingTasks;
  search: string;
  setSearch: (newSearchValue: string) => void;
  searchType: SearchType;
  setSearchType: (newSearchType: SearchType) => void;
  applySearch: () => void;
};

type StatusType = "loading" | "error" | "none";

type IncomingTasks = EmployeeTask[];
type OngoingTasks = EmployeeTask[];

export default TasksContextProvider;
