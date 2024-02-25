import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import { Box, Button, Stack, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DataTableOfWorkOrders from "./components/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { WorkOrderType } from "../../../types/electricity/WorkOrderType";
import axios from "axios";
import { Api } from "../../../constants";
import { useSnackbar } from "notistack";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loading/Loader";
import NotFound from "../../../components/NotFound";

export default function WorkOrderPage() {
  // TODO::Declare our variables
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<WorkOrderType[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [itemToEdit, setItemToEdit] = useState<WorkOrderType | null>(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigator = useNavigate();

  //TODO::declaration of helper functions
  const getData = () => {
    setLoading(true);
    let params = "";
    if (search?.length) {
      if (search.match(/^\d/)) params = `?reference_number=${search}`;
      else params = `?name=${search}`;
    }
    axios
      .get<{ work_type_instructions: WorkOrderType[] }>(
        Api(
          `employee/type-work-instruction${params}`
        )
      )
      .then(({ data }) => {
        console.log("Response data:-", data);
        setItems(data.work_type_instructions);
      })
      .catch((err) => {
        console.log("Error in fetch work_tupe_instructions:", err);
        setLoading(false);
        enqueueSnackbar(
          err?.response?.data?.msg ||
            err?.response?.data?.message ||
            err?.response?.message ||
            "تعذر في تحميل البيانات ",
          { variant: "error" }
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteSelectedItems = () => {
    setLoading(true);
    axios
      .delete(Api("employee/type-work-instruction/delete"), {
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

  const AddBtn = (
    <Button
      variant="contained"
      onClick={() => navigator("add")}
      startIcon={<AddCircleOutlineIcon />}
    >
      اضافة نوع أمر عمل
    </Button>
  );

  // TODO::fetch data of work order types
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedItems?.length == 1) {
      let targetElement = items.filter((ele) => ele.id == selectedItems[0])[0];
      setItemToEdit(targetElement);
    } else {
      setItemToEdit(null);
    }
  }, [selectedItems]);

  //*Loading case
  if (loading) return <Loader />;

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
                  قم بأنشاء نوع عمل جديد
                </Typography>
              </Box>
              {AddBtn}
            </>
          }
        />
      </>
    );
  //* Normal State
  return (
    <>
      <SearchBar search={search} setSearch={setSearch} getData={getData} />
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
}
