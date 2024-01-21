import { TenderItemStatus } from "../../../../../../types/Tenders/Status.enum";
import StatusChip from "../../../../../../components/StatusChip";
import RowComponent from "./RowComponent";

function generateStatusChip(status?: TenderItemStatus): JSX.Element {
  let chip = <></>;
  if (typeof status === "number" || typeof status === "string")
    switch (status) {
      case TenderItemStatus.PENDING:
        chip = <StatusChip label="لم تبدأ" disabled color="default" />;
        break;
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

function StatusRowComponent(props: PropsType) {
  return (
    <RowComponent
      iconComponent={props.iconComponent}
      name={props.name}
      accualEndDate={props.accualEndDate}
      endDate={props.endDate}
      managerName={props.managerName}
      statusComponent={generateStatusChip(props.status)}
    />
  );
}

type PropsType = {
  name: string;
  endDate?: string;
  status?: TenderItemStatus;
  managerName?: string;
  accualEndDate?: string;
  iconComponent: React.ReactNode;
};

export default StatusRowComponent;
