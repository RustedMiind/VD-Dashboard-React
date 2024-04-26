import { Stack } from "@mui/material";
import { useContext } from "react";
import { ContractDetailsContext } from "../../..";
import ItemAccordion from "./ItemAccordion";
import ContractItemContextProvider from "./ItemAccordion/ItemContext";
import CreateNewProcessingDialog from "./CreateNewProcessingDialog";
import OpenCreateProcessingContextProvider from "./CreateNewProcessingDialog/CreateProcessingContextProvider";
import CreateProcessingReplyContextProvider from "./ReplyExistingProcessing/CreateProcessingReplyContext";

function ItemsV2() {
  const { contract } = useContext(ContractDetailsContext);

  console.log("contract v2", contract);

  return (
    <>
      <CreateProcessingReplyContextProvider>
        <OpenCreateProcessingContextProvider>
          <Stack spacing={2}>
            <Stack spacing={2}>
              {contract?.contract_items?.map((item) => (
                <ContractItemContextProvider
                  contractItemId={item.id}
                  key={item.id}
                >
                  <ItemAccordion item={item} />
                </ContractItemContextProvider>
              ))}
            </Stack>
          </Stack>
        </OpenCreateProcessingContextProvider>
      </CreateProcessingReplyContextProvider>
    </>
  );
}

export default ItemsV2;
