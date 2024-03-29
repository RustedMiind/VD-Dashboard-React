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
import { useContext, useState } from "react";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SetDialog from "./SetDialog";
import { TenderContext } from "../../TenderCondext";
import { TenderFile } from "../../../../../types/Tenders/TenderFile";
import axios from "axios";
import { Api } from "../../../../../constants";
import { useSnackbar } from "notistack";
import { FormStatus } from "../../../../../types/FormStatus";
import { LoadingButton } from "@mui/lab";

function AttachmentsSection() {
  const tenderContext = useContext(TenderContext);
  const [open, setOpen] = useState<boolean>(false);
  const { tender, getTenderData } = useContext(TenderContext);
  const [fileToEdit, setFileToEdit] = useState<TenderFile | undefined>(
    undefined
  );
  const [formStatus, setFormStatus] = useState<FormStatus>("none");
  const inputProps = {
    loading: formStatus === "loading",
    disabled: formStatus === "loading" || formStatus === "disabled",
  };
  const snackbar = useSnackbar();

  function handleOpenDialog() {
    setOpen(true);
  }
  function openAddDialog() {
    setFileToEdit(undefined);
    handleOpenDialog();
  }
  function openEditDialog(file: TenderFile) {
    return function () {
      setFileToEdit(file);
      handleOpenDialog();
    };
  }

  function DeleteFile(id: number) {
    return function () {
      setFormStatus("disabled");
      axios
        .delete(Api(`employee/tender/file/${id}`))
        .then((res) => {
          getTenderData && getTenderData();
          snackbar.enqueueSnackbar("تم حذف المرفق بنجاح");
        })
        .catch((err) => {
          snackbar.enqueueSnackbar("تعذر في حذف لبمرفق ");
        })
        .finally(() => {
          setFormStatus("none");
        });
    };
  }
  function saveFile() {
    setFormStatus("loading");
    axios
      .get(Api(`employee/tender/file/save/${tenderContext.tenderId}`))
      .then((res) => {
        tenderContext.getTenderData && tenderContext.getTenderData();
        snackbar.enqueueSnackbar("تم حفظ المرفقات بنجاح");
      })
      .catch((err) => {
        snackbar.enqueueSnackbar("تعذر حفظ المرفقات", { variant: "error" });
      })
      .finally(() => {
        setFormStatus("none");
      });
  }
  return (
    <Stack>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          onClick={openAddDialog}
          {...inputProps}
        >
          اضافة مرفق
        </Button>
      </Box>
      <Stack>
        {typeof tender === "object" && tender.tender_files && (
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

              <TableBody>
                {tender.tender_files.map((file) => (
                  <TableRow>
                    <TableCell>{file.id}</TableCell>
                    <TableCell>{file.name}</TableCell>
                    <TableCell>{file.discription}</TableCell>
                    <TableCell>
                      <Stack spacing={1} width="fit-content">
                        {file.media?.map((media) => (
                          <Button
                            startIcon={<FolderOpenIcon />}
                            component="a"
                            size="small"
                            target="_blank"
                            href={media.original_url}
                            {...inputProps}
                          >
                            عرض الملف
                          </Button>
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={openEditDialog(file)}
                        {...inputProps}
                      >
                        <EditNoteIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={DeleteFile(file.id)}
                        color="error"
                        {...inputProps}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                onClick={saveFile}
                {...inputProps}
              >
                حفظ
              </LoadingButton>
            </Box>
          </TableContainer>
        )}
        <SetDialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          fileToEdit={fileToEdit}
        />
      </Stack>
    </Stack>
  );
}

export default AttachmentsSection;
