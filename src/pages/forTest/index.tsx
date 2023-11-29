import { Paper, Stack, Typography } from "@mui/material";
import UploadFileInput from "../../components/UploadFileInput";
import { useState } from "react";

function ForTest() {
  const [file, setFile] = useState<File | undefined>(undefined);

  return (
    <Stack>
      <Typography variant="h4">Only for test purposes</Typography>
      <Paper component={Stack} elevation={4} p={2}>
        <UploadFileInput value={file} setValue={setFile} />
      </Paper>
    </Stack>
  );
}

export default ForTest;
