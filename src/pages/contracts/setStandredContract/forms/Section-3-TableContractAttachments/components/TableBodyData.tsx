import {
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import axios from "axios";
import SetDialog from "./Dialog";
import { useState } from "react";
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Contract } from "../../../../../../types";
import { Api } from "../../../../../../constants";
import { ContractAttachment } from "../../../../../../types/Contracts/ContractAttachment";

export default function TableBodyData(props: PropsType) {
  // declare and define component state and variables
  let { contractDetails, getContract } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [EditedContractAttachment, setEditedContractAttachment] = useState<
    undefined | ContractAttachment
  >(undefined);

  function handleDelete(leverId?: string | number) {
    if (leverId)
      axios
        .delete(Api(`employee/contract/lever/${leverId}`))
        .then(() => {
          getContract();
          enqueueSnackbar("تم الحذف بنجاح");
        })
        .catch(() => {
          enqueueSnackbar("تعذر في الحذف", { variant: "error" });
          console.log("first");
        });
  }

  // return component ui
  return (
    <>
      <TableBody>
        {contractDetails &&
          contractDetails[0].levers?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.contract_lever_attachment_type.name}</TableCell>
              <TableCell>
                <Button
                  component={"a"}
                  href={item?.card_path}
                  target="_blank"
                  startIcon={<FolderOpenIcon />}
                >
                  عرض الملف
                </Button>
              </TableCell>
              <TableCell>
                {/* <IconButton size="small">
                  <PrintIcon />
                </IconButton> */}
                <IconButton
                  size="small"
                  onClick={() => {
                    setEditedContractAttachment(item);
                    setOpenDialog(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDelete(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <SetDialog
        open={openDialog}
        setOpen={setOpenDialog}
        getContract={getContract}
        EditedContractAttachment={EditedContractAttachment}
      />
    </>
  );
}
type PropsType = {
  contractDetails: Contract[] | undefined;
  getContract: () => void;
};
