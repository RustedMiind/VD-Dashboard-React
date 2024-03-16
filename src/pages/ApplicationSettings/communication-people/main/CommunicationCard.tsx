import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
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
    <Card elevation={2}>
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          العميل رقم {person.id}
        </Typography>
        <Typography variant="h5" component="div">
          {person.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {person.phone}
        </Typography>
        <Typography variant="body2">
          {!!person.inside_saudi ? (
            <Typography color="secondary">داخل المملكة</Typography>
          ) : (
            <Typography color="text.secondary">خارج المملكة</Typography>
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() => {
            handleClose();
            setType("edit");
            setIdToEdit(person.id);
          }}
        >
          تعديل البيانات
        </Button>
        <Button
          color="error"
          variant="text"
          sx={{ ml: 2 }}
          onClick={() => {
            setOpen(!open);
            setIdToDeleted(person.id);
          }}
        >
          حذف
        </Button>
        <DeleteDialog
          open={open}
          setOpen={setOpen}
          CommunicationData={CommunicationData}
          id={idToDeleted}
        />
      </CardActions>
    </Card>
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
