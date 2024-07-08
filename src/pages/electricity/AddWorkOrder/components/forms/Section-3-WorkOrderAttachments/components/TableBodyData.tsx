import {
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { useState } from "react";

export default function TableBodyData(props: PropsType) {
  // declare and define component state and variables
  const [openDialog, setOpenDialog] = useState(false);

  // return component ui
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>كود البند</TableCell>
          <TableCell>اسم المرفق</TableCell>
          <TableCell>رقم المرفق</TableCell>
          <TableCell>نوع المرفق</TableCell>
          <TableCell>
            <Button
              component={"a"}
              href={""}
              target="_blank"
              startIcon={<FolderOpenIcon />}
            >
              عرض الملف
            </Button>
          </TableCell>
          <TableCell>
            <IconButton size="small">
              <EditIcon />
            </IconButton>
            <IconButton size="small" color="error">
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableBody>
      {/* <SetDialog open={openDialog} setOpen={setOpenDialog} /> */}
    </>
  );
}
type PropsType = {};
