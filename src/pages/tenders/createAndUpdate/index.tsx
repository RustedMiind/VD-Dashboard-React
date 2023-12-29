import { Stack, Typography } from "@mui/material";
import FormsSection from "./Forms";

function CreateAndUpdateTender() {
  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} mb={3}>
        انشاء منافسة
      </Typography>
      <FormsSection />
    </Stack>
  );
}

export default CreateAndUpdateTender;
