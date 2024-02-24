import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Loader from "../../../components/Loading/Loader";
import NotFound from "../../../components/NotFound";
import DataTableOfWorkOrders from "./components/DataTable";
import axios from "axios";
import { Api } from "../../../constants";
import { useSnackbar } from "notistack";
import { work_instruction } from "../../../types/electricity/work_instruction";

const WorkOrdersPage = () => {
  // TODO::Declare our component state
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [itemToEdit, setItemToEdit] = useState<work_instruction | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigator = useNavigate();
  const [items, setItems] = useState<work_instruction[]>([]);

  //TODO::declare helpers varables
  const AddBtn = (
    <Button
      variant="contained"
      onClick={() => navigator("add")}
      startIcon={<AddCircleOutlineIcon />}
    >
      اضافة أمر عمل
    </Button>
  );
  //TODO::Declare helper functions
  const getData = () => {
    // work_instructions
    setLoading(true);
    let params = "";
    if (search?.length) {
      if (search.match(/^\d/)) params = `?reference_number=${search}`;
      // else params = `?name=${search}`;
    }
    axios
      .get<{ work_instructions: work_instruction[] }>(
        Api(`employee/work-instruction${params}`)
      )
      .then(({ data }) => {
        console.log("Response data:-", data);
        setItems(data.work_instructions);
      })
      .catch((err) => {
        console.log("Error in fetch work_tupe_instructions:", err);
        setLoading(false);
        enqueueSnackbar("تعذر في تحميل البيانات ", { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleDeleteSelectedItems = () => {
    setLoading(true);
    axios
      .delete(Api("employee/work-instruction/delete"), {
        data: { ids: selectedItems },
      })
      .then((res) => {
        setSelectedItems([]);
        enqueueSnackbar("تم الحذف بنجاح");
        getData();
      })
      .catch((err) => {
        console.log("Error in delete:", err);
        enqueueSnackbar("تعذر حذف البيانات", { variant: "error" });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedItems?.length == 1) {
      let targetElement = items.filter((ele) => ele.id == selectedItems[0])[0];
      console.log("Targtet Item:-", targetElement);
      setItemToEdit(targetElement);
    } else {
      setItemToEdit(null);
    }
  }, [selectedItems]);

  //*Loading case
  if (loading) return <Loader h="88vh" />;

  // *There is no data
  if (!loading && items?.length == 0)
    return (
      <>
        <NotFound
          height="60vh"
          title={
            <>
              <Box>
                <Typography sx={{ color: "text.secondary" }} variant="body1">
                  لايوجد بيانات
                </Typography>
                <Typography sx={{ color: "text.secondary" }} variant="body2">
                  قم بأنشاء أمر عمل جديد
                </Typography>
              </Box>
              {AddBtn}
            </>
          }
        />
      </>
    );

  // *Normal Case
  return (
    <>
      <SearchBar getData={getData} search={search} setSearch={setSearch} />
      {/* export from excel and follow employees btns */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          marginY: "2rem",
        }}
      >
        <Button
          variant="contained"
          //  disabled
          startIcon={<CloudUploadOutlinedIcon />}
          type={"button"}
        >
          أستيراد من ملف Excel
        </Button>
        <Button
          variant="outlined"
          //  disabled
          type={"button"}
          sx={{ color: "secondary.main", borderColor: "secondary.main" }}
        >
          متابعة الموظفين
        </Button>
      </Box>
      {/* data table */}
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
          <Box>{AddBtn}</Box>
          <Stack direction="row" spacing={2}>
            <Button
              disabled={selectedItems?.length !== 1}
              variant="outlined"
              onClick={() => {
                console.log("itemToEdit", itemToEdit);
                navigator(`edit/${selectedItems[0]}`, { state: itemToEdit });
              }}
              startIcon={<EditIcon />}
            >
              تعديل
            </Button>
            <Button
              color="error"
              variant="outlined"
              disabled={!selectedItems?.length}
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteSelectedItems()}
            >
              حذف
            </Button>
          </Stack>
        </Box>
        <DataTableOfWorkOrders
          items={items}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </Paper>
    </>
  );
};

export default WorkOrdersPage;
