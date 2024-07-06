import { useContext, useEffect, useState } from "react";
import { MainBreadCrumbContext } from "../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";
import SearchBar from "./components/SearchBar";
import IndexOfDataTable from "./components/DataTable";

export default function ElectricityContractorUsers() {
  // todo::declare and define component state and variables
  const [search, setSearch] = useState("");
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
      title: "مناديب المقاول",
      path: "/",
    });
  }, []);

  //return component ui
  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <IndexOfDataTable />
    </>
  );
}
