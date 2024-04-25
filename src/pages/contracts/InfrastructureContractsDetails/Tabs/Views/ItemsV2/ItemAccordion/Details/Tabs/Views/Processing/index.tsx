import { Stack } from "@mui/material";
import { TabViewProps } from "..";
import ProcessingCard from "./ProcessingCard";

function ProcessingView({ subItem }: TabViewProps) {
  return (
    <Stack>
      <Stack spacing={1}>
        {subItem.processing?.map((processing) => (
          <ProcessingCard key={processing.id} processing={processing} />
        ))}
      </Stack>
    </Stack>
  );
}

export default ProcessingView;
