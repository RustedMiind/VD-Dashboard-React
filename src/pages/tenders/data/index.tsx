import { Paper, Stack } from "@mui/material";
import ControlSection from "./ControlSection";
import TendersTable from "./Table";
import TendersFilters from "./Filters";
import Counters from "./Counters";
import { TableContext, TenderTableContextProvider } from "./TableContext";
import { useContext, useState } from "react";
import CreateDialog from "./CreateDialog";

function TendersData() {
  const { tenderTableData } = useContext(TableContext);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  function handleOpenCreateDialog() {
    setOpenCreateDialog(true);
  }
  function handleCloseCreateDialog() {
    setOpenCreateDialog(false);
  }
  return (
    <TenderTableContextProvider>
      <Stack>
        <CreateDialog
          open={openCreateDialog}
          onClose={handleCloseCreateDialog}
        />
        <TendersFilters />
        <Stack component={Paper} spacing={2} p={3}>
          <ControlSection openCreateDialog={handleOpenCreateDialog} />
          <Counters />
          <TendersTable openCreateDialog={handleOpenCreateDialog} />
        </Stack>
      </Stack>
    </TenderTableContextProvider>
  );
}

export default TendersData;
