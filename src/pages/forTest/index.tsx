import { Button, Stack, Typography } from "@mui/material";
import CustomFilePond from "../../components/CustomFilepond";
import { useEffect, useState } from "react";
import { FileBondState } from "../../types/FileBondState";
import { Api } from "../../constants";
import { uploadFileInChunks } from "../../methods/uploadChunks";

function ForTest() {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = () => {
    uploadFileInChunks(
      files[0],
      1024 * 1024 * 0.5,
      Api("employee/send-big-file")
    );
  };

  return (
    <Stack>
      <CustomFilePond
        files={files}
        onupdatefiles={(e) => {
          setFiles(e.map((file) => file.file as File));
        }}
      />
      <Button fullWidth variant="contained" onClick={handleUpload}>
        Upload
      </Button>
    </Stack>
  );
}

export default ForTest;
