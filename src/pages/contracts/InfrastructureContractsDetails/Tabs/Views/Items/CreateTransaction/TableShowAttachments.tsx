import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { ImageType } from "react-images-uploading";
import UploadImageFile from "./UploadAttachmentFile";

const dummyOptions = [
  { id: 1, value: "1", name: "نوع 1" },
  { id: 2, value: "0", name: "نوع 2" },
];
export default function TableShowAttachments({
  attachmentTypes,
}: TableShowAttachmentsProps) {
  const SingleRow = ({ type }: { type: string }) => {
    const [attachmentFile, setAttachmentFile] = useState<ImageType[]>([]);
    const [description, setDescription] = useState("");
    return (
      <TableRow>
        <TableCell>{type}</TableCell>
        <TableCell>
          <UploadImageFile
            images={attachmentFile}
            width={attachmentFile.length > 0 ? `90%` : "100%"}
            setImages={(ar) => {
              setAttachmentFile(ar);
            }}
          />
        </TableCell>
        <TableCell>
          <TextField
            value={description}
            size="small"
            onChange={(e) => setDescription(e.target.value)}
            id="outlined-basic"
            variant="outlined"
          />
        </TableCell>
        <TableCell>
          <Select defaultValue={1} color="primary" size={"small"}>
            {dummyOptions.map((option) => (
              <MenuItem
                key={`${option.id}_${option.value}`}
                value={option.value}
              >
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <TableContainer
        sx={{
          marginTop: "0.5rem",
          borderRadius: "12px",
          bgcolor: "background.paper",
        }}
      >
        <Table>
          {/* Table Headers */}
          <TableHead>
            <TableRow>
              <TableCell>نوع المرفق</TableCell>
              <TableCell></TableCell>
              <TableCell>الوصف</TableCell>
              <TableCell>نوع المرفق</TableCell>
            </TableRow>
          </TableHead>
          {/* Table body */}
          <TableBody>
            {attachmentTypes.map((type) => (
              <SingleRow key={`${Math.random()}_${type}`} type={type} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

type TableShowAttachmentsProps = {
  attachmentTypes: string[];
};
