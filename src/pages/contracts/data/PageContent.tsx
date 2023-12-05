import { Stack } from "@mui/material";
import { useContext } from "react";
import SearchBar from "./SearchBar";
import Panal from "./Panal";
import { IndexContextProvider } from "../Context/Store";
import { ContractsContext } from "../Context/ContractsContext";

function PageContent() {
  let contractsContext = useContext(ContractsContext);
  const DataToSearch: TypeDataToSearch = {
    client_phone: "",
    client_id: 0,
    employee_name: "",
  };
  function search() {
    contractsContext.setContracts &&
      contractsContext.setContracts(DataToSearch);
  }
  return (
    <IndexContextProvider>
      <Stack>
        <SearchBar
          requests={contractsContext?.contracts?.data}
          DataToSearch={DataToSearch}
          search={search}
        />
        <Panal />
      </Stack>
    </IndexContextProvider>
  );
}
export type TypeDataToSearch = {
  client_id: number;
  client_phone: string;
  employee_name: string;
};
export default PageContent;
