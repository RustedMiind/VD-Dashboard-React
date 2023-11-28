import { Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../constants";
import SearchBar from "./SearchBar";
import Panal from "./Panal";
import { Contract } from "../../../types";
import { IndexContextProvider } from "../Context/Store";
import {
  ContractsContext,
  ContractsContextProvider,
} from "../Context/ContractsContext";
function Contracts() {
  let reqContext = useContext(ContractsContext);
  //  object have data to search
  const DataToSearch: TypeDataToSearch = {
    client_phone: "",
    client_id: 0,
    employee_name: "",
  };
  const [requests, setRequests] = useState<Contract[] | null>(null);
  function search() {
    console.log(DataToSearch);

    axios
      .get<{ data: Contract[] }>(Api("employee/contract"), {
        params: {
          client_phone: DataToSearch.client_phone,
          client_id: DataToSearch.client_id,
          employee_name: DataToSearch.employee_name,
        },
      })
      .then((res) => {
        console.log(res);
        setRequests(res.data.data);
        // if() reqContext?.setContracts();
      })
      .catch((err) => {
        setRequests(null);
      });
  }
  // useEffect(() => {
  //   axios
  //     .get<{ data: Contract[] }>(Api("employee/contract"))
  //     .then((res) => {
  //       setRequests(res.data.data);
  //     })
  //     .catch((err) => {
  //       setRequests(null);
  //     });
  // }, []);
  return (
    <ContractsContextProvider>
      <IndexContextProvider>
        <Stack>
          <SearchBar
            requests={requests}
            DataToSearch={DataToSearch}
            search={search}
          />
          <Panal />
        </Stack>
      </IndexContextProvider>
    </ContractsContextProvider>
  );
}

export type TypeDataToSearch = {
  client_id: number;
  client_phone: string;
  employee_name: string;
};
export default Contracts;
