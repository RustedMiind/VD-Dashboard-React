export interface AxiosErrorType<T> {
  response?: {
    status?: number;
    data?: T;
    headers?: unknown;
  };
}
