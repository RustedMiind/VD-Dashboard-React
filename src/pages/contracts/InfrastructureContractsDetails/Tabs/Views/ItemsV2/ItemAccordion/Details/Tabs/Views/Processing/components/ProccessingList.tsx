import { Stack } from "@mui/material";
import NoProccessing from "./NoProccessing";
import ProccessingItemsRow from "./ProccessingItem";
import { useContext, useEffect } from "react";
import { SetProccessingContext } from "../context/SetProccessingContext";
import { ContractItemContext } from "../../../../../ItemContext";

export default function ProcessingList() {
  const SetProccessingContextData = useContext(SetProccessingContext);
  const ContractItemContextData = useContext(ContractItemContext);
  // * Set Current SubItem Id
  let { subItem } = SetProccessingContextData;
  let updatedItem = ContractItemContextData.item?.contract_sub_items.find(
    (ele) => ele.id == subItem?.id
  );

  return (
    <Stack spacing={2}>
      {/* Case there is no proccessings(transactions) */}
      {updatedItem?.processing && updatedItem?.processing.length == 0 && (
        <NoProccessing />
      )}

      {updatedItem?.processing &&
        updatedItem?.processing.length > 0 &&
        updatedItem?.processing.map((item) => (
          <ProccessingItemsRow key={`pk_${item.id}`} item={item} />
        ))}
    </Stack>
  );
}
