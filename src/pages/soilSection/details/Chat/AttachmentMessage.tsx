import {
  Paper,
  Stack,
} from "@mui/material";
import { Message } from "../../../../types/Message/Message";

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
