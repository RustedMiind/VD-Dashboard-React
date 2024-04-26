import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {
  Button,
  IconButton,
  LinearProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachmentIcon from "@mui/icons-material/Attachment";
import LimitTypography from "../../../../../../../../components/LimitTypograpgy";
import {
  TansactionAttachmentType,
  TansactionReplyAttachmentType,
} from "../../../../../../../../types/Contracts/ContractTransactionAttachment";
import { useContext, useEffect, useState } from "react";
import { ContractDetailsContext } from "../../../../..";
import axios from "axios";
import { Api } from "../../../../../../../../constants";
import { CreateProcessingReplyContext } from "../CreateProcessingReplyContext";

function AttachmentRow({ attachment }: PropsType) {
  const media = attachment.media?.[0];

  const [attachmentType, setAttachmentType] = useState<string | undefined>(
    attachment.contract_attachment_type_id?.toString()
  );
  const [description, setDescription] = useState<string | undefined>(
    attachment.description
  );
  const [loading, setLoading] = useState(false);
  const { use } = useContext(ContractDetailsContext);
  const { refreshComment } = useContext(CreateProcessingReplyContext);
  console.log("use", use);

  const onUpdate = async () => {
    try {
      setLoading(true);
      await axios.post(
        Api(
          `employee/contract/items/comment-processing/update-attachment-type/${attachment.id}`
        ),
        {
          description,
          contract_attachment_type_id: attachmentType,
        }
      );
      refreshComment();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.post(
        Api(
          `employee/contract/items/comment-processing/delete-attachment-type/${attachment.id}`
        )
      );
      refreshComment();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      attachmentType &&
      attachment.contract_attachment_type_id?.toString() != attachmentType
    )
      onUpdate();
  }, [attachmentType]);

  return (
    <>
      <TableRow>
        <TableCell>
          <TextField
            select
            fullWidth
            label="نوع المرفق"
            value={attachmentType || null}
            onChange={(e) => {
              setAttachmentType(e.target.value);
            }}
          >
            {use?.attachments_types?.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </TableCell>
        <TableCell>
          <Button
            fullWidth
            startIcon={<AttachmentIcon />}
            component="a"
            href={media?.original_url}
            target="_blank"
          >
            <LimitTypography>{media?.file_name}</LimitTypography>
          </Button>
        </TableCell>
        <TableCell>
          <TextField
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            onBlur={onUpdate}
            fullWidth
            label="الوصف"
          />
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <IconButton color="error" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <td colSpan={4}>{loading && <LinearProgress />}</td>
      </TableRow>
    </>
  );
}

type PropsType = {
  attachment: TansactionReplyAttachmentType;
};

export default AttachmentRow;
