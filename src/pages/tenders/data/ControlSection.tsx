import { Box, Button, Stack } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function ControlSection() {
  return (
    <Stack direction={"row"} p={2} justifyContent={"space-between"}>
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
        <Button variant="outlined" startIcon={<EditIcon />}>
          تعديل
        </Button>
      </Stack>
    </Stack>
  );
}

export default ControlSection;
