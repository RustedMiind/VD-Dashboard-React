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
import DialogAddArea from "./Dialog";
import { SoilContext } from "../../SoilContext";
import { useContext, useState } from "react";
import axios from "axios";
import { Api } from "../../../../constants";
import { AxiosErrorType } from "../../../../types/Axios";
import { LaravelValidationError } from "../../../../types/LaravelValidationError";
import { useSnackbar } from "notistack";
import LoadingTable from "../../../../components/LoadingTable";
import NotFound from "../../../../components/NotFound";

export default function AreaSites(props: PropsType) {
  const snackbar = useSnackbar();
  const [selectedSoilId, setSelectedSoilId] = useState<number[]>([]);
  const [idToUpdate, setIdToUpdate] = useState<number | []>([]);
  const [createOrEdit, setCreateOrEdit] = useState<"create" | "edit" | "none">(
    "none"
  );
  const { soilData, setSoilData } = useContext(SoilContext);
  const selectAllHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    let values: number[] | undefined =
      typeof soilData === "object"
        ? soilData.soil_area?.map((item) => {
            return item.id;
          })
        : [];
    if (checked) setSelectedSoilId && setSelectedSoilId(values || []);
    else setSelectedSoilId && setSelectedSoilId([]);
  };
  function CheckboxHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let isSelect = e.target.checked;
    let value = parseInt(e.target.value);
    if (e.target.checked) {
      setIdToUpdate(parseInt(e.target.value));
    }
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
      .delete(Api("employee/soil/area"), {
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
    setIdToUpdate([]);
    props.openAreaDialog();
    setCreateOrEdit("create");
  }
  function handleEdit() {
    props.openAreaDialog();
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
              اضافة مساحة
            </Button>
            <Box>
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
                          selectedSoilId?.length === soilData.soil_area?.length
                        }
                        onChange={selectAllHandler}
                      />
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
                          <Checkbox
                            value={item.id}
                            checked={selectedSoilId?.includes(item.id)}
                            onChange={CheckboxHandler}
                          />
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
            idToUpdate={idToUpdate}
            createOrEdit={createOrEdit}
          />
        </Stack>
      )}
    </>
  );
}
type PropsType = {
  openAreaDialog: () => void;
  dialogState: DialogState;
  closeDialog: () => void;
};
