import { Stack, Typography, Box, Tabs, Tab, Paper } from "@mui/material";
import SearchBar from "./SearchBar";
import EmployeesRequestsTable from "./Table";
import RequestTypesToggles from "./Toggles";
import { useEffect, useState } from "react";
import { EmployeeRequest } from "../../../types";
import axios from "axios";
import { Api } from "../../../constants";
import { requestTypes } from "./RequestTypes";
import ModelDialog from "./ModelDialog/ModelDialog";

function EmplyeesRequests() {
  const [currentTab, setCurrentTab] = useState("1");
  const [requests, setRequests] = useState<EmployeeRequest[] | undefined>(
    undefined
  );
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogRequest, setdialogRequest] = useState<EmployeeRequest | null>(
    null
  );

  let filtered: EmployeeRequest[] | undefined = requests;

  function handleOpenModal(request: EmployeeRequest) {
    return () => {
      setdialogRequest(request);
      setDialogOpen(true);
    };
  }
  function handleCloseModal() {
    setDialogOpen(false);
  }

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
    <>
      <ModelDialog
        open={dialogOpen}
        onClose={handleCloseModal}
        onSubmit={() => {}}
        request={dialogRequest}
      />
      <Stack>
        <Typography variant="h5" fontWeight={600} mb={3}>
          طلبات الموظفين
        </Typography>
        <SearchBar search={search} setSearch={setSearch} />
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          flexDirection="row-reverse"
          flexWrap="wrap"
          alignItems="end"
        >
          <RequestTypesToggles
            selected={selectedTypes}
            setSelected={setSelectedTypes}
          />

          <Tabs
            aria-label="basic tabs example"
            value={currentTab}
            onChange={(e, v) => {
              setCurrentTab(v);
            }}
          >
            <Tab label="الكل" value={"1"} />
            <Tab label="الوارد" value={"2"} disabled />
            <Tab label="الصادر" value={"3"} disabled />
          </Tabs>
        </Box>
        <Paper
          // variant="outlined"
          sx={{
            //
            bgcolor: "Background",
            overflow: "hidden",
          }}
          elevation={4}
        >
          {filtered && (
            <EmployeesRequestsTable
              openModal={handleOpenModal}
              requests={filtered}
            />
          )}
        </Paper>
      </Stack>
    </>
  );
}

export default EmplyeesRequests;
