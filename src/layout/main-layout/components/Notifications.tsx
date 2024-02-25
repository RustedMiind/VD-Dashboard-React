import { Badge, Button, Stack } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { Notification } from "../../../types/Notifications";
import axios from "axios";
import { Api, Domain } from "../../../constants";

function Notifications() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null
  );
  const [counts, setCounts] = useState(0);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    readNotifications();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function getNotifications() {
    axios
      .get<{ notifications: Notification[]; unread?: number }>(
        Api("employee/notifications")
      )
      .then((res) => {
        setNotifications(res.data.notifications.slice(0, 11));
        setCounts(res.data.unread || 0);
      })
      .catch((err) => {
        setNotifications(null);
      });
  }

  function readNotifications() {
    axios
      .post(Api("employee/notifications"))
      .then(getNotifications)
      .catch((err) => {
        setNotifications(null);
      });
  }

  useEffect(getNotifications, []);

  return (
    <React.Fragment>
      <Tooltip title="الاشعارات">
        <IconButton onClick={handleClick} size="medium" sx={{ ml: 2 }}>
          <Badge badgeContent={counts} color="error">
            <NotificationsIcon color="action" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{ maxHeight: 500 }}
      >
        {notifications?.map((notification) => (
          <MenuItem>
            <Stack
              sx={{
                py: 1,
                flexDirection: "row",
                alignItems: "start",
                justifyContent: "space-between",
                width: 400,
              }}
            >
              <Stack flexGrow={1}>
                <Typography fontWeight={700}>{notification.from}</Typography>
                <Typography variant="body2">{notification.message}</Typography>
              </Stack>
              <Stack>
                <Typography
                  fontWeight={700}
                  variant="body2"
                  color={"text.disabled"}
                >
                  {notification.created}
                </Typography>
              </Stack>
            </Stack>
          </MenuItem>
        ))}
        <Button
          component={"a"}
          href={Domain("admin/notifications")}
          fullWidth
          variant="contained"
          size="large"
          color="secondary"
        >
          عرض الكل
        </Button>
      </Menu>
    </React.Fragment>
  );
}

export default Notifications;
