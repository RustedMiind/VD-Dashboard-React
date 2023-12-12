import axios from "axios";
import { Api } from "../../../constants";
import { Box, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useReducer, useRef, useState } from "react";
import LoadingTable from "../../../components/LoadingTable";
import { PanelData, StepStatusData } from "./types";
import reducer, { FiltersInit } from "./Filter/reducer";
import ClientTableComponent from "./Table";
import SearchBar from "./SearchBar";
import { CountType } from "../../../types/Count";
import RequestTypesToggles from "./Toggles";
import StatusDialog from "./StatusDialog";
import DetailsDialog from "./DetailsDialog";
import ModelDialog from "./ModelDialog";

const ClientRequests = () => {
  const tableRef: React.RefObject<HTMLTableElement> =
    useRef<HTMLTableElement>(null);
  const handlePrint = () => {
    if (tableRef.current) {
      window.print();
    }
  };
  const [filters, dispatch] = useReducer(reducer, FiltersInit);
  const [currentTab, setCurrentTab] = useState<number>(-1);
  const [requests, setRequests] = useState<
    PanelData[] | StepStatusData[] | "loading" | "none" | "error"
  >("loading");
  console.log(requests.length);
  const [dialogRequest, setDialogRequest] = useState<
    PanelData | StepStatusData | null
  >(null);
  const [dialogOpen, setDialogOpen] = useState<
    undefined | "model" | "status" | "details"
  >(undefined);
  const [selectedType, setSelectedType] = useState<number | undefined>(
    undefined
  );
  const [search, setSearch] = useState("");
  const [counts, setCounts] = useState<CountType[] | null>(null);

  const getRequests = () => {
    setRequests("loading");
    console.log(filters);
    axios
      .get<{ data: PanelData[]; count: CountType[] }>(
        Api("employee/client/order"),
        {
          params: {
            typeClient: filters.typeClient || null,
            search: search || null,
            ...{
              dateFrom: filters.dateFrom || null,
              dateTo: filters.dateTo || null,
              department_id: filters.department_id || null,
              typeOrder: filters.typeOrder || null,
              sortBy: filters.sortBy || null,
              status: filters.status || null,
            },
          },
        }
      )
      .then(({ data }) => {
        setRequests(data.data);
        setCounts(data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenModel = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("model");
    };
  };

  const handleOpenStatus = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("status");
    };
  };
  const handleOpenDetails = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("details");
    };
  };
  const handleCloseDialog = () => {
    setDialogOpen(undefined);
  };

  useEffect(getRequests, [selectedType, currentTab]);
  const IS_REQUESTS_EXISTS = typeof requests === "object";
  let filtered: PanelData[] | StepStatusData[] | undefined = IS_REQUESTS_EXISTS
    ? requests
    : undefined;

  return (
    <>
      <ModelDialog
        open={dialogOpen === "model"}
        onClose={handleCloseDialog}
        requestId={dialogRequest?.id}
        stepId={dialogRequest?.step_id}
        setRequests={getRequests}
      />
      <DetailsDialog
        open={dialogOpen === "details"}
        requestId={dialogRequest?.id}
        onClose={handleCloseDialog}
      />
      <StatusDialog
        open={dialogOpen === "status"}
        onClose={handleCloseDialog}
        setRequests={setRequests}
        id={dialogRequest?.id}
      />
      <Stack>
        <Typography variant="h5" fontWeight={600} mb={3}>
          طلبات العملاء
        </Typography>

        <SearchBar
          applySearch={getRequests}
          search={search}
          setSearch={setSearch}
          dispatch={dispatch}
          filters={filters}
          setSelectedType={setSelectedType}
          selectedType={selectedType}
          tableRef={tableRef}
          handlePrint={handlePrint}
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
              dispatch({
                type: "SET_ORDER_BY_CLIENT",
                payload: v,
              });
            }}
          >
            <Tab label="الكل" value={""} />
            <Tab label="فرد" value={"individual"} />
            <Tab label="شركة" value={"company"} />
          </Tabs>
        </Box>
        <Paper sx={{ overflow: "hidden" }} elevation={0}>
          {filtered && (
            <ClientTableComponent
              openModel={handleOpenModel}
              openStatus={handleOpenStatus}
              openDetails={handleOpenDetails}
              tableRef={tableRef}
              requests={filtered}
            />
          )}

          {requests === "loading" && (
            <LoadingTable rows={8} cols={7} />
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
};

export default ClientRequests;
