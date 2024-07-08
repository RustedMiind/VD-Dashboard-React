import { useContext, useEffect } from "react";
import AddWorkOrderEntryPoint from "./components/EntryPoint";
import { MainBreadCrumbContext } from "../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";

export default function AddWorkOrder() {
  // todo::declare and define component state and variables
  const { handleAddNewTerm, handleClearLinks } = useContext(
    MainBreadCrumbContext
  );

  // todo::set breadcrumb terms
  useEffect(() => {
    handleClearLinks();
    handleAddNewTerm({
      title: "الكهرباء",
      path: "/",
      disabled: true,
    });
    handleAddNewTerm({
      title: "اضافة  أمر العمل",
      path: "/",
    });
  }, []);

  // * return compoent UI.
  return (
    <>
      <AddWorkOrderEntryPoint />
    </>
  );
}
