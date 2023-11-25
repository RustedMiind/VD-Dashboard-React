import { Box, Stack } from "@mui/system";
import DoubleChips from "../../../../components/DoubleStatusChips";
import BtnCus from "./BtnCus";
import { Typography } from "@mui/material";

export default function TopTable() {
  return (
    <Stack>
      <Typography sx={{ mt: 2 }}>حالات العقود</Typography>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} spacing={2} mb={1}>
          <DoubleChips color="error" label="عنوان البوكس" value="123" />
          <DoubleChips color="primary" label="عنوان البوكس" value="123" />
          <DoubleChips color="secondary" label="عنوان البوكس" value="123" />
          <DoubleChips color="warning" label="عنوان البوكس" value="123" />
        </Stack>
        <Box>
          <BtnCus />
        </Box>
      </Stack>
    </Stack>
  );
}
