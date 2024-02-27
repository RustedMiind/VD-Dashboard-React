import { DataItem } from "..";
import { formatDate } from "../../../../../methods";
import { RequestDetails } from "../../../../../types/RequestDetails";

function VacationDetails({ details }: PropsType) {
  return (
    <>
      <DataItem
        label="المدة المتوقعة"
        value={details.requestable?.duration + " يوم"}
      />
      <DataItem
        label="الشخص المكلف"
        value={
          details.steps_of_approval &&
          details.steps_of_approval[0]?.employee?.name
        }
      />
      <DataItem
        label="تاريخ العودة"
        value={formatDate(details.requestable?.date)}
      />
      {/* Static */}
      <DataItem
        label="رصيد الاجازات بعد العودة"
        value={details.requestable?.vacation_credit + " يوم"}
      />
      <DataItem
        label="العنوان اثناء الاجازة"
        value={details.requestable?.address}
      />
    </>
  );
}

type PropsType = {
  details: RequestDetails;
};

export default VacationDetails;
