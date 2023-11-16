import { Stack, Typography, Box, Tabs, Tab, Paper } from "@mui/material";
import SearchBar from "./SearchBar";
import EmployeesRequestsTable from "./Table";
import RequestTypesToggles from "./Toggles";
import { useEffect, useState } from "react";
import { EmployeeRequest } from "../../../types";
import axios from "axios";
import { Api } from "../../../constants";
import ModelDialog from "./ModelDialog/ModelDialog";
import LoadingTable from "../../../components/LoadingTable";

function EmplyeesRequests() {
  const [currentTab, setCurrentTab] = useState("1");
  const [requests, setRequests] = useState<
    EmployeeRequest[] | "loading" | "none" | "error"
  >("loading");
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<number | undefined>(
    undefined
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogRequest, setdialogRequest] = useState<EmployeeRequest | null>(
    null
  );
  const IS_REQUESTS_EXISTS = Array.isArray(requests);

  let filtered: EmployeeRequest[] | undefined = IS_REQUESTS_EXISTS
    ? requests
    : undefined;

  function handleOpenModal(request: EmployeeRequest) {
    return () => {
      setdialogRequest(request);
      setDialogOpen(true);
    };
  }
  function handleCloseModal() {
    setDialogOpen(false);
  }

  function resetTable() {
    setRequests("loading");
    axios
      .get<{ requests: EmployeeRequest[] }>(
        Api("employee/general-requests/requests"),
        {
          params: {
            type: selectedType,
          },
        }
      )
      .then(({ data }) => {
        setRequests(data.requests);
        console.log(data);
      })
      .catch((err) => {
        setRequests("error");
        console.log(err);
      });
  }
  useEffect(resetTable, [selectedType]);

  return (
    <>
      <ModelDialog
        resetTable={resetTable}
        open={dialogOpen}
        onClose={handleCloseModal}
        onSubmit={() => {}}
        request={dialogRequest}
        modelType={dialogRequest?.nextStep?.model}
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
            selected={selectedType}
            setSelected={setSelectedType}
          />

          <Tabs
            aria-label="basic tabs example"
            value={currentTab}
            onChange={(e, v) => {
              setCurrentTab(v);
            }}
          >
            <Tab label="الكل" value={"1"} />
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
          {requests === "loading" && (
            <LoadingTable rows={8} cols={7} height={500} />
          )}
          {requests === "error" && (
            <Typography variant="h4" color="error">
              حدث خظأ في عرض الطلبات
            </Typography>
          )}
        </Paper>
      </Stack>
    </>
  );
}

export default EmplyeesRequests;
