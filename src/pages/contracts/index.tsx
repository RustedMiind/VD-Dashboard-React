import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../constants";
import { ContractRequest } from "../../types/ContractRequest";
import SearchBar from "./SearchBar";
import Panal from "./Panal";
function Contracts() {
  //  object have data to search
  const DataToSearch: TypeDataToSearch = {
    client_phone: "",
    client_id: 0,
    employee_name: "",
  };
  const [requests, setRequests] = useState<ContractRequest[] | null>(null);
  function search() {
    console.log(DataToSearch);

    axios
      .get<{ data: ContractRequest[] }>(Api("employee/contract"), {
        params: {
          client_phone: DataToSearch.client_phone,
          client_id: DataToSearch.client_id,
          employee_name: DataToSearch.employee_name,
        },
      })
      .then((res) => {
        console.log(res);

        setRequests(res.data.data);
      })
      .catch((err) => {
        setRequests(null);
      });
  }
  useEffect(() => {
    axios
      .get<{ data: ContractRequest[] }>(Api("employee/contract"))
      .then((res) => {
        setRequests(res.data.data);
      })
      .catch((err) => {
        setRequests(null);
      });
  }, []);
  return (
    <Stack>
      <SearchBar
        requests={requests}
        DataToSearch={DataToSearch}
        search={search}
      />
      <Panal requests={requests} />
    </Stack>
  );
}

export type TypeDataToSearch = {
  client_id: number;
  client_phone: string;
  employee_name: string;
};
export default Contracts;
