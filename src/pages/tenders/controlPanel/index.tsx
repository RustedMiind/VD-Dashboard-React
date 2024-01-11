import ControlPanelContextProvider from "./controlPanelContext";
import ContentPanal from "./ContentPanal";

export default function ControlPanal() {
  return (
    <ControlPanelContextProvider>
      <ContentPanal />
    </ControlPanelContextProvider>
  );
}
