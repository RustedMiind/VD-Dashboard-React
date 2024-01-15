import { TableCell, TableRow } from "@mui/material";
import { TenderItemStatus } from "../../../../../../types/Tenders/Status.enum";
import StatusChip from "../../../../../../components/StatusChip";
import { formatDate } from "../../../../../../methods";

function generateStatusChip(status?: TenderItemStatus): JSX.Element {
  let chip = <></>;
  if (typeof status === "number" || typeof status === "string")
    switch (status) {
      case TenderItemStatus.SENT:
        chip = <StatusChip label="مقدمة" color="warning" />;
        break;
      case TenderItemStatus.ONGOING:
        chip = <StatusChip label="جاري" color="success" />;
        break;
      case TenderItemStatus.EXCLUDED:
        chip = <StatusChip label="مستعبد  فني" color="primary" />;
        break;
      case TenderItemStatus.ENDED:
        chip = <StatusChip label="منتهي" color="error" />;
        break;
    }

  return chip;
}

function RowComponent(props: PropsType) {
  return (
    <TableRow>
      <TableCell>{props.name}</TableCell>
      <TableCell>{generateStatusChip(props.status)}</TableCell>
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
  acception?: false;
  name: string;
  endDate?: string;
  status?: TenderItemStatus;
  managerName?: string;
  accualEndDate?: string;
  iconComponent: React.ReactNode;
};

export default RowComponent;
