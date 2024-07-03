import { Button, IconButton, TableBody, TableCell } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Contract } from "../../../../../../types";

export default function TableBodyData({ contractDetails }: PropsType) {
  return (
    <TableBody>
      {contractDetails &&
        contractDetails[0].levers?.map((item) => (
          <>
            <TableCell>{item.code}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.contract_lever_attachment_type.name}</TableCell>
            <TableCell>
              <Button startIcon={<FolderOpenIcon />}>عرض الملف</Button>
            </TableCell>
            <TableCell>
              <IconButton size="small">
                <PrintIcon />
              </IconButton>
              <IconButton size="small">
                <EditIcon />
              </IconButton>
              <IconButton size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </>
        ))}
    </TableBody>
  );
}
type PropsType = {
  contractDetails: Contract[] | undefined;
};
