import { Stack } from "@mui/material";
import { TabViewProps } from "..";

function ProcessingView({ subItem }: TabViewProps) {
  return <Stack>Processing View - {subItem.name}</Stack>;
}

export default ProcessingView;
