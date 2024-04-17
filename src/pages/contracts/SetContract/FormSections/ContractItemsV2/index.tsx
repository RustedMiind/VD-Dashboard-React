import { Box, Button, Grid, GridProps, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { ContractDetailsContext } from "../../ContractDetailsContext";
import ContractItemCard from "./ContractItemCard";
import SetMainItemDialog from "./SetMainItemDialog";

const GridItem = (props: GridProps) => (
  <Grid item xs={12} md={6} xl={4} {...props} />
);

function ContractItemsV2() {
  const { contract } = useContext(ContractDetailsContext);

  return (
    <>
      <SetMainItemDialog />

      <Stack spacing={2}>
        <Stack direction="row" alignItems="center">
          <Typography variant="h6" fontWeight={700} flexGrow={1} gutterBottom>
            البنود الرئيسية
          </Typography>
          <Button variant="contained">اضافة بند رئيسي</Button>
        </Stack>
        <Box>
          {contract && contract.contract_items && (
            <Grid container spacing={2}>
              {contract.contract_items.map((item) => (
                <GridItem key={item.id}>
                  <ContractItemCard data={item} />
                </GridItem>
              ))}
            </Grid>
          )}
        </Box>
      </Stack>
    </>
  );
}

export default ContractItemsV2;
