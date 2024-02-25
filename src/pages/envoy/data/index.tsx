import { Stack, Typography, Box, Paper, Button } from "@mui/material";
import SearchBar from "./SearchBar";
import React, { useContext, useEffect, useMemo, useState } from "react";
import TableContainerComponent from "./Table";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SetDialog from "./SetDialog";
import EnvoysContextProvider, { EnvoysContext } from "./context";
import EditIcon from "@mui/icons-material/Edit";
import { Envoy } from "../../../types/Envoys/Envoy";
import { Api } from "../../../constants";
import axios from "axios";
import { useSnackbar } from "notistack";

const EnvoysDataPage = () => (
  <EnvoysContextProvider>
    <Consumer />
  </EnvoysContextProvider>
);

function Consumer() {
  const [search, setSearch] = useState("");
  const [envoyDialogOpen, setEnvoyDialogOpen] = useState<
    "none" | "edit" | "create"
  >("none");
  const handleCloseEnvoyDialog = () => setEnvoyDialogOpen("none");
  const openCreateEnvoyDialog = () => {
    setEnvoyDialogOpen("create");
  };
  const openEditEnvoyDialog = () => {
    setEnvoyDialogOpen("edit");
  };
  // const toggleEnvoyDialog = () => setEnvoyDialogOpen(!envoyDialogOpen);
  const {
    state,
    selectedEnvoys,
    unselectAllEnvoys,
    setEnvoys,
    setError,
    setLoading,
  } = useContext(EnvoysContext);
  const { envoys } = state;
  const { enqueueSnackbar } = useSnackbar();
  const selectedEnvoyToEdit = envoys?.find((e) => e.id === selectedEnvoys[0]);

  const getEnvoysData = () => {
    axios
      .get<{ representatives: Envoy[] }>(Api("employee/representative"))
      .then(({ data }) => {
        setEnvoys(data.representatives);
        console.log(data);
      })
      .catch((err) => {
        setError();
        enqueueSnackbar(
          err?.response?.data?.msg ||
            err?.response?.data?.message ||
            err?.response?.message ||
            "تعذر في تحميل بيانات المناديب",
          { variant: "error" }
        );
      });
  };

  useEffect(() => {
    setLoading();
    getEnvoysData();
  }, []);
  return (
    <Stack>
      <SetDialog
        dialogProps={{
          onClose: handleCloseEnvoyDialog,
          open: envoyDialogOpen === "create" || envoyDialogOpen === "edit",
        }}
        envoyToEdit={
          envoyDialogOpen === "edit" ? selectedEnvoyToEdit : undefined
        }
        addEnvoy={(envoy: Envoy, isEdit?: boolean) => {
          if (envoys) {
            isEdit
              ? setEnvoys(
                  envoys.map((e) => {
                    if (e.id === envoy.id) return envoy;
                    return e;
                  })
                )
              : setEnvoys([...envoys, envoy]);
            getEnvoysData();
          }
        }}
      />
      <Typography variant="h5" fontWeight={600} mb={3}>
        بيانات المناديب
      </Typography>
      <SearchBar search={search} setSearch={setSearch} />
      <Typography variant="h6" fontWeight={600} mb={3} mt={2}>
        المناديب
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
              onClick={openCreateEnvoyDialog}
              startIcon={<AddCircleOutlineIcon />}
            >
              اضافة مندوب جديد
            </Button>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              disabled={selectedEnvoys.length !== 1}
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={openEditEnvoyDialog}
            >
              تعديل
            </Button>
            <Button
              color="error"
              variant="outlined"
              disabled={!selectedEnvoys.length}
              startIcon={<DeleteIcon />}
              onClick={() => {
                axios
                  .delete(Api("employee/contractor/delete"), {
                    data: { ids: selectedEnvoys },
                  })
                  .then((res) => {
                    unselectAllEnvoys();
                    enqueueSnackbar("تم حذف المناديب المختارة بنجاح");
                  })
                  .catch((err) => {
                    enqueueSnackbar(
                      err?.response?.data?.msg ||
                        err?.response?.data?.message ||
                        err?.response?.message ||
                        "تعذر في تحميل بيانات المناديب",
                      { variant: "error" }
                    );
                  });
              }}
            >
              حذف
            </Button>
          </Stack>
        </Box>
        <TableContainerComponent />
      </Paper>
    </Stack>
  );
}

export default EnvoysDataPage;
