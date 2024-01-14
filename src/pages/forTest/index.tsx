import { Button, Paper, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import UploadFileInput from "../../components/UploadFileInput";
import { SelectWithFilteration } from "../../components/SelectWithFilteration";
import DialogComponent from "./DialogComponent";

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
      <DialogComponent title={"شراء المنافسة"} />
    </Stack>
  );
}

export default ForTest;
