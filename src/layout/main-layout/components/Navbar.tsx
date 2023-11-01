import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountMenu from "../../../components/AccountMenu/AccountMenu";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

function Navbar(props: PropsType) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${props.width}px)`,
        ml: `${props.width}px`,
        backgroundColor: "background.paper",
        color: "primary.main",
        justifyContent: "center",
      }}
      elevation={2}
    >
      <Toolbar>
        <Typography
          flexGrow={1}
          variant="h6"
          noWrap
          component="div"
        ></Typography>
        <IconButton size="medium" sx={{ ml: 2 }}>
          <Badge badgeContent={2} color="error">
            <NotificationsIcon color="action" />
          </Badge>
        </IconButton>
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
}

type PropsType = {
  width: number;
};

export default Navbar;
