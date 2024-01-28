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
} from "@mui/material";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditIcon from "@mui/icons-material/Edit";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import StatusChip from "../../../../components/StatusChip";
import { DialogState } from "..";
import DialogAddLocation from "./Dialog";
export default function CoveredSites(props: PropsType) {
  return (
    <Stack>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          onClick={props.openCoveredDialog}
        >
          اضافة موقع
        </Button>
        <Box>
          <Button
            sx={{ mx: 2 }}
            variant="outlined"
            color="warning"
            startIcon={<AddLocationIcon />}
          >
            الخريطة الكلية
          </Button>
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
                <TableCell>اسم الموقع</TableCell>
                <TableCell>المدينة</TableCell>
                <TableCell>نظام البناء</TableCell>
                <TableCell>الحالة</TableCell>
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
                <TableCell>-</TableCell>
                <TableCell>
                  <StatusChip label="نشط" color="success" />
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
      <DialogAddLocation
        closeDialog={props.closeDialog}
        open={props.dialogState === "covered"}
      />
    </Stack>
  );
}
type PropsType = {
  openCoveredDialog: () => void;
  dialogState: DialogState;
  closeDialog: () => void;
};
