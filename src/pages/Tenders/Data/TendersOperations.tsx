import { Box, Button, Stack } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

function TendersOperations() {
  return (
    <Stack direction={"row"} p={2} justifyContent={"space-between"}>
      <Box>
        <Button variant="contained">إضافة منافسة</Button>
      </Box>
      <Stack direction={"row"}>
        <Button
          sx={{ borderRadius: "10px", ml: 2, my: 2, px: 3 }}
          variant="outlined"
          startIcon={<FilterAltIcon />}
        >
          فلتر
        </Button>
        <Button
          disabled
          color="error"
          sx={{ borderRadius: "10px", ml: 2, my: 2, px: 3 }}
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          حذف
        </Button>
        <Button
          sx={{ borderRadius: "10px", ml: 2, my: 2, px: 3 }}
          variant="outlined"
          startIcon={<CreditScoreIcon />}
        >
          تعديل
        </Button>
      </Stack>
    </Stack>
  );
}

export default TendersOperations;
