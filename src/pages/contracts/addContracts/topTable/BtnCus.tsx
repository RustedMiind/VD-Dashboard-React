import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
export default function BtnCus() {
  return (
    <Stack direction={"row"}>
      <Button
        sx={{ borderRadius: "10px", ml: 2, my: 2, px: 3 }}
        variant="outlined"
        startIcon={<FilterAltIcon />}
      >
        فلتر
      </Button>
      <Button
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
  );
}
