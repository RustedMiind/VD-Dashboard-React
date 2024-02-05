import { SoilContextProvider } from "./SoilContext";
import SoilRequest from "./soilRequest";

export default function SoilSection() {
  console.log("abdo");

  return (
    <SoilContextProvider>
      <SoilRequest />
    </SoilContextProvider>
  );
}
