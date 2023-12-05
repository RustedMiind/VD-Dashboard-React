import {
  Box,
  Button,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { useContext, useState } from "react";
import { ToasterType } from "../../../../../types/other/ToasterStateType";
import { ContractDetailsContext } from "../../ContractDetailsContext";
import { Api } from "../../../../../constants";
import axios from "axios";
import SetDialog from "./SetDialog";
import { ContractAttachment } from "../../../../../types/Contracts/ContractAttachment";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

function AttachmentSection() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "update">("add");
  const [attachmentToEdit, setAttachmentToEdit] = useState<
    ContractAttachment | undefined
  >(undefined);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  function handleOpenAddDialog() {
    setDialogMode("add");
    handleOpenDialog();
  }
  function handleOpenUpdateDialog(attachmentData: ContractAttachment) {
    return () => {
      setDialogMode("update");
      handleOpenDialog();
      setAttachmentToEdit(attachmentData);
    };
  }

  const [toaster, setToaster] = useState<ToasterType>({
    open: false,
    message: "",
    severity: "success",
  });
  function updateToaster(partial: Partial<ToasterType>) {
    setToaster({ ...toaster, ...partial });
  }
  function updateAndOpenToaster(partial: Partial<ToasterType>) {
    updateToaster({ ...partial, open: true });
  }
  function handleCloseToaster() {
    updateToaster({ open: false });
  }

  function handleDelete(leverId?: string | number) {
    return () => {
      if (leverId)
        axios
          .delete(Api(`employee/contract/lever/${leverId}`))
          .then(() => {
            if (ContractDetails.refreshContract)
              ContractDetails.refreshContract();
            updateAndOpenToaster({
              severity: "success",
              message: "تم الحذف بنجاح",
            });
          })
          .catch(() => {
            updateAndOpenToaster({
              severity: "error",
              message: "تعذر في الحذف",
            });
          });
    };
  }

  const ContractDetails = useContext(ContractDetailsContext);

  return (
    <>
      {dialogMode === "add" ? (
        <SetDialog
          toaster={toaster}
          updateAndOpenToaster={updateAndOpenToaster}
          open={dialogOpen}
          handleClose={handleCloseDialog}
        />
      ) : (
        attachmentToEdit && (
          <SetDialog
            toaster={toaster}
            updateAndOpenToaster={updateAndOpenToaster}
            open={dialogOpen}
            handleClose={handleCloseDialog}
            edit
            attachmentData={attachmentToEdit}
          />
        )
      )}
      <Snackbar
        open={toaster.open}
        autoHideDuration={6000}
        onClose={handleCloseToaster}
        // action={action}
      >
        <Alert
          onClose={handleCloseToaster}
          severity={toaster.severity}
          sx={{ width: "100%" }}
        >
          {toaster.message}
        </Alert>
      </Snackbar>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          onClick={handleOpenAddDialog}
        >
          اضافة مرفق
        </Button>
      </Box>
      <Stack>
        <TableContainer sx={{ height: 500 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>كود المرفق</TableCell>
                <TableCell>اسم المرفق</TableCell>
                <TableCell>رقم المرفق</TableCell>
                <TableCell>نوع المرفق</TableCell>
                <TableCell>الملف المرفق</TableCell>
                <TableCell>الاعدادات</TableCell>
              </TableRow>
            </TableHead>
            {
              <TableBody>
                {ContractDetails?.contract?.levers?.map((lever) => {
                  return (
                    <TableRow>
                      <TableCell>{lever.id}</TableCell>
                      <TableCell>{lever.name}</TableCell>
                      <TableCell>{lever.code}</TableCell>
                      <TableCell>{lever.type}</TableCell>
                      <TableCell>
                        <Button
                          startIcon={<FolderOpenIcon />}
                          component="a"
                          href={lever.card_path}
                          target="_blank"
                        >
                          عرض الملف
                        </Button>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          component="a"
                          href={lever.card_path}
                          target="_blank"
                        >
                          <PrintIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={handleOpenUpdateDialog(lever)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={handleDelete(lever.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            }
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
}

export default AttachmentSection;
