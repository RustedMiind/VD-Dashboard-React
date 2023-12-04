import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import UploadFileInput from "../../../components/UploadFileInput";
import { Dispatch } from "react";

function BtnFile(props: BtnFileProps) {
  const [file, setFile] = useState<File | undefined>(undefined);

  return (
    <Stack width={1}>
      <Typography sx={{ ml: 2, mb: 1 }} component="label">
        صورة الهوية
      </Typography>
      <UploadFileInput
        value={file}
        setValue={(file) => {
          setFile(file);
          props.dispatch({
            type: "CARD_IMAGE",
            payload: file,
          });
        }}
      />
    </Stack>
  );
}

export default BtnFile;
interface BtnFileProps {
  dispatch: Dispatch<CardImageAction>;
}
interface CardImageAction {
  type: "CARD_IMAGE";
  payload: File;
}
