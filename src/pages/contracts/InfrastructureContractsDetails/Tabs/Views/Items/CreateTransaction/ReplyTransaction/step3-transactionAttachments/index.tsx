import { Box, Button, DialogContent, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { TansactionAttachmentType } from "../../../../../../../../../types/Contracts/ContractTransactionAttachment";
import TableShowAttachments from "../../SetTransaction/step2/TableShowAttachments";
import CreateAttachmentDialog from "./CreateAttachmentDialog";

export default function ReplyTransactionTab3() {
  //Declaration component State variables...
  const [transactionsAttachments, setTransactionsAttachments] = useState<
    TansactionAttachmentType[]
  >([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  //*  return ui
  return (
    <>
      <DialogContent sx={{ bgcolor: "background.default" }}>
        <Stack
          bgcolor={"background.default"}
          padding={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => setOpenDialog(true)}
              size="small"
            >
              اضافة مرفق
            </Button>
          </Box>
          {/* table */}
          <TableShowAttachments
            transactionsAttachments={transactionsAttachments}
            loading={loading}
          />
        </Stack>
      </DialogContent>
      <CreateAttachmentDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </>
  );
}
