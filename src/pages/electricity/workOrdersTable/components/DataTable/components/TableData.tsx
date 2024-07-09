import {
  Button,
  Checkbox,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

function TableData() {
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>
          <Typography variant="body2" color={"success.main"}>
            ساري
          </Typography>
        </TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>
          <Button startIcon={<FolderOpenIcon />}></Button>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default TableData;
