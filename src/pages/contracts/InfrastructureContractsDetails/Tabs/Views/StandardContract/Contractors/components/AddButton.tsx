import { Button, Stack } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

export default function AddButton() {
  return (
    <Stack justifyContent={"start"} alignItems={"end"} width="100%" my={2}>
      <Button startIcon={<AddBoxOutlinedIcon />} variant="contained">
        اضافة مقاول
      </Button>
    </Stack>
  );
}
