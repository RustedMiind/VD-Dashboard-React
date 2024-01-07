import { Grid } from "@mui/material";
import DataInputLike from "../../../../components/DataInputLike";
import { formatDate } from "../../../../methods";
import { RequestDetails } from "../../../../types/RequestDetails";

function AdvanceDetails({ details }: PropsType) {
  return (
    <>
      <DataInputLike
        title="تاريخ الصرف"
        value={details.requestable?.exchange_date}
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
        title="السلفة السابقة"
        value={details.requestable?.lastAdvance?.amount}
        cols={6}
      />
      <DataInputLike
        title="الرصيد المتبقي"
        value={details.requestable?.lastAdvance?.balance}
        cols={6}
      />
      <DataInputLike
        title="المبلغ"
        value={details.requestable?.amount}
        cols={6}
      />{" "}
      <DataInputLike
        title="مدة الخصم"
        value={details.requestable?.duration + " يوم"}
        cols={6}
      />
      <DataInputLike
        title="وصف طلب السلفة"
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
