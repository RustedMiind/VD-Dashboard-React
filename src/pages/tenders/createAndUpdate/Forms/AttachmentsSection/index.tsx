import {
  Button,
  Stack,
  TableContainer,
  Box,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  Paper,
} from "@mui/material";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useState } from "react";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SetDialog from "./SetDialog";

function AttachmentsSection() {
  const [open, setOpen] = useState<boolean>(false);
  function handleOpenDialog() {
    setOpen(!open);
  }
  return (
    <Stack>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          onClick={handleOpenDialog}
        >
          اضافة مرفق
        </Button>
      </Box>
      <Stack>
        <TableContainer component={Paper}>
          <Table sx={{ bgcolor: "Background" }}>
            <TableHead>
              <TableRow>
                <TableCell>كود المرفق</TableCell>
                <TableCell>اسم المرفق</TableCell>
                <TableCell>وصف المرفق </TableCell>
                <TableCell>الملف المرفق</TableCell>
                <TableCell>الاعدادات</TableCell>
              </TableRow>
            </TableHead>
            {
              <TableBody>
                <TableRow>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Button
                      startIcon={<FolderOpenIcon />}
                      component="a"
                      target="_blank"
                    >
                      عرض الملف
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      //   onClick={handleOpenUpdateDialog(lever)}
                    >
                      <EditNoteIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      //   onClick={handleDelete(lever.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            }
          </Table>
        </TableContainer>
        <SetDialog
          open={open}
          setOpen={setOpen}
          handleOpenDialog={handleOpenDialog}
        />
      </Stack>
    </Stack>
  );
}

export default AttachmentsSection;
