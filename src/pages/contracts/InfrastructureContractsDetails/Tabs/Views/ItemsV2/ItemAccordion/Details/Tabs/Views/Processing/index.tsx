import { Stack } from "@mui/material";
import { TabViewProps } from "..";
import AddProccessingButton from "./components/AddProccessingButton";
import ProcessingList from "./components/ProccessingList";
import { useState } from "react";
import ChooseProcessingType from "./setProccessing";
import { SetProccessingContextProvider } from "./context/SetProccessingContext";

function ProcessingView({ subItem }: TabViewProps) {
  // TODO::declare and define component variables.
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  return (
    <Stack>
      <SetProccessingContextProvider subItem={subItem}>
        <AddProccessingButton handleClick={handleOpen} />
        <ProcessingList />
        <ChooseProcessingType open={openDialog} setOpen={setOpenDialog} />
      </SetProccessingContextProvider>
    </Stack>
  );
}

export default ProcessingView;
