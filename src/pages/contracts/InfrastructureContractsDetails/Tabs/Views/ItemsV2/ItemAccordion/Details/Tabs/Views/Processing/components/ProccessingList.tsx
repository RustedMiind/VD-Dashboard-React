import { Stack } from "@mui/material";
import NoProccessing from "./NoProccessing";
import ProccessingItemsRow from "./ProccessingItem";
import { TransactionType } from "../../../../../../../../../../../../types/Contracts/ContractTransactionAttachment";

// !dummy data
const dummyProccessing = {
  attachment: [],
  comments: [],
  comments_count: 0,
  contract_sub_item_id: 77,
  created_at: "2024-04-23T15:35:16.000000Z",
  id: 126,
  letter_num: "Demo",
  order_num: "Demo",
  receiver: "Demo",
  subject: "Demo",
  system_logs: [],
  updated_at: "2024-04-23T15:35:16.000000Z",
};

export default function ProcessingList(props: propsType) {
  return (
    <Stack spacing={2}>
      {/* Case there is no proccessings(transactions) */}
      {props?.processing && props?.processing.length == 0 && <NoProccessing />}

      {props?.processing &&
        props?.processing.length > 0 &&
        props?.processing.map((item) => (
          <ProccessingItemsRow key={`pk_${item.id}`} item={item} />
        ))}
    </Stack>
  );
}

type propsType = {
  processing?: TransactionType[] | undefined;
  subItemId: number;
};
