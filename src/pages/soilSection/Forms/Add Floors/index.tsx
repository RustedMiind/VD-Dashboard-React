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
import { DialogState } from "..";
import DialogAddFloor from "./Dialog";

export default function AddFloors(props: PropsType) {
  return (
    <Stack>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          onClick={props.openFloorDialog}
        >
          اضافة الادوار
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
                <TableCell>عدد الادوار</TableCell>
                <TableCell>العمق</TableCell>
                <TableCell>الحد الادني</TableCell>
                <TableCell>الاعدادات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <TextField sx={{ width: 0.5 }} select label="Select">
                    <MenuItem>1</MenuItem>
                  </TextField>
                </TableCell>
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
      <DialogAddFloor
        closeDialog={props.closeDialog}
        open={props.dialogState === "floor"}
      />
    </Stack>
  );
}
type PropsType = {
  openFloorDialog: () => void;
  dialogState: DialogState;
  closeDialog: () => void;
};
