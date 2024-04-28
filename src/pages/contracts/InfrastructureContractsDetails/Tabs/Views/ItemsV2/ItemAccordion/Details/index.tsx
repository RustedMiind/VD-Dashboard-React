import { Button, Grid, List, Paper, Stack, Typography } from "@mui/material";
import {
  ContractItem,
  ContractSubItem,
} from "../../../../../../../../types/Contracts/ContractItems";
import { useState } from "react";
import TabsSection from "./Tabs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ItemDetails({ item }: PropsType) {
  const [currentSubItem, setCurrentSubItem] = useState<
    undefined | ContractSubItem
  >(undefined);

  const subItemToRender = item.contract_sub_items?.find(
    ({ id }) => id === currentSubItem?.id
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={3}>
        {item.contract_sub_items && (
          <Stack spacing={0.5} component={Paper} bgcolor={"background.default"}>
            {item.contract_sub_items.map((subItem) => (
              <Button
                key={subItem.id}
                size="large"
                sx={{ justifyContent: "start", py: 1.5 }}
                variant={
                  currentSubItem?.id === subItem.id ? "contained" : "text"
                }
                startIcon={<ArrowBackIcon />}
                onClick={() => setCurrentSubItem(subItem)}
              >
                <Typography fontWeight={700}>{subItem.name}</Typography>
              </Button>
            ))}
          </Stack>
        )}
      </Grid>
      <Grid item xs={12} lg={9}>
        {subItemToRender && <TabsSection subItem={subItemToRender} />}
      </Grid>
    </Grid>
  );
}

type PropsType = {
  item: ContractItem;
};

export default ItemDetails;
