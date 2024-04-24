import { Stack } from "@mui/material";
import NoProccessing from "./NoProccessing";
import ProccessingItemsRow from "./ProccessingItem";
import { useContext, useEffect } from "react";
import { SetProccessingContext } from "../context/SetProccessingContext";

export default function ProcessingList() {
  const SetProccessingContextData = useContext(SetProccessingContext);
  // * Set Current SubItem Id
  let { subItem } = SetProccessingContextData;

  useEffect(() => console.log("LLL", subItem), [subItem]);

  return (
    <Stack spacing={2}>
      {/* Case there is no proccessings(transactions) */}
      {subItem?.processing && subItem?.processing.length == 0 && (
        <NoProccessing />
      )}

      {subItem?.processing &&
        subItem?.processing.length > 0 &&
        subItem?.processing.map((item) => (
          <ProccessingItemsRow key={`pk_${item.id}`} item={item} />
        ))}
    </Stack>
  );
}
