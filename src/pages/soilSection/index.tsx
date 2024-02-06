import { SoilContextProvider } from "./SoilContext";
import SoilRequest from "./soilRequest";
import { SoilRequestTableContextProvider } from "./soilRequest/TableContext";

export default function SoilSection() {
  return (
    <SoilRequestTableContextProvider>
      <SoilContextProvider>
        <SoilRequest />
      </SoilContextProvider>
    </SoilRequestTableContextProvider>
  );
}
