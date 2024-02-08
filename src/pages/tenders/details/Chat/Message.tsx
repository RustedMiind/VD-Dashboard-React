import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  IconButton,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import StatusChip from "../../../../components/StatusChip";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Message } from "../../../../types/Message/Message";
import LimitTypography from "../../../../components/LimitTypograpgy";

import AttachFileIcon from "@mui/icons-material/AttachFile";
function MessageComponent({ message }: PropsType) {
  return (
    <Stack component={Paper} direction="row">
      <Stack
        component={Paper}
        width={0.75}
        elevation={3}
        flexGrow={1}
        sx={{
          bgcolor: "Background",
          py: 1,
          px: 2,
          borderLeft: "6px solid transparent",
          borderLeftColor: "secondary.light",
        }}
      >
        <Stack direction="row">
          <Stack direction={"row"} flexGrow={1}>
            <Person2Icon />
            <LimitTypography maxWidth={125} fontWeight={700}>
              {message.sender?.name}
            </LimitTypography>
          </Stack>
          <StatusChip label={"علني"} color="success" size="small" />
        </Stack>
        <Grid item md={12}>
          {message.file_name ? (
            <MenuList>
              <MenuItem component="a" target="_blank" href={message.message}>
                <ListItemIcon>
                  <AttachFileIcon />
                </ListItemIcon>
                <ListItemText>
                  <LimitTypography maxWidth={120}>
                    {message.file_name}
                  </LimitTypography>
                </ListItemText>
              </MenuItem>
            </MenuList>
          ) : (
            <Typography ml={3}>{message.message}</Typography>
          )}
        </Grid>
      </Stack>
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        width={0.25}
      >
        <IconButton size="small">
          <EmojiEmotionsIcon />
        </IconButton>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

type PropsType = {
  message: Message;
};

export default MessageComponent;
