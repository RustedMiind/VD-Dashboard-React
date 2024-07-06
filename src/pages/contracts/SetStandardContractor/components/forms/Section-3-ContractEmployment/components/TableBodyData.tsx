import { IconButton, TableBody, TableCell, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function TableBodyData(props: PropsType) {
  // declare and define component state and variables

  // return component ui
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>اسم العامل</TableCell>
          <TableCell>رقم الجوال</TableCell>
          <TableCell>رقم الترخيص</TableCell>
          <TableCell>انتهاء صلاحية الترخيص</TableCell>
          <TableCell>
            <IconButton size="small" onClick={() => {}}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" color="error" onClick={() => {}}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}
type PropsType = {};
