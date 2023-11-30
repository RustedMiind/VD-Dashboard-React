import {
  Box,
  Button,
  Stack,
  Typography,
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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { NavLink } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SetDialog from "./SetDialog";
import { useContext, useState } from "react";
import { ContractDetailsContext } from "../../ContractDetailsContext";
import axios from "axios";
import { Api } from "../../../../../constants";
import { ContractTask } from "../../../../../types";

function ContractTasks() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "update">("add");
  const [taskToEdit, setTaskToEdit] = useState<ContractTask | undefined>(
    undefined
  );

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
  function handleOpenUpdateDialog(taskData: ContractTask) {
    return () => {
      setDialogMode("update");
      handleOpenDialog();
      setTaskToEdit(taskData);
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

  const ContractDetails = useContext(ContractDetailsContext);

  function handleDelete(taskId?: string) {
    return () => {
      if (taskId)
        axios
          .delete(Api(`employee/contract/task/${taskId}`))
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
        taskToEdit && (
          <SetDialog
            toaster={toaster}
            updateAndOpenToaster={updateAndOpenToaster}
            open={dialogOpen}
            handleClose={handleCloseDialog}
            edit
            taskData={taskToEdit}
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
          اضافة مهمه
        </Button>
      </Box>
      <Stack>
        <TableContainer sx={{ height: 500 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>كود المهمه</TableCell>
                <TableCell>اسم المهمه</TableCell>
                <TableCell>مده المهمه</TableCell>
                <TableCell>قيمة المهمه</TableCell>
                <TableCell>المسؤول عن المهمه</TableCell>
                <TableCell>الاعدادات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ContractDetails?.contract?.tasks?.map((task) => (
                <TableRow sx={{ background: "white" }}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.period}</TableCell>
                  <TableCell>{task.amount}</TableCell>
                  <TableCell>{task.employees?.name}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={handleOpenUpdateDialog(task)}
                    >
                      <EditNoteIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={handleDelete(task.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
}

export type ToasterType = {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

export default ContractTasks;
