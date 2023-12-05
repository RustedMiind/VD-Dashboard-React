import { Alert, Button, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import axios from "axios";
import { Api } from "../../../../constants";
import { useContext, useState } from "react";
import { ContractContext } from "../../Context/Store";
import { Contract } from "../../../../types";
import { ContractsContext } from "../../Context/ContractsContext";
import { useNavigate } from "react-router-dom";

export default function BtnCus() {
  const deletedClientsIds = useContext(ContractContext);
  const contractsContext = useContext(ContractsContext);
  let idEdit = deletedClientsIds?.selectedIds;
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

  const navigate = useNavigate();
  function Delete() {
    axios
      .post<{ data: Contract }>(Api("employee/contract/delete"), {
        id: deletedClientsIds?.selectedIds,
      })
      .then((res) => {
        console.log(res);
        contractsContext.setContracts && contractsContext.setContracts();
        updateAndOpenToaster({
          severity: "success",
          message: "تم حذف العقد بنجاح",
        });
        deletedClientsIds?.setSelectedIds([]);
      })
      .catch((err) => {
        console.log(err);
        updateAndOpenToaster({
          severity: "error",
          message: "تعذر في حذف العقد ",
        });
      });
  }

  function Update() {
    if (idEdit?.length === 1) {
      navigate(`${idEdit[0]}/edit`);
    }
  }

  return (
    <Stack direction={"row"}>
      <Button
        sx={{ borderRadius: "10px", ml: 2, my: 2, px: 3 }}
        variant="outlined"
        startIcon={<FilterAltIcon />}
      >
        فلتر
      </Button>
      <Button
        color="error"
        disabled={idEdit?.length === 0}
        sx={{ borderRadius: "10px", ml: 2, my: 2, px: 3 }}
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={Delete}
      >
        حذف
      </Button>
      <Button
        disabled={idEdit?.length !== 1}
        sx={{ borderRadius: "10px", ml: 2, my: 2, px: 3 }}
        variant="outlined"
        startIcon={<CreditScoreIcon />}
        onClick={Update}
      >
        تعديل
      </Button>
      <Snackbar
        open={toaster.open}
        autoHideDuration={6000}
        onClose={handleCloseToaster}
      >
        <Alert
          onClose={handleCloseToaster}
          severity={toaster.severity}
          sx={{ width: "100%" }}
        >
          {toaster.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
export type ToasterType = {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};
