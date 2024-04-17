import { Box, Button, Grid, GridProps, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ContractDetailsContext } from "../../ContractDetailsContext";
import ContractItemCard from "./ContractItemCard";
import SetMainItemDialog from "./SetMainItemDialog";

const GridItem = (props: GridProps) => (
  <Grid item xs={12} md={6} xl={4} {...props} />
);

function ContractItemsV2() {
  const { contract } = useContext(ContractDetailsContext);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const handleOpenCreateDialog = () => {
    setSelectedItemToEdit(undefined);
    setCreateDialogOpen(true);
  };
  const handleCloseCreateDialog = () => setCreateDialogOpen(false);
  const [selectedItemToEdit, setSelectedItemToEdit] = useState<
    number | undefined
  >(undefined);

  const selectItemToEdit = (id: number) => {
    setCreateDialogOpen(true);
    setSelectedItemToEdit(id);
  };

  return (
    <>
      <SetMainItemDialog
        open={createDialogOpen}
        onClose={handleCloseCreateDialog}
        itemId={selectedItemToEdit}
      />

      <Stack spacing={2}>
        <Stack direction="row" alignItems="center">
          <Typography variant="h6" fontWeight={700} flexGrow={1} gutterBottom>
            البنود الرئيسية
          </Typography>
          <Button variant="contained" onClick={handleOpenCreateDialog}>
            اضافة بند رئيسي
          </Button>
        </Stack>
        <Box>
          {contract && contract.contract_items && (
            <Grid container spacing={2}>
              {contract.contract_items.map((item) => (
                <GridItem key={item.id}>
                  <ContractItemCard
                    selectItemToEdit={selectItemToEdit}
                    data={item}
                  />
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
