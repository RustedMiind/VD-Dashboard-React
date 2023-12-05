import DataInputLike from "../../../../components/DataInputLike";
import { formatDate, getDateDiff, msToHoursMinutes } from "../../../../methods";
import { RequestDetails } from "../../../../types/RequestDetails";

function MissionDetails({ details }: PropsType) {
  const dateFrom = new Date(Date.parse(details.requestable?.time_from || ""));
  const dateTo = new Date(Date.parse(details.requestable?.time_to || ""));
  let diffInMs: number = getDateDiff(dateFrom, dateTo);
  let timeDiff = msToHoursMinutes(diffInMs);

  return (
    <>
      <DataInputLike
        cols={6}
        title="المدة المتوقعة"
        value={timeDiff.hours + " ساعة و " + timeDiff.minutes + " دقيقة. "}
      />
      <DataInputLike
        cols={12}
        title="اسم المهمة"
        value={details.requestable?.name}
      />
      <DataInputLike
        cols={12}
        title="الشخص المكلف"
        value={details?.requestable?.responsible}
      />
      <DataInputLike
        cols={12}
        title="الموقع"
        value={details?.requestable?.address}
      />
    </>
  );
}

type PropsType = {
  details: RequestDetails;
};

export default MissionDetails;
