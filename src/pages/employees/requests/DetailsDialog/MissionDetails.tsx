import DataInputLike from "../../../../components/DataInputLike";
import { formatDate } from "../../../../methods";
import { RequestDetails } from "../../../../types/RequestDetails";

function MissionDetails({ details }: PropsType) {
  return (
    <>
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
