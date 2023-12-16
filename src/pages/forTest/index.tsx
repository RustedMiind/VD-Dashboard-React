import { Paper, Stack, Typography } from "@mui/material";
import UploadFileInput from "../../components/UploadFileInput";
import { useState } from "react";
import { SelectWithFilteration } from "../../components/SelectWithFilteration";

function ForTest() {
  const [file, setFile] = useState<File | undefined>(undefined);

  return (
    <Stack>
      <Paper component={Stack} elevation={4} p={2} spacing={5}>
        <UploadFileInput value={file} setValue={setFile} />
        <SelectWithFilteration
          options={[
            { id: 1, label: "Apple" },
            { id: 2, label: "Banana" },
            { id: 3, label: "Apple" }, // Example of a duplicate label with different ID
            { id: 4, label: "Orange" },
          ]}
        />
      </Paper>
    </Stack>
  );
}

export default ForTest;
