import DataInputLike from "../../../../components/DataInputLike";
import { formatDate } from "../../../../methods";
import { RequestDetails } from "../../../../types/RequestDetails";

function VacationDetails({ details }: PropsType) {
  return (
    <>
      <DataInputLike
        title="المدة المتوقعة"
        value={details.requestable?.duration}
      />
      <DataInputLike
        title="تاريخ العودة"
        value={formatDate(details.requestable?.date)}
      />
      {/* Static */}
      <DataInputLike
        title="رصيد الاجازات بعد العودة"
        value={details.requestable?.vacation_credit}
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
