import { Grid } from "@mui/material";
import DataInputLike from "../../../../components/DataInputLike";
import { formatDate } from "../../../../methods";
import { RequestDetails } from "../../../../types/RequestDetails";

function AdvanceDetails({ details }: PropsType) {
  return (
    <>
      <Grid item xs={6} />
      <DataInputLike title="الكمية" value={details.requestable?.amount} />
      <DataInputLike title="السعر" value={details.requestable?.amount} />
      <DataInputLike
        title="البيان"
        value={details.requestable?.description}
        cols={12}
        multiLine
      />
    </>
  );
}

type PropsType = {
  details: RequestDetails;
};

export default AdvanceDetails;
