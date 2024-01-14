import { FetchStatusEnum } from "./FetchStatusEnum";

export type FetchStatus<T = string> = T | FetchStatusEnum;
