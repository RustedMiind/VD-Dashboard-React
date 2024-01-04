import { Grid } from "@mui/material";
import DataInputLike from "../../../../components/DataInputLike";
import { RequestDetails } from "../../../../types/RequestDetails";

function WorkNeeds({ details }: PropsType) {
  if (
    details.requestable !== undefined &&
    Array.isArray(details?.requestable.details)
  ) {
    return (
      <>
        <Grid item xs={6} />
        <DataInputLike
          title="الكمية"
          value={details.requestable.details[0]?.quantity}
        />
        <DataInputLike
          title="السعر"
          value={details.requestable.details[0].price}
        />
        <DataInputLike
          title="البيان"
          value={details.requestable?.details[0]?.statement}
          cols={12}
          multiLine
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
