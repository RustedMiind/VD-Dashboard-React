import { Stack } from "@mui/material";
import DoubleChips from "../../../components/DoubleStatusChips";

function Counters() {
  return (
    <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
      <DoubleChips label="جاري" value="12" color="success" />
      <DoubleChips label="جاري" value="12" color="warning" />
      <DoubleChips label="جاري" value="12" color="error" />
      <DoubleChips label="جاري" value="12" color="secondary" />
      <DoubleChips label="جاري" value="12" color="primary" />
      <DoubleChips label="جاري" value="12" color="primary" />
      <DoubleChips label="جاري" value="12" color="primary" />
      <DoubleChips label="جاري" value="12" color="primary" />
    </Stack>
  );
}

export default Counters;
