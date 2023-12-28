import { Paper, Stack } from "@mui/material";
import ControlSection from "./ControlSection";
import TendersTable from "./Table";
import TendersFilters from "./Filters";
import Counters from "./Counters";

function TendersData() {
  return (
    <Stack>
      <TendersFilters />
      <Stack component={Paper} spacing={2} p={3}>
        <ControlSection />
        <Counters />
        {/*   - tender statuses   */}
        <TendersTable />
      </Stack>
    </Stack>
  );
}

export default TendersData;
