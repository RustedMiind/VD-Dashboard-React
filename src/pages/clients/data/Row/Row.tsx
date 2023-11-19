import { TableCell } from "@mui/material";
import { ClientRequest } from "../../../../types";

function Row(props: any) {
  return <TableCell sx={props.sx}>{props.text}</TableCell>;
}

export default Row;


export type PropsType = {
  requests: ClientRequest[] | undefined;
};
