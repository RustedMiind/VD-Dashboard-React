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

export default function TableShowAttachments({}: TableShowAttachmentsProps) {
  //Declaration component State variables...
  const SingleRow = () => {
    return (
      <TableRow>
        <TableCell>Type 1</TableCell>
        <TableCell>file 101</TableCell>
        <TableCell>description</TableCell>
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
            <SingleRow />
            <SingleRow />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

type TableShowAttachmentsProps = {};
