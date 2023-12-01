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
import { ContractPayment } from "../../../../../types";
import { ToasterType } from "../../../../../types/other/ToasterStateType";
import { ContractDetailsContext } from "../../ContractDetailsContext";
import { Api } from "../../../../../constants";
import axios from "axios";
import SetDialog from "./SetDialog";
// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";

function Payments() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "update">("add");
  const [paymentToEdit, setPaymentToEdit] = useState<
    ContractPayment | undefined
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
  function handleOpenUpdateDialog(paymentData: ContractPayment) {
    return () => {
      setDialogMode("update");
      handleOpenDialog();
      setPaymentToEdit(paymentData);
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

  function handleDelete(paymentId?: string | number) {
    return () => {
      if (paymentId)
        axios
          .delete(Api(`employee/contract/payment/${paymentId}`))
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
        paymentToEdit && (
          <SetDialog
            toaster={toaster}
            updateAndOpenToaster={updateAndOpenToaster}
            open={dialogOpen}
            handleClose={handleCloseDialog}
            edit
            paymentData={paymentToEdit}
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
          اضافة دفعة
        </Button>
      </Box>
      <Stack>
        <TableContainer sx={{ height: 500 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>كود الدفعه</TableCell>
                <TableCell>اسم الدفعه</TableCell>
                <TableCell>مده الدفعه</TableCell>
                <TableCell>قيمة الدفعه</TableCell>
                <TableCell>اختيار حاله الدفعه</TableCell>
                <TableCell>الاعدادات</TableCell>
              </TableRow>
            </TableHead>
            {
              <TableBody>
                {ContractDetails?.contract?.payments?.map((payment) => {
                  return (
                    <TableRow>
                      <TableCell>{payment.id}</TableCell>
                      <TableCell>{payment.name}</TableCell>
                      <TableCell>{payment.period}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.status}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={handleOpenUpdateDialog(payment)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={handleDelete(payment.id)}
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

export default Payments;
