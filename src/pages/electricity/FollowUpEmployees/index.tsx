import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import { Box, Button, Typography, Breadcrumbs, Paper, Link, Stack, Tab, Tabs as MuiTabs} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DataTableOfWorkOrders from "./components/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { WorkOrderType } from "../../../types/electricity/WorkOrderType";
import axios from "axios";
import { Api } from "../../../constants";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loading/Loader";
import NotFound from "../../../components/NotFound";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Views from "./Views";


// function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }

export enum TabsEnum {
  INCOMING = "incoming",
  ONGOING = "ongoing",
}



export default function FollowUpEmployees() {
  // TODO::Declare our variables
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<WorkOrderType[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [itemToEdit, setItemToEdit] = useState<WorkOrderType | null>(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigator = useNavigate();
  const [tab, setTab] = useState<TabsEnum>(TabsEnum.INCOMING);

  const handleChange = (event: React.SyntheticEvent, newValue: TabsEnum) => {
    setTab(newValue);
  };



  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" >
      لوحة التحكم
    </Link>,
    
    <Typography key="3" color="text.primary">
      متابعة الموظفين
    </Typography>,
  ];

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
      
      <Breadcrumbs
         separator={<NavigateNextIcon fontSize="small" />}
         aria-label="breadcrumb"
         dir="rtl"
      >
      {breadcrumbs}
      </Breadcrumbs>









      <Paper
        sx={{
          overflow: "hidden",
          mb: 7,
          marginTop: "5rem",
        }}
        elevation={4}
      >
        {/* <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="row"
          flexWrap="wrap"
          alignItems="end"
          padding={3}
        >
        







        </Box> */}

<Stack>
      {/* Tabs Navigation */}
      <MuiTabs value={tab} onChange={handleChange}>
        <Tab value={TabsEnum.INCOMING} label="التقارير" />
        <Tab value={TabsEnum.ONGOING} label="الخريطة" />
        <Tab value={TabsEnum} label="المرفقات" />
      </MuiTabs>
      {/* View */}
      <Views tab={tab} />
    </Stack>
        
      </Paper>
    </>
  );
}
