import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CommunicationPerson } from "../../../../types/CommunicationPeople";
import { useState } from "react";
import DeleteDialog from "./Dialog/DeleteDialog";

function CommunicationCard({
  person,
  handleClose,
  setType,
  setIdToEdit,
  CommunicationData,
}: PropsType) {
  const [open, setOpen] = useState<boolean>(false);
  const [idToDeleted, setIdToDeleted] = useState<number>();
  return (
    <>
      <TableRow>
        <TableCell>{person.title}</TableCell>
        <TableCell>{person.phone}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => {
              handleClose();
              setType("edit");
              setIdToEdit(person.id);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            sx={{ ml: 2 }}
            onClick={() => {
              setOpen(!open);
              setIdToDeleted(person.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <DeleteDialog
        open={open}
        setOpen={setOpen}
        CommunicationData={CommunicationData}
        id={idToDeleted}
      />
    </>
  );
}

type PropsType = {
  person: CommunicationPerson;
  handleClose: () => void;
  setType: React.Dispatch<React.SetStateAction<"add" | "edit">>;
  setIdToEdit: React.Dispatch<React.SetStateAction<number | undefined>>;
  CommunicationData: () => void;
};

export default CommunicationCard;
