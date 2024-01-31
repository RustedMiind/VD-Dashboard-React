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
import { DialogState } from "..";
import DialogAddFloor from "./Dialog";
import { useContext, useState } from "react";
import { SoilContext } from "../../SoilContext";
import axios from "axios";
import { Api } from "../../../../constants";
import { AxiosErrorType } from "../../../../types/Axios";
import { LaravelValidationError } from "../../../../types/LaravelValidationError";
import { useSnackbar } from "notistack";
import LoadingTable from "../../../../components/LoadingTable";
import NotFound from "../../../../components/NotFound";
export default function AddFloors(props: PropsType) {
  const snackbar = useSnackbar();
  const { soilData, setSoilData } = useContext(SoilContext);
  const [selectedSoilId, setSelectedSoilId] = useState<number[]>([]);
  const [idToUpdate, setIdToUpdate] = useState<number | null>(null);
  const [createOrEdit, setCreateOrEdit] = useState<"create" | "edit" | "none">(
    "none"
  );
  const selectAllHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    let values: number[] | undefined =
      typeof soilData === "object"
        ? soilData.soil_floor?.map((item) => {
            return item.id;
          })
        : [];
    if (checked) setSelectedSoilId && setSelectedSoilId(values || []);
    else setSelectedSoilId && setSelectedSoilId([]);
  };
  function CheckboxHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let isSelect = e.target.checked;
    let value = parseInt(e.target.value);
    setIdToUpdate(parseInt(e.target.value));
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
    axios
      .delete(Api("employee/soil/floor"), {
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
    props.openFloorDialog();
    setCreateOrEdit("create");
  }
  function handleEdit() {
    props.openFloorDialog();
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
            >
              اضافة الادوار
            </Button>
            <Box>
              <Button
                onClick={handleEdit}
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
                          selectedSoilId?.length === soilData.soil_floor?.length
                        }
                        onChange={selectAllHandler}
                      />
                    </TableCell>
                    <TableCell>عدد الادوار</TableCell>
                    <TableCell>العمق</TableCell>
                    <TableCell>الحد الادني</TableCell>
                    <TableCell>الاعدادات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {typeof soilData === "object" &&
                    soilData?.soil_floor?.map((item) => (
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            value={item.id}
                            checked={selectedSoilId?.includes(item.id)}
                            onChange={CheckboxHandler}
                          />
                        </TableCell>
                        <TableCell>{item.number_floors}</TableCell>
                        <TableCell> {item.depth}</TableCell>
                        <TableCell> {item.minimum}</TableCell>
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
          <DialogAddFloor
            closeDialog={props.closeDialog}
            open={props.dialogState === "floor"}
            idToUpdate={idToUpdate}
          />
        </Stack>
      )}
    </>
  );
}

type PropsType = {
  openFloorDialog: () => void;
  dialogState: DialogState;
  closeDialog: () => void;
};
