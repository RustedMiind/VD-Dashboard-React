import { Stack, Typography, Box, Tabs, Tab, Paper } from "@mui/material";
import SearchBar from "./SearchBar";
import EmployeesRequestsTable from "./Table";
import RequestTypesToggles from "./Toggles";
import { useEffect, useState } from "react";
import { EmployeeRequest } from "../../../types";
import axios from "axios";
import { Api } from "../../../constants";
import { requestTypes } from "./RequestTypes";

function ClientData() {
  const [currentTab, setCurrentTab] = useState("1");
  const [requests, setRequests] = useState<EmployeeRequest[] | undefined>(
    undefined
  );
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<number[]>([]);

  let filtered: EmployeeRequest[] | undefined = requests;

  if (search) {
    const searchLowerCase = search.toLowerCase();
    const filter = requests?.filter((request) => {
      return request.employee.name
        .toLocaleLowerCase()
        .includes(searchLowerCase);
    });
    filtered = filter || undefined;
  }
  if (selectedTypes.length) {
    const filter = filtered?.filter((request) => {
      let found = false;
      selectedTypes.forEach((selection) => {
        const temp = requestTypes.find((x) => x.name === selection);
        // if (found) {
        //   return;
        // }
        if (
          temp &&
          request.requestable_type
            .toLowerCase()
            .includes(temp?.prefix.toLowerCase())
        ) {
          found = true;
        }
      });
      return found;
    });
    filtered = filter || undefined;
  }

  useEffect(() => {
    axios
      .get<{ requests: EmployeeRequest[] }>(
        Api("employee/general-requests/requests")
      )
      .then(({ data }) => {
        setRequests(data.requests);
        console.log(data);
      })
      .catch((err) => {
        setRequests(undefined);
        console.log(err);
      });
  }, []);

  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} mb={3}>
        بيانات العملاء
      </Typography>
      <SearchBar search={search} setSearch={setSearch} />
      <Typography variant="h6" fontWeight={600} mb={3} >
        العملاء
      </Typography>
      <Paper
        // variant="outlined"
        sx={{
          //
          bgcolor: "Background",
          overflow: "hidden",
        }}
        elevation={4}
      >
        {filtered && <EmployeesRequestsTable selectedData={selectedData} setSelectedData={setSelectedData} requests={filtered} />}
      </Paper>
    </Stack>
  );
}

export default ClientData;
