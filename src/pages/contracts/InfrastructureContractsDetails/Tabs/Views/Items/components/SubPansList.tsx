import {
  Box,
  Button,
  Fab,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useContext, useEffect } from "react";
import { ContractSubItem } from "../../../../../../../types/Contracts/ContractItems";
import { CreateTransactionContext } from "../context/CreateTransactionContext";

export default function SubPandsList({
  contractSubItems,
  setActiveSubItemId,
}: SubPandsListProps) {
  // get create transaction context data
  const transactionCxtData = useContext(CreateTransactionContext);

  // declare single btn component
  let SingleBtn = ({ item }: { item: ContractSubItem }) => (
    <Button
      size="large"
      startIcon={
        <Fab
          color={
            item.id != transactionCxtData.contractSubItem?.id
              ? "primary"
              : undefined
          }
          size="small"
        >
          <KeyboardBackspaceIcon />
        </Fab>
      }
      sx={{ fontSize: 20 }}
      variant={
        item.id == transactionCxtData.contractSubItem?.id
          ? "contained"
          : undefined
      }
      fullWidth
      onClick={() => {
        transactionCxtData.setContractSubItem(item);
        setActiveSubItemId(item.id);
      }}
    >
      {item.name}
    </Button>
  );

  // handle set active item id in beginning
  // useEffect(() => {
  //   if (contractSubItems.length)
  //     transactionCxtData.setContractSubItem(contractSubItems[0]);
  // }, []);

  return (
    <Stack
      bgcolor={"background.default"}
      height={"fit-content"}
      elevation={2}
      spacing={1}
      component={Paper}
    >
      {contractSubItems.map((subItem, idx) => (
        <SingleBtn key={subItem.id} item={subItem} />
      ))}
    </Stack>
  );
}

type SubPandsListProps = {
  contractSubItems: ContractSubItem[];
  setActiveSubItemId: React.Dispatch<React.SetStateAction<number>>;
};
