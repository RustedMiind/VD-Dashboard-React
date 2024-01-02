import { Paper, Stack } from "@mui/material";
import ControlSection from "./ControlSection";
import TendersTable from "./Table";
import TendersFilters from "./Filters";
import Counters from "./Counters";
import { TableContext, TenderTableContextProvider } from "./TableContext";
import { useContext } from "react";

function TendersData() {
  const { tenderTableData } = useContext(TableContext);

  return (
    <TenderTableContextProvider>
      <Stack>
        <TendersFilters />
        <Stack component={Paper} spacing={2} p={3}>
          <ControlSection />
          <Counters />
          <TendersTable />
        </Stack>
      </Stack>
    </TenderTableContextProvider>
  );
}

export default TendersData;
