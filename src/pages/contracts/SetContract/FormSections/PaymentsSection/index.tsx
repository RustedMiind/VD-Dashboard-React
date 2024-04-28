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
} from "@mui/material";
import { useContext, useState } from "react";
import { ContractPayment } from "../../../../../types";
import { ContractDetailsContext } from "../../ContractDetailsContext";
import { Api } from "../../../../../constants";
import axios from "axios";
import SetDialog, { getOptions } from "./SetDialog";
// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useSnackbar } from "notistack";

function Payments() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "update">("add");
  const [paymentToEdit, setPaymentToEdit] = useState<
    ContractPayment | undefined
  >(undefined);
  const { enqueueSnackbar } = useSnackbar();
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

  function handleDelete(paymentId?: string | number) {
    return () => {
      if (paymentId)
        axios
          .delete(Api(`employee/contract/payment/${paymentId}`))
          .then(() => {
            if (ContractDetails.refreshContract)
              ContractDetails.refreshContract();
            enqueueSnackbar("تم الحذف بنجاح");
          })
          .catch(() => {
            enqueueSnackbar("تعذر في الحذف", { variant: "error" });
          });
    };
  }

  const ContractDetails = useContext(ContractDetailsContext);

  const options = getOptions(ContractDetails.contract);

  return (
    <>
      {dialogMode === "add" ? (
        <SetDialog open={dialogOpen} handleClose={handleCloseDialog} />
      ) : (
        paymentToEdit && (
          <SetDialog
            open={dialogOpen}
            handleClose={handleCloseDialog}
            edit
            paymentData={paymentToEdit}
          />
        )
      )}
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
                      <TableCell>
                        {
                          options.find(
                            (option) => option.value === payment.status
                          )?.name
                        }
                      </TableCell>
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
