import { Button, Stack } from "@mui/material";
import { TabViewProps } from "..";
import ProcessingCard from "./ProcessingCard";
import { useContext } from "react";
import { OpenCreateProcessingContext } from "../../../../../CreateNewProcessingDialog/CreateProcessingContextProvider";

function ProcessingView({ subItem }: TabViewProps) {
  const OpenCreateProcessingContextData = useContext(
    OpenCreateProcessingContext
  );
  const { openCreateDialog } = OpenCreateProcessingContextData;

  console.log("context", OpenCreateProcessingContextData);
  return (
    <Stack>
      <Stack alignItems={"end"}>
        <Button
          variant="contained"
          onClick={() => openCreateDialog(subItem.id)}
        >
          اضافة معاملة
        </Button>
      </Stack>
      <Stack spacing={2}>
        {subItem.processing?.map((processing) => (
          <ProcessingCard key={processing.id} processing={processing} />
        ))}
      </Stack>
    </Stack>
  );
}

export default ProcessingView;
