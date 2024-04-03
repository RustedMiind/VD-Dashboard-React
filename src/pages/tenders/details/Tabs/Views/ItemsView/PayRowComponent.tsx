import {
  TenderItemStatus,
  TenderPay,
} from "../../../../../../types/Tenders/Status.enum";
import StatusChip from "../../../../../../components/StatusChip";
import RowComponent from "./RowComponent";

function generateStatusChip(status?: TenderPay): JSX.Element {
  let chip = <StatusChip label="لا اجراء" color="primary" disabled />;
  if (typeof status === "number" || typeof status === "string")
    switch (status) {
      case TenderPay.NOTPAYED:
        chip = <StatusChip label="غير مدفوعة" color="error" />;
        break;
      case TenderPay.PAYED:
        chip = <StatusChip label="مدفوعة" color="success" />;
        break;
    }

  return chip;
}

function PayRowComponent(props: PropsType) {
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
  status?: TenderPay;
  managerName?: string;
  accualEndDate?: string;
  iconComponent: React.ReactNode;
};

export default PayRowComponent;
