import {
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

export default function PathesTableData(props: PropsType) {
  // declare and define component state and variables
  const [openDialog, setOpenDialog] = useState(false);

  // return component ui
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>_</TableCell>
          <TableCell>_</TableCell>
          <TableCell>_</TableCell>
          <TableCell>_</TableCell>
          <TableCell>_</TableCell>
          <TableCell>
            <RemoveRedEyeOutlinedIcon />
          </TableCell>
        </TableRow>
        
        <TableRow>
          <TableCell>_</TableCell>
          <TableCell>_</TableCell>
          <TableCell>_</TableCell>
          <TableCell>_</TableCell>
          <TableCell>_</TableCell>
          <TableCell>
            <RemoveRedEyeOutlinedIcon />
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}
type PropsType = {};
