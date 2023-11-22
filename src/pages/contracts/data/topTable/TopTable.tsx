import { Box, Stack } from "@mui/system";
import StatusChip from "../../../../components/StatusChip";
import DoubleChips from "../../../../components/DoubleStatusChips";

export default function TopTable() {
  return (
    <Stack>
      <Stack direction={"row"} spacing={2} mb={1}>
        <DoubleChips color="error" label="عنوان البوكس" value="123" />
        <DoubleChips color="primary" label="عنوان البوكس" value="123" />
        <DoubleChips color="secondary" label="عنوان البوكس" value="123" />
        <DoubleChips color="warning" label="عنوان البوكس" value="123" />
        <DoubleChips color="success" label="عنوان البوكس" value="123" />
      </Stack>
      <Box></Box>
    </Stack>
  );
}
