import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "./components/Navbar";
import DrawerComponent from "./components/Drawer";
import { Children } from "../../types/Children";
import BreadCrumbContextProvider from "./BreadCrumbContext/Provider";

const drawerWidth = 240;

export default function MainLayout(props: PropsType) {
  return (
    <BreadCrumbContextProvider>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navbar width={drawerWidth} />
        <DrawerComponent width={drawerWidth} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            maxWidth: `calc(100vw - ${drawerWidth + 16}px)`,
            bgcolor: "background.default",
            p: 3,
          }}
        >
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    </BreadCrumbContextProvider>
  );
}

type PropsType = {
  children?: Children;
};
