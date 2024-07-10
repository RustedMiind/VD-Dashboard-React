import { Stack } from "@mui/material";
import DaysRow from "../DaysRow";
import DataTabelOfStandardContractTerms from "../DataTable";

export default function EntryPointOfStandardContractTerms() {
  return (
    <Stack spacing={2}>
      <DaysRow />
      <DataTabelOfStandardContractTerms />
    </Stack>
  );
}
