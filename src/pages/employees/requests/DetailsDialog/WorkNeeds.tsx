import DataInputLike from "../../../../components/DataInputLike";
import { formatDate } from "../../../../methods";
import { RequestDetails } from "../../../../types/RequestDetails";

function WorkNeeds({ details }: PropsType) {
  const detailsExist = Array.isArray(details.requestable?.details);

  return (
    <>
      <DataInputLike
        title="الكمية"
        value={detailsExist ? details.requestable?.details[0]?.quantity : ""}
      />
      <DataInputLike
        title="السعر"
        value={detailsExist ? details.requestable?.details[0]?.price : ""}
      />
      <DataInputLike
        title="البيان"
        value={detailsExist ? details.requestable?.details[0]?.statement : ""}
        cols={12}
        multiLine
      />
    </>
  );
}

type PropsType = {
  details: RequestDetails;
};

export default WorkNeeds;
