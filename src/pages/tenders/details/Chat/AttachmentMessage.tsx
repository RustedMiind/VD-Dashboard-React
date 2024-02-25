import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
} from "@mui/material";
import { Message } from "../../../../types/Message/Message";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LimitTypography from "../../../../components/LimitTypograpgy";

function AttachmentMessage({ message }: PropsType) {
  return (
    <Stack
      component={Paper}
      sx={{
        bgcolor: "Background",
      }}
      width={0.75}
      elevation={1}
    ></Stack>
  );
}

type PropsType = {
  message: Message;
};

export default AttachmentMessage;
