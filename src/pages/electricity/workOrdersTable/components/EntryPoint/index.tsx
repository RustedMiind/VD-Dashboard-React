import { Stack } from "@mui/material";
import ActionsBtns from "../ActionBtns";
import WorkOrderSearchBar from "../SearchBar";
import WorkOrderDataTable from "../DataTable";

export default function WorkOrderTableEntryPoint() {
  return (
    <Stack spacing={2}>
      <WorkOrderSearchBar />
      <ActionsBtns />
      <WorkOrderDataTable />
    </Stack>
  );
}
