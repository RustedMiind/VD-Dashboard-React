import { Domain } from "./Domain";

export const AdminUrl = (path: string) => {
  return `${Domain("admin/")}${path}`;
};
