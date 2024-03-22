import { DataItem } from "..";
import { getDateDiff, msToHoursMinutes } from "../../../../../methods";
import { RequestDetails } from "../../../../../types/RequestDetails";

function MissionDetails({ details }: PropsType) {
  const dateFrom = new Date(Date.parse(details.requestable?.time_from || ""));
  const dateTo = new Date(Date.parse(details.requestable?.time_to || ""));
  let diffInMs: number = getDateDiff(dateFrom, dateTo);
  let timeDiff = msToHoursMinutes(diffInMs);

  return (
    <>
      <DataItem
        label="المدة المتوقعة"
        value={timeDiff.hours + " ساعة و " + timeDiff.minutes + " دقيقة. "}
      />
      <DataItem label="اسم المهمة" value={details.requestable?.name} />
      <DataItem
        label="الشخص المكلف"
        value={details?.requestable?.responsible}
      />
      <DataItem label="الموقع" value={details?.requestable?.address} />
    </>
  );
}

type PropsType = {
  details: RequestDetails;
};

export default MissionDetails;
