import { Button, Stack } from "@mui/material";
import DaysRow from "../DaysRow";
import DataTabelOfStandardContractTerms from "../DataTable";

export default function EntryPointOfStandardContractTerms() {
  return (
    <Stack spacing={2}>
      <DaysRow />
      <DataTabelOfStandardContractTerms />
      <Button
        fullWidth
        sx={{
          color: "#fff",
          bgcolor: "#004693",
          ":hover": {
            bgcolor: "#004693",
          },
        }}
      >
        حفظ
      </Button>
    </Stack>
  );
}
