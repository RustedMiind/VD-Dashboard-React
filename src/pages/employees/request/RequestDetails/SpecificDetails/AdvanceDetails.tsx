import { DataItem } from "..";
import { RequestDetails } from "../../../../../types/RequestDetails";

function AdvanceDetails({ details }: PropsType) {
  return (
    <>
      <DataItem
        label="تاريخ الصرف"
        value={details.requestable?.exchange_date}
      />
      <DataItem
        label="الشخص المكلف"
        value={
          details.steps_of_approval &&
          details.steps_of_approval[0]?.employee?.name
        }
      />
      <DataItem
        label="السلفة السابقة"
        value={details.requestable?.lastAdvance?.amount}
      />
      <DataItem
        label="الرصيد المتبقي"
        value={details.requestable?.lastAdvance?.balance}
      />
      <DataItem label="المبلغ" value={details.requestable?.amount} />{" "}
      <DataItem
        label="مدة الخصم"
        value={details.requestable?.duration + " يوم"}
      />
      <DataItem
        label="وصف طلب السلفة"
        value={details.requestable?.description}
      />
    </>
  );
}

type PropsType = {
  details: RequestDetails;
};

export default AdvanceDetails;
