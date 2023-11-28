import axios from "axios";
import { Api } from "../../../constants";
import { Box, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import LoadingTable from "../../../components/LoadingTable";
import { PanelData } from "./types";
import reducer, { FiltersInit } from "./Filter/reducer";

const ClientRequests = () => {
  const [filters, dispatch] = useReducer(reducer, FiltersInit);
  const [currentTab, setCurrentTab] = useState<number>(-1);
  const [requests, setRequests] = useState<
    PanelData[] | "loading" | "none" | "error"
  >("loading");
  const [dialogRequest, setDialogRequest] = useState<PanelData | null>(null);
  const [dialogOpen, setDialogOpen] = useState<
    undefined | "model" | "status" | "details"
  >(undefined);
  const [selectedType, setSelectedType] = useState<number | undefined>(
    undefined
  );
  const [search, setSearch] = useState("");

  const getRequests = () => {
    setRequests("loading");
    console.log(filters);
    axios
      .get<{ data: PanelData[] }>(Api("employee/client/order"), {
        params: {
          type: selectedType || null,
          search: search || null,
          ...{
            dateFrom: filters.dateFrom || null,
            dateTo: filters.dateTo || null,
            statusOrder: filters.statusOrder || null,
            branch_id: filters.branch_id || null,
            typeOrder: filters.typeOrder || null,
            orderBy: filters.orderBy || null,
          },
        },
      })
      .then(({ data }) => {
        setRequests(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenModel = (request: PanelData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("model");
    };
  };

  const handleOpenStatus = (request: PanelData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("status");
    };
  };
  const handleOpenDetails = (request: PanelData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("details");
    };
  };
  const handleCloseDialog = () => {
    setDialogOpen(undefined);
  };

  useEffect(getRequests, [selectedType, currentTab]);

  return (
    <>
      <Stack>
        <Typography variant="h5" fontWeight={600} mb={3}>
          طلبات العملاء
        </Typography>

        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          flexDirection="row-reverse"
          flexWrap="wrap"
          alignItems="end"
        >
          <Tabs
            aria-label="basic tabs example"
            value={currentTab}
            onChange={(e, v) => {
              setCurrentTab(v);
            }}
          >
            <Tab label="الكل" value={-1} />
            <Tab label="فرد" value={0} />
            <Tab label="شركة" value={1} />
          </Tabs>
        </Box>
        <Paper sx={{ overflow: "hidden" }} elevation={0}>
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
};

type ResponseType = {
  data: PanelData[];
  msg?: string;
  success: boolean;
};

export default ClientRequests;
