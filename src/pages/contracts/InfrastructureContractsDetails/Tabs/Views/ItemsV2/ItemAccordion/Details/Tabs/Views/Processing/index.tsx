import { Stack } from "@mui/material";
import { TabViewProps } from "..";
import AddProccessingButton from "./components/AddProccessingButton";
import ProcessingList from "./components/ProccessingList";
import { useState } from "react";
import ChooseProcessingType from "./setProccessing";

function ProcessingView({ subItem }: TabViewProps) {
  // TODO::declare and define component variables.
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };
  console.log("subItem", subItem);

  return (
    <Stack>
      <AddProccessingButton handleClick={handleOpen} />
      <ProcessingList processing={subItem.processing} subItemId={subItem.id} />
      <ChooseProcessingType open={openDialog} setOpen={setOpenDialog} />
    </Stack>
  );
}

export default ProcessingView;
