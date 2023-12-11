import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { ClientRequest, Contract } from "../../../types";
import { TypeDataToSearch } from "./PageContent";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../constants";
import { ContractsContext } from "../Context/ContractsContext";

function SearchBar() {
  const DataToSearch: TypeDataToSearch = {
    client_phone: "",
    client_id: 0,
    employee_name: "",
  };
  let [contractSearch, setContractSearch] = useState<ClientRequest[] | null>(
    null
  );

  useEffect(() => {
    axios
      .get<Contract>(Api("employee/contract/use"))
      .then((res) => {
        setContractSearch(res?.data.client);
      })
      .catch((err) => {
        console.log(err);

        setContractSearch(null);
      });
  }, []);
  let contractsContext = useContext(ContractsContext);

  function search() {
    contractsContext.setContracts &&
      contractsContext.setContracts(DataToSearch);
  }
  return (
    <>
      <Stack direction="row" gap={4} my={2}>
        <TextField
          placeholder="رقم تليفون العميل"
          type="number"
          size="small"
          sx={{ flexGrow: 1 }}
          onChange={(e) => {
            DataToSearch.client_phone = e.target.value;
          }}
        />
        <TextField
          label="اسم العميل"
          select
          InputLabelProps={{ sx: { color: "#abc2db" } }}
          id="outlined-select-currency"
          size="small"
          sx={{ flexGrow: 2 }}
          onChange={(e) => {
            DataToSearch.client_id = parseInt(e.target.value);
          }}
        >
          <MenuItem>
            <em>اسم العميل</em>
          </MenuItem>
          {contractSearch?.map((request) => (
            <MenuItem key={request.id} value={request.id}>
              {request.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          placeholder="المهندس المسؤول"
          size="small"
          sx={{ flexGrow: 1 }}
          onChange={(e) => {
            DataToSearch.employee_name = e.target.value;
          }}
        />
        <Button variant="contained" onClick={search}>
          بحث
        </Button>
      </Stack>
    </>
  );
}

export default SearchBar;
