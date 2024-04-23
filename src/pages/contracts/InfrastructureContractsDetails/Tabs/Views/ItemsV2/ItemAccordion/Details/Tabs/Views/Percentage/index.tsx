import { Stack } from "@mui/material";
import { TabViewProps } from "..";

function PercentageView({ subItem }: TabViewProps) {
  return <Stack>Percentage View - {subItem.name}</Stack>;
}

export default PercentageView;
