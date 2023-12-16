import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { Contract } from "../../../types";
import { TypeDataToSearch } from "./PageContent";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../constants";
import { ContractsContext } from "../Context/ContractsContext";
import { Client } from "../../../types/Clients";

function GridChildren(props: { children: React.ReactNode }) {
  return <Stack px={1}>{props.children}</Stack>;
}

function SearchBar() {
  const DataToSearch: TypeDataToSearch = {
    client_phone: "",
    client_id: 0,
    employee_name: "",
  };
  let [contractSearch, setContractSearch] = useState<Client[] | null>(null);

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
    <Box component="form" noValidate autoComplete="on">
      <Grid container>
        <Grid item sx={{ display: "flex", flexDirection: "row" }} md={10}>
          <Grid item md={4}>
            <GridChildren>
              <TextField
                label="رقم تليفون العميل"
                type="number"
                size="small"
                fullWidth
                onChange={(e) => {
                  DataToSearch.client_phone = e.target.value;
                }}
              />
            </GridChildren>
          </Grid>

          <Grid item md={4}>
            <GridChildren>
              <TextField
                label="اسم العميل"
                select
                fullWidth
                size="small"
                onChange={(e) => {
                  DataToSearch.client_id = parseInt(e.target.value);
                }}
              >
                {contractSearch?.map((request) => (
                  <MenuItem key={request.id} value={request.id}>
                    {request.name}
                  </MenuItem>
                ))}
              </TextField>
            </GridChildren>
          </Grid>
          <Grid item md={4}>
            <GridChildren>
              <TextField
                fullWidth
                label="المهندس المسؤول"
                size="small"
                onChange={(e) => {
                  DataToSearch.employee_name = e.target.value;
                }}
              />
            </GridChildren>
          </Grid>
        </Grid>
        <Grid item md={2}>
          <GridChildren>
            <Button variant="contained" fullWidth onClick={search}>
              بحث
            </Button>
          </GridChildren>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchBar;
