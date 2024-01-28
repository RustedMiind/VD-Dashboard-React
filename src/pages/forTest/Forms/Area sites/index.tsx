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
  Checkbox,
  MenuItem,
  TextField,
} from "@mui/material";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

export default function AreaSites() {
  return (
    <Stack>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
        >
          اضافة مساحة
        </Button>
        <Box>
          <Button sx={{ mx: 2 }} variant="outlined" startIcon={<EditIcon />}>
            تعديل
          </Button>
          <Button color="error" variant="outlined" startIcon={<DeleteIcon />}>
            حذف
          </Button>
        </Box>
      </Box>
      <Stack>
        <TableContainer component={Paper}>
          <Table sx={{ bgcolor: "Background" }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>المساحة</TableCell>
                <TableCell>العدد المقابل</TableCell>
                <TableCell>الحد الادنى</TableCell>
                <TableCell>الاعدادات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <TextField sx={{ width: 0.5 }} select label="Select">
                    <MenuItem>1</MenuItem>
                  </TextField>
                </TableCell>
                <TableCell>
                  <IconButton size="small">
                    <EditNoteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
            <Button type="submit" variant="contained">
              حفظ
            </Button>
          </Box>
        </TableContainer>
      </Stack>
    </Stack>
  );
}
