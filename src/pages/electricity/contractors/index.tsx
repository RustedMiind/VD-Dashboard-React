import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "./components/DataTable";
import ContractorsContextProvider, { ContractorsContext } from "./context";
import axios from "axios";
import { Contractor } from "../../../types/Contractors/Contractor";
import { Api } from "../../../constants";
import { useSnackbar } from "notistack";
import CreateEditDailog from "./components/CreateEditDailog";
import Loader from "../../../components/Loading/Loader";
import NotFound from "../../../components/NotFound";

export default function ElectricityConstractors() {
  // declare my state
  const [search, setSearch] = useState("");
  const [itemsLoading, setItemsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [items, setItems] = useState<Contractor[]>([]);
  const [_selectedContractorToEdit, set_selectedContractorToEdit] = useState<
    Contractor | undefined
  >();
  const [envoyDialogOpen, setEnvoyDialogOpen] = useState<
    "none" | "edit" | "create"
  >("none");

  const handleCloseEnvoyDialog = () => setEnvoyDialogOpen("none");
  const openCreateContractorDialog = () => {
    setEnvoyDialogOpen("create");
  };
  const openEditEnvoyDialog = () => {
    setEnvoyDialogOpen("edit");
  };
  const handelDeleteContractors = () => {
    console.log("ASD selectedItems", selectedItems);
    axios
      .delete(Api("employee/contractor/delete"), {
        data: { ids: selectedItems },
      })
      .then((res) => {
        console.log("Res", res);
        unselectAllContractors();
        enqueueSnackbar("تم حذف المقاولين المختارة بنجاح");
        setSelectedItems([]);
        getContractorsData();
      })
      .catch((err) => {
        enqueueSnackbar(
          err?.response?.data?.msg ||
            err?.response?.data?.message ||
            err?.response?.message ||
            "تعذر في حذف بيانات المقاولين",
          { variant: "error" }
        );
      });
  };
  const {
    state,
    setError,
    setLoading,
    setContractors,
    selectedContractors,
    selectContractor,
    toggleContractor,
    unselectContractor,
    selectAllContractors,
    unselectAllContractors,
    isAllSelected,
    isSelected,
  } = useContext(ContractorsContext);
  const { contractors } = state;
  const { enqueueSnackbar } = useSnackbar();

  // fetch data from server
  const getContractorsData = () => {
    let params = "";
    setItemsLoading(true);
    if (search.length) {
      if (search.match(/^\d/)) params = `?phone=${search}`;
      else if (search.includes("@")) params = `?email=${search}`;
      else params = `?name=${search}`;
    }

    axios
      .get<{ contractors: Contractor[] }>(Api(`employee/contractor${params}`))
      .then(({ data }) => {
        console.log("Data:", data);
        setContractors(data.contractors);
        setItems(data.contractors);
      })
      .catch((err) => {
        console.log("Error:", err);
        setError();
        enqueueSnackbar(
          err?.response?.data?.msg ||
            err?.response?.data?.message ||
            err?.response?.message ||
            "تعذر في تحميل بيانات المقاولين",
          { variant: "error" }
        );
      })
      .finally(() => {
        setItemsLoading(false);
      });
  };

  useEffect(() => {
    console.log("Search", search);
    setLoading();
    getContractorsData();
  }, []);

  //*Loading case
  if (itemsLoading) return <Loader />;

  // *There is no data
  if (!itemsLoading && items?.length == 0)
    return (
      <>
        <CreateEditDailog
          dialogProps={{
            onClose: handleCloseEnvoyDialog,
            open: envoyDialogOpen === "create" || envoyDialogOpen === "edit",
          }}
          contractorToEdit={
            envoyDialogOpen === "edit" ? _selectedContractorToEdit : undefined
          }
          isCreate={envoyDialogOpen === "create"}
          addContractor={(contract: Contractor, isEdit?: boolean) => {
            if (contractors) {
              isEdit
                ? setContractors(
                    contractors.map((e) => {
                      if (e.id === contract.id) return contract;
                      return e;
                    })
                  )
                : setContractors([...contractors, contract]);
              getContractorsData();
            }
          }}
        />
        <NotFound
          height="60vh"
          title={
            <>
              <Box>
                <Typography sx={{ color: "text.secondary" }} variant="body1">
                  لايوجد مقاولين
                </Typography>
                <Typography sx={{ color: "text.secondary" }} variant="body2">
                  قم بأنشاء مقاول جديد
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={openCreateContractorDialog}
                startIcon={<AddCircleOutlineIcon />}
              >
                اضافة مقاول
              </Button>
            </>
          }
        />
      </>
    );

  //*Normal ui
  return (
    <ContractorsContextProvider>
      <CreateEditDailog
        dialogProps={{
          onClose: handleCloseEnvoyDialog,
          open: envoyDialogOpen === "create" || envoyDialogOpen === "edit",
        }}
        contractorToEdit={
          envoyDialogOpen === "edit" ? _selectedContractorToEdit : undefined
        }
        isCreate={envoyDialogOpen === "create"}
        addContractor={(contract: Contractor, isEdit?: boolean) => {
          if (contractors) {
            isEdit
              ? setContractors(
                  contractors.map((e) => {
                    if (e.id === contract.id) return contract;
                    return e;
                  })
                )
              : setContractors([...contractors, contract]);
            getContractorsData();
          }
        }}
      />
      <SearchBar
        search={search}
        setSearch={setSearch}
        getContractorsData={getContractorsData}
      />
      <Paper
        sx={{
          overflow: "hidden",
          mb: 7,
          marginTop: "5rem",
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
              onClick={openCreateContractorDialog}
              startIcon={<AddCircleOutlineIcon />}
            >
              اضافة مقاول
            </Button>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              disabled={selectedItems.length !== 1}
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={openEditEnvoyDialog}
            >
              تعديل
            </Button>
            <Button
              color="error"
              variant="outlined"
              disabled={!selectedItems.length}
              startIcon={<DeleteIcon />}
              onClick={() => {
                console.log("ASD");
                handelDeleteContractors();
              }}
            >
              حذف
            </Button>
          </Stack>
        </Box>
        <DataTable
          contractors={items}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          set_selectedContractorToEdit={set_selectedContractorToEdit}
        />
      </Paper>
    </ContractorsContextProvider>
  );
}
