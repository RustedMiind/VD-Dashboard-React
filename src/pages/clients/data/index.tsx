import { Stack, Typography, Box, Paper, Button } from "@mui/material";
import SearchBar from "./SearchBar";
import React, { useEffect, useState } from "react";
import { ClientRequest } from "../../../types";
import axios from "axios";
import { Api } from "../../../constants";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { NavLink } from "react-router-dom";
import ClientRequestsTable from "./Table";
import DeleteBtn from "./DeleteButton/DeleteBtn";
import PopUp from "./PopUp/PopUp";
import { IndexContextProvider } from "../Context/Store";

function ClientData() {
  const [open, setOpen] = useState<
    Boolean | React.Dispatch<React.SetStateAction<Boolean>>
  >(false);

  // search bar
  const [requests, setRequests] = useState<ClientRequest[] | null>(null);
  const [search, setSearch] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  function getRequests() {
    axios
      .get<{ data: ClientRequest[] }>(Api("employee/client"), {
        params: {
          search,
        },
      })
      .then(({ data }) => {
        setRequests(data.data);
      })
      .catch((err) => {
        setRequests(null);
      });
  }
  // Get Clients
  useEffect(getRequests, []);
  // const filtered = searchResult?.length?searchResult:requests

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
        />
        <Typography variant="h6" fontWeight={600} mb={3} mt={2}>
          العملاء
        </Typography>

        <Paper
          sx={{
            bgcolor: "Background",
            overflow: "hidden",
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
              <Button
                sx={{ ml: 2 }}
                variant="contained"
                onClick={handleClickOpen}
              >
                تعديل بيانات عميل
              </Button>
              <PopUp open={open} setOpen={setOpen} />
            </Box>
            <Box>
              <DeleteBtn setRequests={setRequests} requests={requests} />
            </Box>
          </Box>

          <ClientRequestsTable requests={requests} />
        </Paper>
      </IndexContextProvider>
    </Stack>
  );
}

export default ClientData;
