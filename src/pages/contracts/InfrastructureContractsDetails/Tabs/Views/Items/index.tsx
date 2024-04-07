import { useContext } from "react";
import { ContractDetailsContext } from "../../..";
import MainPand from "./components/MainPand";
import { Button, Stack, Typography } from "@mui/material";
import { CreateTransactionContextProvider } from "./context/CreateTransactionContext";
import { TransactionContextProvider } from "./context/TransactionContext";

export default function ContractItemsDetails() {
  const { contract } = useContext(ContractDetailsContext);
  return (
    <>
      <CreateTransactionContextProvider>
        {contract?.contract_items?.map((contract) => (
          <TransactionContextProvider key={contract.contract_id}>
            <MainPand contractData={contract} />
          </TransactionContextProvider>
        ))}
        {contract?.contract_items?.length == 0 && (
          <Stack justifyContent={"center"} alignItems={"center"}>
            <Typography variant="body1" fontWeight={600}>
              لا يوجد بنود رئيسية
            </Typography>
            <Button variant="contained" sx={{ width: "150px", marginY: 2 }}>
              أضافة بند
            </Button>
          </Stack>
        )}
      </CreateTransactionContextProvider>
    </>
  );
}
