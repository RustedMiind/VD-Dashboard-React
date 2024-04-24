import { Box, Button, DialogContent, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SetProccessingContext } from "../../../context/SetProccessingContext";
import {
  TansactionAttachmentType,
  TransactionType,
} from "../../../../../../../../../../../../../../types/Contracts/ContractTransactionAttachment";
import { Api } from "../../../../../../../../../../../../../../constants";
import AttachmentsTable from "../../create/step-2/AttachmentsTable";
import AddAttachmentDialog from "./AddAttachmentDialog";

export default function ReplyProccessingStep3() {
  //Declaration component State variables...
  const SetProccessingContextData = useContext(SetProccessingContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsAttachments, setTransactionsAttachments] = useState<
    TansactionAttachmentType[]
  >([]);

  // fetch transactions data
  useEffect(() => {
    refreshTransactionData();
  }, []);

  const refreshTransactionData = async () => {
    try {
      setLoading(true);
      setTransactionsAttachments([]);
      let response = await axios
        .get<{ comment_processing: TransactionType }>(
          Api(
            `employee/contract/items/comment-processing/${SetProccessingContextData.commentId}`
          )
        )
        .then((res) => {
          return res.data;
        });
      setTransactionsAttachments(response.comment_processing.attachment);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  SetProccessingContextData.refreshTransactionAttachments =
    refreshTransactionData;

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
          <AttachmentsTable
            deleteURL="employee/contract/items/comment-processing/delete-attachment-type/"
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
