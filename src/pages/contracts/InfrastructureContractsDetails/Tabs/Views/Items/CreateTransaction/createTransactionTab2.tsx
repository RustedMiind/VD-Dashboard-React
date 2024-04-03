import { Box, Button, DialogContent, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TableShowAttachments from "./TableShowAttachments";
import CreateTransactionAttachmentFileDialog from "./CreateTransactionAttachmentDialog";
import { useState } from "react";

export default function CreateTransactionTab2() {
  const [openDialog, setOpenDialog] = useState(false);
  // *return component ui
  return (
    <>
      <DialogContent sx={{ bgcolor: "background.default" }}>
        <Stack
          bgcolor={"background.default"}
          padding={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {/* <SetDialog open={dialogOpen} handleClose={handleCloseDialog} /> */}
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
          <TableShowAttachments />
        </Stack>
      </DialogContent>
      <CreateTransactionAttachmentFileDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </>
  );
}
