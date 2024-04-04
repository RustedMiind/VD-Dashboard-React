import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useEffect, useState } from "react";
import {
  TansactionAttachmentType,
  TransactionType,
} from "../../../../../../../types/Contracts/ContractTransactionAttachment";
import axios from "axios";
import { Api } from "../../../../../../../constants";
import { CreateTransactionContext } from "../context/CreateTransactionContext";
import Loader from "../../../../../../../components/Loading/Loader";

export default function TableShowAttachments(props: TableShowAttachmentsProps) {
  //Declaration component State variables...

  const SingleRow = ({
    type,
    description,
    fileName,
    attachmentId,
  }: {
    type: string;
    description: string;
    fileName: string;
    attachmentId: number;
  }) => {
    const handleDeleteAttachement = async () => {
      console.log("AttachmentId", attachmentId);
    };
    return (
      <TableRow>
        <TableCell>{type}</TableCell>
        <TableCell>{fileName}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => {}} color="error">
            <Tooltip title="حذف" placement="top">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  if (props.loading) return <Loader />;

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
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

type TableShowAttachmentsProps = {
  transactionsAttachments: TansactionAttachmentType[];
  loading: boolean;
};
