import { Button, Grid, List, Stack } from "@mui/material";
import { ContractItem } from "../../../../../../../../types/Contracts/ContractItems";

function ItemDetails({ item }: PropsType) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={4}>
        {item.contract_sub_items && (
          <Stack spacing={0.5}>
            {item.contract_sub_items.map((subItem) => (
              <Button>{subItem.name}</Button>
            ))}
          </Stack>
        )}
      </Grid>
      <Grid item xs={12} lg={8}></Grid>
    </Grid>
  );
}

type PropsType = {
  item: ContractItem;
};

export default ItemDetails;
