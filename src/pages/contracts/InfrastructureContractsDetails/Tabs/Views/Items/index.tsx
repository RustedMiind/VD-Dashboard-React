import { useContext } from "react";
import { ContractDetailsContext } from "../../..";
import MainPand from "./components/MainPand";
import { Button, Stack, Typography } from "@mui/material";
import { CreateTransactionContextProvider } from "./context/CreateTransactionContext";
import { TransactionContextProvider } from "./context/TransactionContext";
import { ReplyTransactionContextProvider } from "./context/ReplyTransactionContext";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

export default function ContractItemsDetails() {
  const { contract } = useContext(ContractDetailsContext);
  return (
    <>
      <CreateTransactionContextProvider>
        <Stack justifyContent={"center"} width={"100%"} alignItems={"end"}>
          <Button
            variant="contained"
            sx={{ width: "150px", marginY: 2 }}
            startIcon={<AddBoxOutlinedIcon />}
            disabled={true}
          >
            انشاء بند
          </Button>
        </Stack>
        {contract?.contract_items?.map((mainItem) => (
          <TransactionContextProvider
            key={mainItem.contract_id}
            currentMainItem={mainItem}
          >
            <ReplyTransactionContextProvider>
              <MainPand contractItem={mainItem} />
            </ReplyTransactionContextProvider>
          </TransactionContextProvider>
        ))}
        {contract?.contract_items?.length == 0 && (
          <Stack justifyContent={"center"} alignItems={"center"}>
            <Typography variant="body1" fontWeight={600}>
              لا يوجد بنود رئيسية
            </Typography>
            <Button
              variant="contained"
              sx={{ width: "150px", marginY: 2 }}
              startIcon={<AddBoxOutlinedIcon />}
              disabled={true}
            >
              انشاء بند
            </Button>
          </Stack>
        )}
      </CreateTransactionContextProvider>
    </>
  );
}
