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
  Menu,
  Fade,
} from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import StatusChip from "../../../../components/StatusChip";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Message } from "../../../../types/Message/Message";
import LimitTypography from "../../../../components/LimitTypograpgy";
import DeleteIcon from "@mui/icons-material/Delete";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState } from "react";
import axios from "axios";
import { Api } from "../../../../constants";
import { useSnackbar } from "notistack";
import { useUser } from "../../../../contexts/user/user";
function MessageComponent({ message }: PropsType) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteMessage = (id?: string | number) => {
    return () => {
      handleClose();
      axios.post(Api(`employee/tender/chat/${id}/delete`)).catch((err) => {
        enqueueSnackbar(
          err.response?.data?.msg ||
            err.response?.data?.msg ||
            "تعذر في حذف الرسالة"
        );
      });
    };
  };
  const { user } = useUser();
  console.log(message.sender_id !== user?.employee_id, user, message);
  return (
    <>
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
          <IconButton onClick={handleClick} size="small">
            <MoreVertIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={handleDeleteMessage(message.id)}
          disabled={message.sender_id !== user?.employee_id}
        >
          <ListItemIcon>
            <DeleteIcon color="error" />
          </ListItemIcon>
          <ListItemText> حذف </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

type PropsType = {
  message: Message;
};

export default MessageComponent;
