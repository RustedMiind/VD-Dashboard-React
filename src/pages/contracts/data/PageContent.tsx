import { Stack } from "@mui/material";
import { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import Panal from "./Panal";
import { IndexContextProvider } from "../Context/Store";
import {
  ContractResponse,
  ContractsContext,
} from "../Context/ContractsContext";
import axios from "axios";
import { Api } from "../../../constants";
import { Contract } from "../../../types";

function PageContent() {
  let contractsContext = useContext(ContractsContext);
  const DataToSearch: TypeDataToSearch = {
    client_phone: "",
    client_id: 0,
    employee_name: "",
  };
  let [contractSearch, setContractSearch] = useState<Contract[]>([]);
  function getAllContracts() {
    axios
      .get<{ data: Contract[] }>(Api("employee/contract"), {
        params: {
          client_phone: DataToSearch.client_phone,
          client_id: DataToSearch.client_id,
          employee_name: DataToSearch.employee_name,
        },
      })
      .then((res) => {
        setContractSearch(res.data.data);

        // setContractSearch(res.data);
      })
      .catch((err) => {
        setContractSearch([]);
      });
  }

  // function search() {
  //   contractsContext.setContracts &&
  //     contractsContext.setContracts(DataToSearch);
  // }
  return (
    <IndexContextProvider>
      <Stack>
        <SearchBar
          requests={contractsContext?.contracts?.data}
          DataToSearch={DataToSearch}
          // search={search}
          getAllContracts={getAllContracts}
        />
        <Panal contractSearch={contractSearch} />
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
