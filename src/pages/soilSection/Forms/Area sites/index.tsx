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
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import { DialogState } from "..";
import DialogAddArea from "./Dialog";
import { SoilContext } from "../../SoilContext";
import { useContext } from "react";

export default function AreaSites(props: PropsType) {
  const { soilData } = useContext(SoilContext);

  return (
    <Stack>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          onClick={props.openAreaDialog}
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
              {typeof soilData === "object" &&
                soilData?.soil_area?.map((item) => (
                  <TableRow>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      {item?.area_from && item?.area_from}
                      {" - "}
                      {item?.area_to && item?.area_to}
                      {" م "}
                    </TableCell>
                    <TableCell>{item?.number && item?.number}</TableCell>
                    <TableCell>{item?.minimum && item?.minimum}</TableCell>
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
      <DialogAddArea
        closeDialog={props.closeDialog}
        open={props.dialogState === "area"}
      />
    </Stack>
  );
}
type PropsType = {
  openAreaDialog: () => void;
  dialogState: DialogState;
  closeDialog: () => void;
};
