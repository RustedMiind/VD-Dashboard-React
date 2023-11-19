import { Stack, Typography, Box, Tabs, Tab, Paper } from "@mui/material";
import SearchBar from "./SearchBar";
import EmployeesRequestsTable from "./Table";
import RequestTypesToggles from "./Toggles";
import { useEffect, useReducer, useState } from "react";
import { EmployeeRequest } from "../../../types";
import axios from "axios";
import { Api } from "../../../constants";
import ModelDialog from "./ModelDialog/ModelDialog";
import LoadingTable from "../../../components/LoadingTable";
import StatusDialog from "./StatusDialog";
import reducer, { FiltersInit } from "./Filters/reducer";
import DetailsDialog from "./DetailsDialog";
import { CountType } from "../../../types/Count";

function EmplyeesRequests() {
  const [currentTab, setCurrentTab] = useState<number>(-1);

  const [filters, dispatch] = useReducer(reducer, FiltersInit);
  const [requests, setRequests] = useState<
    EmployeeRequest[] | "loading" | "none" | "error"
  >("loading");
  const [counts, setCounts] = useState<CountType[] | null>(null);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<number | undefined>(
    undefined
  );
  const [dialogOpen, setDialogOpen] = useState<
    undefined | "model" | "status" | "details"
  >(undefined);
  const [dialogRequest, setdialogRequest] = useState<EmployeeRequest | null>(
    null
  );
  const IS_REQUESTS_EXISTS = typeof requests === "object";

  let filtered: EmployeeRequest[] | undefined = IS_REQUESTS_EXISTS
    ? requests
    : undefined;

  function handleOpenModel(request: EmployeeRequest) {
    return () => {
      setdialogRequest(request);
      setDialogOpen("model");
    };
  }
  function handleOpenStatus(request: EmployeeRequest) {
    return () => {
      setdialogRequest(request);
      setDialogOpen("status");
    };
  }
  function handleOpenDetails(request: EmployeeRequest) {
    return () => {
      setdialogRequest(request);
      setDialogOpen("details");
    };
  }
  function handleCloseDialog() {
    setDialogOpen(undefined);
  }

  function resetTable() {
    setRequests("loading");
    console.log(filters);
    axios
      .get<{ requests: EmployeeRequest[]; count: CountType[] }>(
        Api("employee/general-requests/requests"),
        {
          params: {
            type: selectedType,
            search: search || null,
            ...{
              edate: filters.edate || null,
              sdate: filters.sdate || null,
              order: filters.order,
              action: currentTab !== -1 ? currentTab : null,
            },
          },
        }
      )
      .then(({ data }) => {
        setRequests(data.requests);
        setCounts(data.count);
        console.log(data);
      })
      .catch((err) => {
        setRequests("error");
        console.log(err);
      });
  }
  useEffect(resetTable, [selectedType, currentTab]);

  return (
    <>
      <ModelDialog
        resetTable={resetTable}
        open={dialogOpen === "model"}
        onClose={handleCloseDialog}
        onSubmit={() => {}}
        request={dialogRequest}
        modelType={dialogRequest?.nextStep?.model}
      />
      <StatusDialog
        open={dialogOpen === "status"}
        onClose={handleCloseDialog}
        request={dialogRequest}
      />
      <DetailsDialog
        open={dialogOpen === "details"}
        onClose={handleCloseDialog}
        requestId={dialogRequest?.id || 0}
      />
      <Stack>
        <Typography variant="h5" fontWeight={600} mb={3}>
          طلبات الموظفين
        </Typography>
        <SearchBar
          applySearch={resetTable}
          search={search}
          setSearch={setSearch}
          filters={filters}
          dispatch={dispatch}
        />
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
            counts={counts}
          />

          <Tabs
            aria-label="basic tabs example"
            value={currentTab}
            onChange={(e, v) => {
              setCurrentTab(v);
            }}
          >
            <Tab label="الكل" value={-1} />
            <Tab label="الوارد" value={0} />
            <Tab label="الصادر" value={1} />
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
              openModel={handleOpenModel}
              openStatus={handleOpenStatus}
              openDetails={handleOpenDetails}
              requests={filtered}
            />
          )}
          {requests === "loading" && (
            <LoadingTable rows={8} cols={7} height={500} />
          )}
          {requests === "error" && (
            <Typography
              variant="h4"
              color="error"
              textAlign="center"
              fontWeight={700}
              p={1}
              py={4}
            >
              حدث خطأ في عرض الطلبات.
              <br />
              <br />
              برجاء اعادة المحاولة مرة اخري
            </Typography>
          )}
        </Paper>
      </Stack>
    </>
  );
}

export default EmplyeesRequests;
