import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import UploadFileInput from "../../../components/UploadFileInput";
function BtnFile({ dispatch }: any) {
  const [file, setFile] = useState<File | undefined>(undefined);

  return (
    <Stack width={1}>
      <Typography sx={{ ml: 2 }} component="label">
        صورة الهوية
      </Typography>
      <UploadFileInput
        value={file}
        setValue={(file) => {
          setFile(file);
          dispatch({
            type: "CARD_IMAGE",
            payload: file,
          });
        }}
      />
    </Stack>
  );
}

export default BtnFile;
