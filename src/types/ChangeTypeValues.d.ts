export type ChangeTypeValues<T, U> = {
  [K in keyof T]: U;
};
