import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function Navbar(props: PropsType) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${props.width}px)`,
        ml: `${props.width}px`,
        backgroundColor: "background.paper",
        color: "primary.main",
      }}
      elevation={2}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Permanent drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

type PropsType = {
  width: number;
};

export default Navbar;
