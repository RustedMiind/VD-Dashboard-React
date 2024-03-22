import { DataItem } from "..";
import { RequestDetails } from "../../../../../types/RequestDetails";

function WorkNeeds({ details }: PropsType) {
  if (
    details.requestable !== undefined &&
    Array.isArray(details?.requestable.details)
  ) {
    return (
      <>
        <DataItem
          label="الشخص المكلف"
          value={
            details.steps_of_approval &&
            details.steps_of_approval[0]?.employee?.name
          }
        />
        <DataItem
          label="الكمية"
          value={details.requestable.details[0]?.quantity}
        />
        <DataItem label="السعر" value={details.requestable.details[0].price} />
        <DataItem
          label="البيان"
          value={details.requestable?.details[0]?.statement}
        />
      </>
    );
  } else {
    return <></>;
  }
}

type PropsType = {
  details: RequestDetails;
};

export default WorkNeeds;
