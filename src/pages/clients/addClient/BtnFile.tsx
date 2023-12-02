import { Stack, Typography, Box, Button, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import UploadFileInput from "../../../components/UploadFileInput";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
});
function BtnFile(props: any) {
  // const [selectedFile, setSelectedFile] = useState<any>(null);
  const [file, setFile] = useState<File | undefined>(undefined);

  return (
    <Stack width={1}>
      <Typography sx={{ ml: 2 }} component="label">
        صورة الهوية
      </Typography>
      <UploadFileInput
        value={file}
        setValue={setFile}
        // dispatch={props.dispatch}
      />
    </Stack>
  );
}

export default BtnFile;
