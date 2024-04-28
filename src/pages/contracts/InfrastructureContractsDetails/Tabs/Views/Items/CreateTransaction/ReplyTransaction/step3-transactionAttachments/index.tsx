import { Box, Button, DialogContent, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useContext, useEffect, useState } from "react";
import {
  TansactionAttachmentType,
  TransactionType,
} from "../../../../../../../../../types/Contracts/ContractTransactionAttachment";
import TableShowAttachments from "../../SetTransaction/step2/TableShowAttachments";
import CreateAttachmentDialog from "./CreateAttachmentDialog";
import axios from "axios";
import { ReplyTransactionContext } from "../../../context/ReplyTransactionContext";
import { Api } from "../../../../../../../../../constants";
import { CreateTransactionContext } from "../../../context/CreateTransactionContext";

export default function ReplyTransactionTab3() {
  //Declaration component State variables...
  const ReplyTransactionContextData = useContext(ReplyTransactionContext);
  const transactionCxtData = useContext(CreateTransactionContext);
  const [transactionsAttachments, setTransactionsAttachments] = useState<
    TansactionAttachmentType[]
  >([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // fetch transactions data
  useEffect(() => {
    refreshTransactionData();
  }, []);

  const refreshTransactionData = async () => {
    setLoading(true);
    setTransactionsAttachments([]);
    let response = await axios
      .get<{ comment_processing: TransactionType }>(
        Api(
          `employee/contract/items/comment-processing/${ReplyTransactionContextData.commentId}`
        )
      )
      .then((res) => {
        return res.data;
      });
    console.log("response107", response);
    // setTransactionsAttachments(response.comment_processing.attachment);
    setLoading(false);
  };

  transactionCxtData.refresh = refreshTransactionData;

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
            deleteURL="employee/contract/items/comment-processing/delete-attachment-type/"
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
