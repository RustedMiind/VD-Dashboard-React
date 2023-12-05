import { Stack } from "@mui/material";
import FormAdd from "./FormAdd";
function AddClient() {
  return (
    <Stack>
      <FormAdd />
    </Stack>
  );
}

export default AddClient;

export type TypeAdd = "فرد" | "شركه";
