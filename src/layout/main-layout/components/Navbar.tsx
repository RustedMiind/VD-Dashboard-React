import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AccountMenu from "../../../components/AccountMenu/AccountMenu";
import Notifications from "./Notifications";
import { Stack } from "@mui/system";
import Breadcrumb from "./Breadcrumb";

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
        <Stack flexGrow={1}>
          <Breadcrumb />
        </Stack>
        <Notifications />
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
}

type PropsType = {
  width: number;
};

export default Navbar;
