import { Stack } from "@mui/material";
import DoubleChips from "../../../components/DoubleStatusChips";

function Counters() {
  return (
    <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
      <DoubleChips label="جاري" value="0" color="success" />
      <DoubleChips label="مقدمة" value="0" color="warning" />
      <DoubleChips label="منتهي" value="0" color="error" />
      <DoubleChips label="تم الترسية" value="0" color="primary" />
      <DoubleChips label="فحص فني" value="0" color="primary" />
      <DoubleChips label="مستعبد فني" value="0" color="primary" />
      <DoubleChips label="مستعبد مالي" value="0" color="primary" />
    </Stack>
  );
}

export default Counters;
