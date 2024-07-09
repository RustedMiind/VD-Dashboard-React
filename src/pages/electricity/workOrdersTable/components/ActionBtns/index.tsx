import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function ActionsBtns() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", justifyContent: "end", gap: 1, marginTop: 2 }}>
      <Button variant="contained">تحديثات</Button>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate("../AddWorkOrder")}
      >
        اضافة أمر العمل
      </Button>
      <Button variant="contained" startIcon={<AddIcon />}>
        استيراد من ملف Excel
      </Button>
    </Box>
  );
}
