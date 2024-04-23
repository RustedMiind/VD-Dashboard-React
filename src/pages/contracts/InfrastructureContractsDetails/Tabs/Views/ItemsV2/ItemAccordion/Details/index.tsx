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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={3}>
        {item.contract_sub_items && (
          <Stack spacing={0.5} component={Paper} bgcolor={"background.default"}>
            {item.contract_sub_items.map((subItem) => (
              <Button
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
        {currentSubItem && <TabsSection subItem={currentSubItem} />}
      </Grid>
    </Grid>
  );
}

type PropsType = {
  item: ContractItem;
};

export default ItemDetails;
