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
import { useContext, useState } from "react";
import { SoilContext } from "../../SoilContext";
import axios from "axios";
import { Api } from "../../../../constants";
import { useSnackbar } from "notistack";
import { AxiosErrorType } from "../../../../types/Axios";
import { LaravelValidationError } from "../../../../types/LaravelValidationError";
import LoadingTable from "../../../../components/LoadingTable";
import TenderNotFound from "../../../tenders/data/Table/TendersNotFound";
import NotFound from "../../../../components/NotFound";
import { set } from "react-hook-form";

export default function CoveredSites(props: PropsType) {
  const { soilData, setSoilData } = useContext(SoilContext);
  const snackbar = useSnackbar();
  const [idToUpdate, setIdToUpdate] = useState<number | []>([]);
  const [selectedSoilId, setSelectedSoilId] = useState<number[]>([]);
  const [createOrEdit, setCreateOrEdit] = useState<"create" | "edit" | "none">(
    "none"
  );
  const selectAllHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    let values: number[] | undefined =
      typeof soilData === "object"
        ? soilData.soil_location?.map((item) => {
            return item.id;
          })
        : [];
    if (checked) setSelectedSoilId && setSelectedSoilId(values || []);
    else setSelectedSoilId && setSelectedSoilId([]);
  };
  function CheckboxHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let isSelect = e.target.checked;
    if (e.target.checked) {
      setIdToUpdate(parseInt(e.target.value));
    } else setIdToUpdate([]);

    let value = parseInt(e.target.value);
    if (isSelect) {
      setSelectedSoilId &&
        selectedSoilId &&
        setSelectedSoilId([...selectedSoilId, value]);
    } else {
      setSelectedSoilId &&
        setSelectedSoilId((prevData) => {
          return prevData.filter((id) => {
            return id !== value;
          });
        });
    }
  }
  function handleDelete() {
    setSelectedSoilId([]);
    axios
      .delete(Api("employee/soil/location"), {
        data: { id: selectedSoilId },
      })
      .then((res) => {
        snackbar.enqueueSnackbar("تم حذف  المختارة بنجاح");
        setSoilData && setSoilData();
      })
      .catch((err: AxiosErrorType<LaravelValidationError<unknown>>) => {
        snackbar.enqueueSnackbar("تعذر في الحذف", {
          variant: "error",
        });
      });
  }
  function handleCreate() {
    props.openCoveredDialog();
    setCreateOrEdit("create");
  }
  function handleEdit() {
    props.openCoveredDialog();
    setCreateOrEdit("edit");
  }
  return (
    <>
      {soilData === "loading" && <LoadingTable rows={5} cols={9} />}
      {soilData === "error" && <NotFound title="حدث خطأ حاول مرة أخرى" />}
      {typeof soilData === "object" && (
        <Stack>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{ mb: 1 }}
              onClick={handleCreate}
              disabled={!!selectedSoilId?.length}
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
              <Button
                onClick={handleEdit}
                disabled={selectedSoilId?.length !== 1}
                sx={{ mx: 2 }}
                variant="outlined"
                startIcon={<EditIcon />}
              >
                تعديل
              </Button>
              <Button
                disabled={selectedSoilId?.length === 0}
                onClick={handleDelete}
                color="error"
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
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
                      <Checkbox
                        checked={
                          typeof soilData === "object" &&
                          selectedSoilId?.length != 0 &&
                          selectedSoilId?.length ===
                            soilData.soil_location?.length
                        }
                        onChange={selectAllHandler}
                      />
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
                          <Checkbox
                            value={item.id}
                            checked={selectedSoilId?.includes(item.id)}
                            onChange={CheckboxHandler}
                          />
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
            idToUpdate={idToUpdate}
            createOrEdit={createOrEdit}
          />
        </Stack>
      )}
    </>
  );
}
type PropsType = {
  openCoveredDialog: () => void;
  dialogState: DialogState;
  closeDialog: () => void;
};
