import { ReducerAction } from "../../types";

export function generateReducerAction<P, T>(
  type: T,
  payload: P
): ReducerAction<P, T> {
  return { type, payload };
}

export default generateReducerAction;
