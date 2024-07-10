import { TableBody } from "@mui/material";
import SingleRow from "./SingleRow";

export default function StandardContractTermsBodyOfDataTable(props: PropsType) {
  // TODO::declare and define component state and variables
  let { rows } = props;
  // TODO::declare and define component helper methods
  // * return UI.
  return (
    <TableBody>
      {rows.map((ele) => (
        <SingleRow key={ele} />
      ))}
    </TableBody>
  );
}

type PropsType = {
  rows: number[];
};
