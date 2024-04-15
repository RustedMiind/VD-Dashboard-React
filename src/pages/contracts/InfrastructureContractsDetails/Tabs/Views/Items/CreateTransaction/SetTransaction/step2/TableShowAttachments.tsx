import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useEffect, useState } from "react";
import {
  TansactionAttachmentType,
  TransactionType,
} from "../../../../../../../../../types/Contracts/ContractTransactionAttachment";
import axios from "axios";
import { Api } from "../../../../../../../../../constants";
import { CreateTransactionContext } from "../../../context/CreateTransactionContext";
import Loader from "../../../../../../../../../components/Loading/Loader";
import { useSnackbar } from "notistack";

export default function TableShowAttachments(props: TableShowAttachmentsProps) {
  //Declaration component State variables...
  const transactionCxtData = useContext(CreateTransactionContext);
  const { enqueueSnackbar } = useSnackbar();
  const SingleRow = ({
    type,
    description,
    fileName,
    attachmentId,
    url,
  }: {
    type: string;
    description: string;
    fileName: string;
    attachmentId: number;
    url: string;
  }) => {
    const handleDeleteAttachement = () => {
      console.log("Delete Attach file");
      axios
        .post(
          Api(
            props.deleteURL
              ? `${props.deleteURL}${attachmentId}`
              : `employee/contract/items/processing/delete-attachment-type/${attachmentId}`
          )
        )
        .then((res) => {
          enqueueSnackbar("تم الحذف بنجاح");
          transactionCxtData.refresh();
        })
        .catch((err) => {
          enqueueSnackbar("تعذر حذف البيانات", { variant: "error" });
        });
    };

    return (
      <TableRow>
        <TableCell>{type}</TableCell>
        <TableCell>
          <Box
            component="a"
            href={url}
            target="_blank"
            sx={{ textDecoration: "none", color: "primary.main" }}
          >
            {fileName}
          </Box>
        </TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>
          <IconButton
            size="small"
            onClick={() => {
              console.log("Delete File::");
              handleDeleteAttachement();
            }}
            color="error"
          >
            <Tooltip title="حذف" placement="top">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  //* return component ui.
  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>نوع المرفق</TableCell>
              <TableCell>ملف المرفق</TableCell>
              <TableCell>وصف المرفق</TableCell>
              <TableCell>الاعدادات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.transactionsAttachments?.length > 0 &&
              props.transactionsAttachments.map((ele, idx) => (
                <SingleRow
                  key={`TA-${idx}`}
                  type={ele.attachment_type?.name ?? ""}
                  description={ele.description}
                  attachmentId={ele.id}
                  fileName={ele?.media ? ele?.media[0]?.file_name ?? "" : ""}
                  url={ele?.media ? ele?.media[0]?.original_url ?? "" : ""}
                />
              ))}
          </TableBody>
        </Table>
        {props.loading && (
          <Stack
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            marginY={3}
          >
            <CircularProgress />
          </Stack>
        )}
        {!props.loading && props.transactionsAttachments?.length == 0 && (
          <Stack
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            marginY={3}
          >
            <Typography variant="body2" fontWeight={500}>
              لا يوجد مرفقات فى هذه المعاملة
            </Typography>
          </Stack>
        )}
      </TableContainer>
    </>
  );
}

type TableShowAttachmentsProps = {
  transactionsAttachments: TansactionAttachmentType[];
  loading: boolean;
  deleteURL?: string;
};
