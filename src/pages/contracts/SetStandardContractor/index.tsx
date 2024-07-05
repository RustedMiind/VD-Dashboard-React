import EntryPointOfSetStandardContractor from "./components/EnteryPoint";
import { SetStandardContractorContextProvider } from "./context/SetStandardContractorContext";

export default function SetStandardContractor() {
  // TODO::declare and define component state and variables
  // TODO::declare and define component helper methods
  // * return component ui
  return (
    <SetStandardContractorContextProvider>
      <EntryPointOfSetStandardContractor />
    </SetStandardContractorContextProvider>
  );
}
