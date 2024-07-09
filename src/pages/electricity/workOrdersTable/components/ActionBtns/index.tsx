import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ActionsBtns() {
  return (
    <Box sx={{ display: "flex", justifyContent: "end", gap: 1, marginTop: 2 }}>
      <Button variant="contained">تحديثات</Button>
      <Button variant="contained" startIcon={<AddIcon />}>
        اضافة أمر العمل
      </Button>
      <Button variant="contained" startIcon={<AddIcon />}>
        استيراد من ملف Excel
      </Button>
    </Box>
  );
}
