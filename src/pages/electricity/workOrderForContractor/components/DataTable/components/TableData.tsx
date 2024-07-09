import {
  Checkbox,
  IconButton,
  MenuItem,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";

function TableData() {
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell sx={{ width: 0.1 }}>
          <TextField size="small" />
        </TableCell>
        <TableCell>
          <IconButton color="secondary" aria-label="add an alarm">
            <AddLocationIcon />
          </IconButton>
        </TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell sx={{ width: 0.1 }}>
          <TextField select size="small" fullWidth>
            <MenuItem>1</MenuItem>
          </TextField>
        </TableCell>
        <TableCell>-</TableCell>
        <TableCell sx={{ width: 0.1 }}>
          <TextField select size="small" fullWidth>
            <MenuItem>1</MenuItem>
          </TextField>
        </TableCell>{" "}
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
      </TableRow>
    </TableBody>
  );
}

export default TableData;
