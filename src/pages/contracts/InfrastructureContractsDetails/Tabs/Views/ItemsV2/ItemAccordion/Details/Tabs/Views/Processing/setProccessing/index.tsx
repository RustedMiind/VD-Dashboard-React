import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import CreateNewProccessing from "./create/step-1";
import CreateNewProccessDialog from "./create";
import ReplyProccessing from "./reply";

export default function ChooseProcessingType(props: ChooseProcessingTypeProps) {
  // TODO::define our component state variables
  let { open, setOpen } = props;
  const [operationType, setOperationType] = useState("create");
  const [openCreateNewProccessDialog, setOpenCreateNewProccessDialog] =
    useState(false);
  const [openEditProccessDialog, setOpenEditProccessDialog] = useState(false);

  // TODO::define helper functions
  const handleClose = () => {
    setOpen(false);
  };
  const handleNextStep = () => {
    switch (operationType) {
      case "create":
        setOpenCreateNewProccessDialog(true);
        handleClose();
        break;
      case "edit":
        setOpenEditProccessDialog(true);
        handleClose();
        break;
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "100vw",
            minHeight: 300,
          },
        }}
      >
        <DialogTitle
          sx={{ textAlign: "center" }}
          bgcolor={"background.default"}
          fontWeight={800}
        >
          انشاء المعاملة
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: "#fff",
            padding: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e) => setOperationType(e.target.value)}
            value={operationType}
          >
            <FormControlLabel value="create" control={<Radio />} label="جديد" />
            <FormControlLabel
              value="edit"
              control={<Radio />}
              label="رد على المعاملة"
            />
          </RadioGroup>
          <Button
            sx={{
              width: "50%",
              marginTop: "3rem",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            onClick={() => handleNextStep()}
            variant="contained"
          >
            التالي
          </Button>
        </DialogContent>
      </Dialog>
      <CreateNewProccessDialog
        open={openCreateNewProccessDialog}
        setOpen={setOpenCreateNewProccessDialog}
      />
      <ReplyProccessing
        open={openEditProccessDialog}
        setOpen={setOpenEditProccessDialog}
      />
    </>
  );
}

type ChooseProcessingTypeProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
