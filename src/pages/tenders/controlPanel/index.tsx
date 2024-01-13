import ControlPanelContextProvider from "./controlPanelContext";
import ContentPanal from "./ContentPanal";
import GradientBg from "../../../components/GradientBg";
import { Typography } from "@mui/material";

export default function ControlPanal() {
  return (
    <ControlPanelContextProvider>
      <GradientBg>
        <Typography>abdo</Typography>
      </GradientBg>
    </ControlPanelContextProvider>
  );
}
