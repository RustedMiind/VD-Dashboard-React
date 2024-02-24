import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "./components/Navbar";
import DrawerComponent from "./components/Drawer";
import { Children } from "../../types/Children";
import BreadCrumbContextProvider from "./BreadCrumbContext/Provider";
import { useEffect } from "react";
import { generateToken, messaging } from "../../firebase.config";
import { onMessage } from "firebase/messaging";
import { useSnackbar } from "notistack";
import { Stack, Typography } from "@mui/material";
import { notify } from "../../methods/notifications/notify";
const drawerWidth = 240;

export default function MainLayout(props: PropsType) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
      enqueueSnackbar(
        <Stack>
          <Typography fontWeight={700}>
            {payload.notification?.title}
          </Typography>
          <Typography variant="body2">{payload.notification?.body}</Typography>
        </Stack>,
        { variant: "info" }
      );
      notify({
        body: payload.notification?.body,
        title: payload.notification?.title,
        image: payload.notification?.image,
      });
    });
  }, []);

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
