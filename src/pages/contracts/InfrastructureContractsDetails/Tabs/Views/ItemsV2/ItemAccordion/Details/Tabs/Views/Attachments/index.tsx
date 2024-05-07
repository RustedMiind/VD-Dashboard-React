import { Button, Grid, Stack } from "@mui/material";
import { TabViewProps } from "..";
import AddIcon from "@mui/icons-material/Add";
import AddAttachmentDialog from "./AddAttachment";
import { useContext, useState } from "react";
import AttachementsList from "./AttachmentsList";
import { ContractItemContext } from "../../../../ItemContext";

export default function Attachments({ subItem }: TabViewProps) {
  // TODO::declare and define component variables and state
  const [open, setOpen] = useState(false);
  const { isLoading } = useContext(ContractItemContext);
  console.log("AddSubItemAttachment subitem ::", subItem); //.attachments

  // TODO::declare and define methods
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  // TODO::return out component view
  return (
    <Stack spacing={2} alignItems={"end"}>
      <Button startIcon={<AddIcon />} variant="contained" onClick={onOpen}>
        اضافة مرفق
      </Button>
      <Grid container xs={12} boxSizing={"border-box"}>
        {isLoading ? (
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
            height={"120px"}
          >
            جاري تحميل البيانات
          </Stack>
        ) : (
          <AttachementsList attachments={subItem.attachments ?? []} />
        )}
      </Grid>
      <AddAttachmentDialog
        open={open}
        onClose={onClose}
        subItemId={subItem.id}
      />
    </Stack>
  );
}
