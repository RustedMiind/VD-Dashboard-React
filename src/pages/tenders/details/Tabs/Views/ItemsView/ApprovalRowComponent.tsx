import { TenderApprovalStatus } from "../../../../../../types/Tenders/Status.enum";
import StatusChip from "../../../../../../components/StatusChip";
import RowComponent from "./RowComponent";

function generateStatusChip(status?: TenderApprovalStatus): JSX.Element {
  let chip = <></>;
  if (typeof status === "number" || typeof status === "string")
    switch (status) {
      case TenderApprovalStatus.ACCEPTED:
        chip = <StatusChip label="مقبولة" color="success" />;
        break;
      case TenderApprovalStatus.REJECTED:
        chip = <StatusChip label="مرفوضة" color="error" />;
        break;
    }

  return chip;
}

function ApprovalRowComponent(props: PropsType) {
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
  status?: TenderApprovalStatus;
  managerName?: string;
  accualEndDate?: string;
  iconComponent: React.ReactNode;
};

export default ApprovalRowComponent;
