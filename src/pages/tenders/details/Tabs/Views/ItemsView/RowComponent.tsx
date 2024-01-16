import { TableCell, TableRow } from "@mui/material";
import { formatDate } from "../../../../../../methods";

function RowComponent(props: PropsType) {
  return (
    <TableRow>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.statusComponent}</TableCell>
      <TableCell>{props.managerName}</TableCell>
      <TableCell>{props.endDate ? formatDate(props.endDate) : "-"}</TableCell>
      <TableCell>
        {props.accualEndDate ? formatDate(props.accualEndDate) : "-"}
      </TableCell>
      <TableCell>{props.iconComponent}</TableCell>
    </TableRow>
  );
}

type PropsType = {
  name: string;
  endDate?: string;
  statusComponent?: React.ReactNode;
  managerName?: string;
  accualEndDate?: string;
  iconComponent: React.ReactNode;
};

export default RowComponent;
