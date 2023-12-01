import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import UploadFileInput from "../../../components/UploadFileInput";
function BtnFile(
  props: any
  // دي ايه ؟؟؟
) {
  const [file, setFile] = useState<File | undefined>(undefined);

  return (
    <Stack width={1}>
      <Typography sx={{ ml: 2 }} component="label">
        صورة الهوية
      </Typography>
      <UploadFileInput
        value={file}
        setValue={setFile}
        dispatch={props.dispatch}
        // وايه الdispatch دي جت منين ؟؟
      />
    </Stack>
  );
}

export default BtnFile;
