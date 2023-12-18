import { AxiosErrorType } from "./Axios";

export type LaravelValidationError<T> = {
  data: ChangeTypeValues<Partial<T>, string[]>;
  msg?: string;
};
