import { Box, Button, Stack } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useContext } from "react";
import { TableContext } from "./TableContext";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Api } from "../../../constants";
import { useSnackbar } from "notistack";
import { AxiosErrorType } from "../../../types/Axios";
import { LaravelValidationError } from "../../../types/LaravelValidationError";

function ControlSection(props: PropsType) {
  const { selectedTenderId, setTenderTableData } = useContext(TableContext);
  const snackbar = useSnackbar();
  function handleDelete() {
    axios
      .delete(Api("employee/tender"), { data: { tenderIds: selectedTenderId } })
      .then((res) => {
        snackbar.enqueueSnackbar("تم حذف المنافسات المختارة بنجاح");
        setTenderTableData && setTenderTableData();
      })
      .catch((err: AxiosErrorType<LaravelValidationError<unknown>>) => {
        snackbar.enqueueSnackbar(<>{err.response?.data?.msg}</>, {
          variant: "error",
        });
      });
  }

  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Box>
        <Button
          startIcon={<AddCircleOutlineIcon />}
          variant="contained"
          onClick={props.openCreateDialog}
        >
          إضافة منافسة
        </Button>
      </Box>
      <Stack direction={"row"} spacing={2}>
        <Button variant="outlined" startIcon={<FilterAltIcon />}>
          فلتر
        </Button>
        <Button
          disabled={selectedTenderId?.length === 0}
          onClick={handleDelete}
          color="error"
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          حذف
        </Button>
        <Button
          disabled={selectedTenderId?.length !== 1}
          variant="outlined"
          startIcon={<EditIcon />}
          component={NavLink}
          to={`edit/${selectedTenderId}`}
        >
          تعديل
        </Button>
      </Stack>
    </Stack>
  );
}

type PropsType = {
  openCreateDialog: () => void;
};

export default ControlSection;
