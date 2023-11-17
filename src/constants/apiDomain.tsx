import { Domain } from "./Domain";

export const apiDomain = (path: string) => {
    return `${Domain("admin/")}${path}`;
};
