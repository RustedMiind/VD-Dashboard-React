export enum TaskType {
  TENDER = "tender",
  SOIL = "soil-request",
  CLIENT_REQUEST = "client-request",
  EMPLOYEE_REQUEST = "employee-request",
  CONTRACTS = "contract",
}

export function createTaskType(type: TaskType): {
  name: string;
  route: (path?: string | number) => string;
} {
  switch (type) {
    case TaskType.TENDER:
      return {
        name: "منافسة",
        route(path) {
          return `/react/tenders/` + path;
        },
      };
    case TaskType.SOIL:
      return {
        name: "التربة",
        route(path) {
          return `/react/services/soil/showtask/` + path;
        },
      };
    case TaskType.CLIENT_REQUEST:
      return {
        name: "طلبات العملاء",
        route(path) {
          return `/react/clients/requests/`;
        },
      };
    case TaskType.EMPLOYEE_REQUEST:
      return {
        name: "طلبات الموظفين",
        route(path) {
          return `/react/employees/requests/${path}`;
        },
      };
    case TaskType.CONTRACTS:
      return {
        name: "العقود",
        route(path) {
          return `/react/employees/contracts/details/${path}`;
        },
      };
    default:
      return {
        name: "unkn",
        route(path) {
          return `/`;
        },
      };
  }
}
