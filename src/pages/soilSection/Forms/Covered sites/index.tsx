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
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import StatusChip from "../../../../components/StatusChip";
import { DialogState } from "..";
import DialogAddLocation from "./Dialog";
import { useContext } from "react";
import { SoilContext } from "../../SoilContext";
export default function CoveredSites(props: PropsType) {
  const { soilData } = useContext(SoilContext);
  return (
    <Stack>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
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
              {typeof soilData === "object" &&
                soilData?.soil_location?.map((item) => (
                  <TableRow>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      {item?.location_name && item?.location_name}
                    </TableCell>
                    <TableCell>
                      {item?.city?.name && item?.city?.name}
                    </TableCell>
                    <TableCell>
                      {item?.building_system && item?.building_system}
                    </TableCell>
                    <TableCell>
                      <StatusChip label="نشط" color="success" />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <SettingsIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
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
