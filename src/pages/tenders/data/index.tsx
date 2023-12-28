import { Paper, Stack } from "@mui/material";
import ControlSection from "./ControlSection";
import TendersTable from "./Table";

function TendersData() {
  return (
    <Stack>
      <Paper>
        <ControlSection />
        {/*   - tender statuses   */}
        <TendersTable />
      </Paper>
    </Stack>
  );
}

export default TendersData;
