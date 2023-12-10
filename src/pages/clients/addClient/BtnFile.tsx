import { Stack, Typography } from "@mui/material";
import UploadFileInput from "../../../components/UploadFileInput";

function BtnFile(props: BtnFileProps) {
  return (
    <UploadFileInput
      size="sm"
      value={props.file || undefined}
      setValue={props.setFile}
    />
  );
}

export default BtnFile;
interface BtnFileProps {
  setFile: (file: File) => void;
  file?: null | File;
}
