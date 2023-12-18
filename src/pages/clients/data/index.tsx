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
import DeleteIcon from "@mui/icons-material/Delete";

function ClientData() {
  const [open, setOpen] = useState(false);
  // search bar
  const [requests, setRequests] = useState<Client[] | "loading" | "error">(
    "loading"
  );
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState<string>("5");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  function deleteClients() {
    axios
      .post(Api("employee/client/delete"), { id: selectedItems })
      .then(() => {
        getRequests();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let anyClientHasContracts = false;
  typeof requests === "object" &&
    selectedItems.forEach((id) => {
      !!requests.find(
        (client) =>
          client.id === id &&
          client.contracts_count &&
          client.contracts_count > 0
      ) && (anyClientHasContracts = true);
    });

  const deleteDisabled = selectedItems.length === 0 || anyClientHasContracts;
  const updateDisabled = selectedItems.length !== 1;
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
        setSelectedItems([]);
        setRequests(data.data);
      })
      .catch((err) => {
        setRequests("error");
      });
  }
  // Get Clients
  useEffect(getRequests, [limit]);
  console.log(selectedItems);
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
                    disabled={updateDisabled}
                    component={NavLink}
                    to={`${selectedItems[0]}/edit`}
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
            <Button
              color="error"
              variant="outlined"
              disabled={deleteDisabled}
              startIcon={<DeleteIcon />}
              onClick={deleteClients}
            >
              حذف
            </Button>
          </Box>
          {requests === "loading" && <LoadingTable rows={5} cols={9} />}
          {requests === "error" && <NotFound title="حدث خطأ حاول مرة أخرى" />}
          {typeof requests === "object" && (
            <ClientRequestsTable
              requests={requests}
              setLimit={setLimit}
              limit={limit}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          )}
        </Paper>
      </IndexContextProvider>
    </Stack>
  );
}

export default ClientData;
