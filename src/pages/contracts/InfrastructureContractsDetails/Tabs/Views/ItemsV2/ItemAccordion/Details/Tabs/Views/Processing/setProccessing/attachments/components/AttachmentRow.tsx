import {
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { DbOptionType } from "../../../../../../../../../../../../../../types/other/DbOptionType";
import { useContext, useEffect, useState } from "react";
import { getUseData } from "../../../../../../../../../../../../../../methods/getUseData";
import { TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AttachmentsInstanceType } from "..";
import { TansactionAttachmentType } from "../../../../../../../../../../../../../../types/Contracts/ContractTransactionAttachment";
import { SetProccessingContext } from "../../../context/SetProccessingContext";
import { ContractDetailsContext } from "../../../../../../../../../../..";

export default function AttachmentsRow({ attachment }: ptopsType) {
  // TODO::define and declare component state and helpers variables
  const [description, setDescription] = useState("");

  const { commentId, refreshTransactionAttachments } = useContext(
    SetProccessingContext
  );
  const { use } = useContext(ContractDetailsContext);

  // TODO::define and declare helpers methods

  // TODO::handle delete attachment
  const handleDeleteAttachment = () => {
    console.log("Delete attachment");
  };

  const media = attachment.media?.find(() => true);

  return (
    <TableRow>
      {/* Attachment Work Type */}
      <TableCell>
        <Select
          required
          color="primary"
          size={"small"}
          // onChange={handleAttatchmentFileTypes}
          fullWidth
          defaultValue={"" + attachment.contract_attachment_type_id}
        >
          {use?.attachments_types?.map((option) => (
            <MenuItem key={`${option.id}`} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      {/* file name */}
      <TableCell>
        <Typography variant="body2">
          {media?.file_name ?? "اسم المرفق"}
        </Typography>
      </TableCell>
      {/* file description */}
      <TableCell>
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          // onBlur={handleSaveDescription}
          // defaultValue={props.item.description}
          size="small"
          color="primary"
        />
      </TableCell>
      {/* Delete Actions */}
      <TableCell>
        <IconButton
          size="small"
          onClick={() => handleDeleteAttachment()}
          color="error"
        >
          <Tooltip title="حذف" placement="top">
            <DeleteIcon />
          </Tooltip>
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

type ptopsType = {
  attachment: TansactionAttachmentType;
};
