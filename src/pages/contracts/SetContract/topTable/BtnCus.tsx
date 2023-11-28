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

export default function BtnCus({ setRequests }: PropsType) {
  const deletedClientsIds = useContext(ContractContext);
  const contractsContext = useContext(ContractsContext);
  function Delete() {
    console.log(deletedClientsIds);
    axios
      .post<{ data: Contract }>(Api("employee/contract/delete"), {
        id: deletedClientsIds?.index,
      })
      .then((res) => {
        console.log(res);
        contractsContext.setContracts && contractsContext.setContracts();
      })
      .catch((err) => {
        console.log(err);
      });
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
        sx={{ borderRadius: "10px", ml: 2, my: 2, px: 3 }}
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={Delete}
      >
        حذف
      </Button>
      <Button
        sx={{ borderRadius: "10px", ml: 2, my: 2, px: 3 }}
        variant="outlined"
        startIcon={<CreditScoreIcon />}
      >
        تعديل
      </Button>
    </Stack>
  );
}
type PropsType = {
  setRequests:
    | React.Dispatch<React.SetStateAction<Contract[] | null>>
    | undefined;
};
