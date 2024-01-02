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
import SetDialog from "./SetDialog";

function AmountsSection() {
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
          اضافة بند
        </Button>
      </Box>
      <Stack>
        <TableContainer component={Paper}>
          <Table sx={{ bgcolor: "Background" }}>
            <TableHead>
              <TableRow>
                <TableCell>كود البند</TableCell>
                <TableCell>اسم البند</TableCell>
                <TableCell>الكمية</TableCell>
                <TableCell>المساحة</TableCell>
                <TableCell>وصف البند</TableCell>
                <TableCell>الاعدادات</TableCell>
              </TableRow>
            </TableHead>
            {
              <TableBody>
                <TableRow>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
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

export default AmountsSection;
