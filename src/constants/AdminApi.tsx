import { Api } from "./Api";

export const AdminApi = (path: string) => {
  return `${Api("admin/")}${path}`;
};
