import {
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import DialogConfirm from "./setDialog/DialogConfirm";

function TableData() {
  const [rows, setRows] = useState<{ id: number }[]>([]);
  const [open, setOpen] = useState(false);
  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
    };
    setRows([...rows, newRow]);
  };
  function handleClose() {
    setOpen(!open);
  }
  return (
    <>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell sx={{ width: 0.1 }}>
              <TextField size="small" onBlur={handleClose} />
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
        ))}
      </TableBody>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addRow}
        sx={{ my: 4, width: 0.9, marginLeft: "5%" }}
      ></Button>
      <DialogConfirm open={open} handleClose={handleClose} />
    </>
  );
}

export default TableData;
