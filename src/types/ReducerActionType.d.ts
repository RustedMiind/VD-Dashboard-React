export interface ReducerAction<P, T = string> {
  type: T;
  payload: P;
}
