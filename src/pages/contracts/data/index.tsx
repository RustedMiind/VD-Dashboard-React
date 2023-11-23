import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../constants";
import { ContractRequest } from "../../../types/ContractRequest";
import SearchBar from "./SearchBar";
import Panal from "./Panal";
function Contracts() {
  //  object have data to search
  const DataToSearch: TypeDataToSearch = {
    phone: "",
    name: "",
    employee: "",
  };
  const [requests, setRequests] = useState<ContractRequest[] | null>(null);
  function search() {
    console.log(DataToSearch);
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
  name: string;
  phone: string;
  employee: string;
};
export default Contracts;
