import { Box, Button, DialogContent, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  TansactionAttachmentType,
  TransactionType,
} from "../../../../../../../../../../../../../../types/Contracts/ContractTransactionAttachment";
import { Api } from "../../../../../../../../../../../../../../constants";
import AttachmentsTable from "./AttachmentsTable";
import AddAttachmentDialog from "./AddAttachmentDialog";

export default function CreateNewProccessingStep2() {
  //* Declaration component State variables...
  const [transactionsAttachments, setTransactionsAttachments] = useState<
    TansactionAttachmentType[]
  >([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // fetch transactions data
  useEffect(() => {
    // refreshTransactionData();
  }, []);

  const refreshTransactionData = async () => {
    setLoading(true);
    setTransactionsAttachments([]);
    let response = await axios
      .get<{ processing: TransactionType }>(
        Api(
          `employee/contract/items/processing/${192}`
          //   `employee/contract/items/processing/${transactionCxtData.transactionId}`
        )
      )
      .then((res) => {
        return res.data;
      });
    setTransactionsAttachments(response.processing.attachment);
    setLoading(false);
  };
  //   transactionCxtData.refresh = refreshTransactionData;

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
          <AttachmentsTable
            transactionsAttachments={transactionsAttachments}
            loading={loading}
          />
        </Stack>
      </DialogContent>
      <AddAttachmentDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </>
  );
}
