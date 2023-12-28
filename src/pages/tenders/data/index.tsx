import { Paper, Stack } from "@mui/material";
import ControlSection from "./ControlSection";
import TendersTable from "./Table";
import TendersFilters from "./Filters";

function TendersData() {
  return (
    <Stack>
      <TendersFilters />
      <Paper>
        <ControlSection />
        {/*   - tender statuses   */}
        <TendersTable />
      </Paper>
    </Stack>
  );
}

export default TendersData;
