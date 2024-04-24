import { Stack } from "@mui/material";
import { TabViewProps } from "..";
import AddProccessingButton from "./components/AddProccessingButton";
import ProcessingList from "./components/ProccessingList";
import { useContext, useState } from "react";
import ChooseProcessingType from "./setProccessing";
import { SetProccessingContext } from "./context/SetProccessingContext";

function ProcessingView({ subItem }: TabViewProps) {
  // TODO::declare and define component variables.
  const [openDialog, setOpenDialog] = useState(false);
  const SetProccessingContextData = useContext(SetProccessingContext);
  // * Set Current SubItem Id
  SetProccessingContextData.setSubItemId(subItem.id);
  SetProccessingContextData.setSubItem(subItem);

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
