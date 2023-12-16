import { Stack, Typography, Box, Paper, Button } from "@mui/material";
import SearchBar from "./SearchBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../constants";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { NavLink } from "react-router-dom";
import ClientRequestsTable from "./Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteBtn from "./DeleteButton/DeleteBtn";
import SearchDialog from "./SearchDialog";
import { IndexContextProvider } from "../Context/Store";
import LoadingTable from "../../../components/LoadingTable";
import NotFound from "../../../components/NotFound";
import { Client } from "../../../types/Clients";

function ClientData() {
  const [open, setOpen] = useState(false);
  // search bar
  const [requests, setRequests] = useState<Client[] | "loading" | "error">(
    "loading"
  );
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState<string>("5");
  console.log(limit);

  const handleClickOpen = () => {
    setOpen(true);
  };
  function getRequests(advancedSearchParams?: unknown) {
    setRequests("loading");
    axios
      .get<{ data: Client[] }>(Api("employee/client"), {
        params: advancedSearchParams || {
          search,
          limit,
        },
      })
      .then(({ data }) => {
        setRequests(data.data);
      })
      .catch((err) => {
        setRequests("error");
      });
  }
  // Get Clients
  useEffect(getRequests, [limit]);

  return (
    <Stack>
      <IndexContextProvider>
        <Typography variant="h5" fontWeight={600} mb={3}>
          بيانات العملاء
        </Typography>
        <SearchBar
          search={search}
          setSearch={setSearch}
          getRequests={getRequests}
          openAdvancedSearchDialog={() => {
            setOpen(true);
          }}
        />
        <Typography variant="h6" fontWeight={600} mb={3} mt={2}>
          العملاء
        </Typography>

        <Paper
          sx={{
            overflow: "hidden",
            mb: 7,
          }}
          elevation={4}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection="row"
            flexWrap="wrap"
            alignItems="end"
            padding={3}
          >
            <Box>
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                component={NavLink}
                to={"add"}
              >
                اضافة عميل جديد
              </Button>
              {requests?.length !== 0 && (
                <>
                  <Button
                    sx={{ ml: 2 }}
                    variant="contained"
                    onClick={handleClickOpen}
                    startIcon={<EditIcon />}
                  >
                    تعديل بيانات عميل
                  </Button>
                </>
              )}
              <SearchDialog
                open={open}
                onClose={() => {
                  setOpen(false);
                }}
                getClients={getRequests}
              />
            </Box>
            {requests?.length !== 0 && (
              <>
                {typeof requests === "object" && (
                  <DeleteBtn setRequests={setRequests} requests={requests} />
                )}
              </>
            )}
          </Box>
          {requests === "loading" && <LoadingTable rows={5} cols={9} />}
          {requests === "error" && <NotFound title="حدث خطأ حاول مرة أخرى" />}
          {typeof requests === "object" && (
            <ClientRequestsTable
              requests={requests}
              setLimit={setLimit}
              limit={limit}
            />
          )}
        </Paper>
      </IndexContextProvider>
    </Stack>
  );
}

export default ClientData;
