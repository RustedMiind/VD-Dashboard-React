import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import axios from "axios";
import { Api } from "../../../../constants";
import { useContext } from "react";
import { ContractContext } from "../../Context/Store";
import { Contract } from "../../../../types";
import { ContractsContext } from "../../Context/ContractsContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function BtnCus() {
  const deletedClientsIds = useContext(ContractContext);
  const contractsContext = useContext(ContractsContext);
  let idEdit = deletedClientsIds?.selectedIds;
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  function Delete() {
    axios
      .post<{ data: Contract }>(Api("employee/contract/delete"), {
        id: deletedClientsIds?.selectedIds,
      })
      .then((res) => {
        contractsContext.setContracts && contractsContext.setContracts();
        enqueueSnackbar("تم حذف العقد بنجاح");
        deletedClientsIds?.setSelectedIds([]);
      })
      .catch((err) => {
        enqueueSnackbar("تعذر في حذف العقد ", { variant: "error" });
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
    </Stack>
  );
}
