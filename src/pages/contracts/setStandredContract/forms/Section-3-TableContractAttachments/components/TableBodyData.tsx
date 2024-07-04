import {
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Contract } from "../../../../../../types";
import SetDialog from "./Dialog";
import { useState } from "react";
import { ContractAttachment } from "../../../../../../types/Contracts/ContractAttachment";
import ItemDetails from "../../../../InfrastructureContractsDetails/Tabs/Views/ItemsV2/ItemAccordion/Details";

export default function TableBodyData(props: PropsType) {
  // declare and define component state and variables
  let { contractDetails, getContract } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [EditedContractAttachment, setEditedContractAttachment] = useState<
    undefined | ContractAttachment
  >(undefined);

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
                <IconButton size="small" color="error">
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
