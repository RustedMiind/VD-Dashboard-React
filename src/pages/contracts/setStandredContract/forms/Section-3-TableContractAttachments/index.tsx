import { Box, Button, Table, TableContainer } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TableHeaders from "./components/TableHeaders";
import TableBodyData from "./components/TableBodyData";
import SetDialog from "./components/Dialog";
import { Contract } from "../../../../../types";
import { Api } from "../../../../../constants";
import axios from "axios";
import { StandredContractContext } from "../../context/StandredContractContext";

export default function TableContractAttachments() {
  // TODO::declare and define component state and variables
  const [openDialog, setOpenDialog] = useState(false);
  const { contract } = useContext(StandredContractContext);
  const [contractDetails, setContractDetails] = useState<
    undefined | Contract[]
  >(undefined);
  // TODO::declare and define component helper methods

  function getContract() {
    axios
      .get<{ unified_contract: Contract[] }>(
        Api(`employee/unified-contract/${contract?.id}`)
      )
      .then((res) => {
        setContractDetails(res.data.unified_contract);
      })
      .catch((err) => {
        setContractDetails(undefined);
      });
  }
  useEffect(() => {
    getContract();
  }, []);
  // * return component UI.
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          onClick={() => setOpenDialog(!openDialog)}
        >
          اضافة مرفق
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHeaders />
          <TableBodyData
            contractDetails={contractDetails}
            getContract={getContract}
          />
        </Table>
      </TableContainer>
      <SetDialog
        open={openDialog}
        setOpen={setOpenDialog}
        getContract={getContract}
      />
    </>
  );
}
