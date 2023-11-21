import DataInputLike from "../../../../components/DataInputLike";
import { formatDate } from "../../../../methods";
import { RequestDetails } from "../../../../types/RequestDetails";

function CarFixDetails({ details }: PropsType) {
  const builderFound =
    (details.requestable?.builder &&
      Array.isArray(details.requestable?.builder)) ||
    false;

  return (
    <>
      <DataInputLike
        cols={12}
        title="نوع السيارة"
        value={
          builderFound
            ? details.requestable?.builder[0]?.media[0].file_name
            : ""
        }
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

export default CarFixDetails;
