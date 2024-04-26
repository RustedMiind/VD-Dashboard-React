import { Button, Stack } from "@mui/material";
import { TabViewProps } from "..";
import ProcessingCard from "./ProcessingCard";
import { useContext, useState } from "react";
import { OpenCreateProcessingContext } from "../../../../../CreateNewProcessingDialog/CreateProcessingContextProvider";
import { ContractItemContext } from "../../../../ItemContext";
import AddIcon from "@mui/icons-material/Add";
import ChooseCreateDialog from "./ChooseCreateDialog";

function ProcessingView({ subItem }: TabViewProps) {
  const { openCreateDialog, OnSubmitSucess } = useContext(
    OpenCreateProcessingContext
  );
  const { fetchItemDetails } = useContext(ContractItemContext);
  const [chooseDialogOpen, setChooseDialogOpen] = useState(false);

  return (
    <Stack spacing={1}>
      <ChooseCreateDialog
        open={chooseDialogOpen}
        subItem={subItem}
        onClose={() => setChooseDialogOpen(false)}
      />
      <Stack alignItems={"end"}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          // onClick={() => {
          //   openCreateDialog(subItem.id);
          //   OnSubmitSucess(() => {
          //     fetchItemDetails?.({ optimized: false, soft: true });
          //   });
          // }}
          onClick={() => setChooseDialogOpen(true)}
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
