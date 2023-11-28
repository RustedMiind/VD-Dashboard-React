import { Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../constants";
import SearchBar from "./SearchBar";
import Panal from "./Panal";
import { Contract } from "../../../types";
import { IndexContextProvider } from "../Context/Store";
import { ContractsContext } from "../Context/ContractsContext";

function PageContent() {
  let contractsContext = useContext(ContractsContext);
  //  object have data to search
  const DataToSearch: TypeDataToSearch = {
    client_phone: "",
    client_id: 0,
    employee_name: "",
  };
  const [requests, setRequests] = useState<Contract[] | null>(null);
  function search() {
    console.log(DataToSearch);

    contractsContext.setContracts &&
      contractsContext.setContracts(DataToSearch);
  }
  return (
    <IndexContextProvider>
      <Stack>
        <SearchBar
          requests={contractsContext?.contracts}
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
