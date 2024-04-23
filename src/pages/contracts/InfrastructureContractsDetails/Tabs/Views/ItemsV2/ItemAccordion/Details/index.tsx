import { Button, Grid, List, Stack } from "@mui/material";
import {
  ContractItem,
  ContractSubItem,
} from "../../../../../../../../types/Contracts/ContractItems";
import { useState } from "react";
import TabsSection from "./Tabs";

function ItemDetails({ item }: PropsType) {
  const [currentSubItem, setCurrentSubItem] = useState<
    undefined | ContractSubItem
  >(undefined);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={3}>
        {item.contract_sub_items && (
          <Stack spacing={0.5}>
            {item.contract_sub_items.map((subItem) => (
              <Button
                size="large"
                variant={
                  currentSubItem?.id === subItem.id ? "contained" : "text"
                }
                onClick={() => setCurrentSubItem(subItem)}
              >
                {subItem.name}
              </Button>
            ))}
          </Stack>
        )}
      </Grid>
      <Grid item xs={12} lg={9}>
        {currentSubItem && <TabsSection subItem={currentSubItem} />}
      </Grid>
    </Grid>
  );
}

type PropsType = {
  item: ContractItem;
};

export default ItemDetails;
