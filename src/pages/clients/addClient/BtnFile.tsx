import { Stack, Typography } from "@mui/material";
import UploadFileInput from "../../../components/UploadFileInput";

function BtnFile(props: BtnFileProps) {
  console.log("Props :", props.file?.name);
  return (
    <Stack width={1}>
      <Typography sx={{ ml: 2, mb: 1 }} component="label">
        صورة الهوية
      </Typography>
      <UploadFileInput
        value={props.file || undefined}
        setValue={props.setFile}
      />
    </Stack>
  );
}

export default BtnFile;
interface BtnFileProps {
  setFile: (file: File) => void;
  file?: null | File;
}
