import { apiDomain } from "./apiDomain";

export const AdminApi = (path: string) => {
  return `${apiDomain("api/")}${path}`;
};
