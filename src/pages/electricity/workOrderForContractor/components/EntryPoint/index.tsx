import { Dayjs } from "dayjs";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import SearchDate from "../SearchDate";
import DataTableOfWorkOrderForContractor from "../DataTable";

export default function EntryPointOfWorkOrderForContractor() {
  // TODO::declare and define component state and variables
  const [value, setValue] = useState<Dayjs | null>(null);

  // TODO::declare and define component helper variables

  // * return component UI.
  return (
    <Stack spacing={2}>
      <SearchDate value={value} setValue={setValue} />
      <DataTableOfWorkOrderForContractor />
      <Button variant="contained" sx={{ my: 4, width: 0.9, marginLeft: "5%" }}>
        حفظ
      </Button>
    </Stack>
  );
}
