import { useContext, useEffect } from "react";
import EntryPointOfSetStandardContractor from "./components/EnteryPoint";
import { SetStandardContractorContextProvider } from "./context/SetStandardContractorContext";
import { MainBreadCrumbContext } from "../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";

export default function SetStandardContractor() {
  // todo::declare and define component state and variables
  const { handleAddNewTerm, handleClearLinks } = useContext(
    MainBreadCrumbContext
  );

  // todo::set breadcrumb terms
  useEffect(() => {
    handleClearLinks();
    handleAddNewTerm({
      title: "كهرباء",
      path: "/",
      disabled: true,
    });
    handleAddNewTerm({
      title: "اضافة بيانات مقاول",
      path: "/",
    });
  }, []);
  
  // TODO::declare and define component helper methods
  // * return component ui
  return (
    <SetStandardContractorContextProvider>
      <EntryPointOfSetStandardContractor />
    </SetStandardContractorContextProvider>
  );
}
