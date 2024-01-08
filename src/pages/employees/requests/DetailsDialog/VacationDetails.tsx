import DataInputLike from "../../../../components/DataInputLike";
import { formatDate } from "../../../../methods";
import { RequestDetails } from "../../../../types/RequestDetails";

function VacationDetails({ details }: PropsType) {
  return (
    <>
      <DataInputLike
        title="المدة المتوقعة"
        value={details.requestable?.duration + " يوم"}
      />
      <DataInputLike
        title="الشخص المكلف"
        cols={12}
        value={
          details.steps_of_approval &&
          details.steps_of_approval[0]?.employee?.name
        }
      />
      <DataInputLike
        title="تاريخ العودة"
        value={formatDate(details.requestable?.date)}
      />
      {/* Static */}
      <DataInputLike
        title="رصيد الاجازات بعد العودة"
        value={details.requestable?.vacation_credit + " يوم"}
      />
      <DataInputLike
        title="العنوان اثناء الاجازة"
        cols={12}
        value={details.requestable?.address}
      />
    </>
  );
}

type PropsType = {
  details: RequestDetails;
};

export default VacationDetails;
