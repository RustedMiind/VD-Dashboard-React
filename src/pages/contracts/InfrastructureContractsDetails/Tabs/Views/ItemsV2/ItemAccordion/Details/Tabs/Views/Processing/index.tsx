import { Stack } from "@mui/material";
import { TabViewProps } from "..";
import ProcessingCard from "./ProcessingCard";

function ProcessingView({ subItem }: TabViewProps) {
  return (
    <Stack>
      <Stack spacing={2}>
        {subItem.processing?.map((processing) => (
          <ProcessingCard key={processing.id} processing={processing} />
        ))}
      </Stack>
    </Stack>
  );
}

export default ProcessingView;
