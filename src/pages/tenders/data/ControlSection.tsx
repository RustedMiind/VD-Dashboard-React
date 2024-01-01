import { Box, Button, Stack } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useContext } from "react";
import { TableContext } from "./TableContext";
import { NavLink } from "react-router-dom";

function ControlSection() {
  const { tenderId } = useContext(TableContext);

  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Box>
        <Button startIcon={<AddCircleOutlineIcon />} variant="contained">
          إضافة منافسة
        </Button>
      </Box>
      <Stack direction={"row"} spacing={2}>
        <Button variant="outlined" startIcon={<FilterAltIcon />}>
          فلتر
        </Button>
        <Button
          disabled
          color="error"
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          حذف
        </Button>
        <Button
          disabled={tenderId?.length !== 1}
          variant="outlined"
          startIcon={<EditIcon />}
          component={NavLink}
          to={`edit/${tenderId}`}
        >
          تعديل
        </Button>
      </Stack>
    </Stack>
  );
}

export default ControlSection;
