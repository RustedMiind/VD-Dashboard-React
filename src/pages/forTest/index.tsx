import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import UploadFileInput from "../../components/UploadFileInput";
import { useState } from "react";
import { SelectWithFilteration } from "../../components/SelectWithFilteration";
import { useSnackbar } from "notistack";

function ForTest() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const snackbar = useSnackbar();

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
        <Stack direction={"row"} spacing={1}>
          <Button
            variant="contained"
            onClick={() => {
              snackbar.enqueueSnackbar("Hello There mr ali", {
                variant: "success",
              });
            }}
          >
            Open Snackbar
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              snackbar.closeSnackbar();
            }}
          >
            Close Snackbar
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default ForTest;
