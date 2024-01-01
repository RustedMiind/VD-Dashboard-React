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
import SetDialog from "./SetDialog";
import { TenderContext } from "../../TenderCondext";
import axios from "axios";
import { Api } from "../../../../../constants";
import { TenderAmount } from "../../../../../types/Tenders/TenderAmount";

function AmountsSection() {
  const tenderContext = useContext(TenderContext);
  const [amountToEdit, setAmountToEdit] = useState<TenderAmount | undefined>(
    undefined
  );
  const { tender } = useContext(TenderContext);
  const [open, setOpen] = useState<boolean>(false);
  function handleOpenDialog() {
    setOpen(true);
  }
  function openAddDialog() {
    setAmountToEdit(undefined);
    handleOpenDialog();
  }
  function openEditDialog(amount: TenderAmount) {
    return function () {
      setAmountToEdit(amount);
      handleOpenDialog();
    };
  }
  function DeleteAmount(id: number) {
    return function () {
      axios
        .delete(Api(`employee/tender/amount/${id}`))
        .then((res) => {
          console.log(res);
          tenderContext.getTenderData && tenderContext.getTenderData();
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }
  return (
    <Stack>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          onClick={openAddDialog}
        >
          اضافة بند
        </Button>
      </Box>
      <Stack>
        <TableContainer component={Paper}>
          <Table sx={{ bgcolor: "Background" }}>
            <TableHead>
              <TableRow>
                <TableCell>كود البند</TableCell>
                <TableCell>اسم البند</TableCell>
                <TableCell>الكمية</TableCell>
                <TableCell>المساحة</TableCell>
                <TableCell>وصف البند</TableCell>
                <TableCell>الاعدادات</TableCell>
              </TableRow>
            </TableHead>
            {
              <TableBody>
                {typeof tender === "object" &&
                  tender.tender_amounts?.map((amount) => (
                    <TableRow>
                      <TableCell>{amount.id}</TableCell>
                      <TableCell>{amount.name}</TableCell>
                      <TableCell>{amount.amount}</TableCell>
                      <TableCell>{amount.aria}</TableCell>
                      <TableCell>{amount.discription}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={openEditDialog(amount)}
                        >
                          <EditNoteIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={DeleteAmount(amount.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            }
          </Table>
        </TableContainer>
        <SetDialog open={open} setOpen={setOpen} tenderAmount={amountToEdit} />
      </Stack>
    </Stack>
  );
}

export default AmountsSection;
