import { Stack, Typography } from "@mui/material";
import UploadFileInput from "../../../components/UploadFileInput";

function BtnFile(props: BtnFileProps) {
  return (
    <>
      <Typography sx={{ ml: 2 }} component="label">
        صورة الهوية
      </Typography>
      <UploadFileInput
        value={props.file || undefined}
        setValue={props.setFile}
      />
    </>
  );
}

export default BtnFile;
interface BtnFileProps {
  setFile: (file: File) => void;
  file?: null | File;
}
