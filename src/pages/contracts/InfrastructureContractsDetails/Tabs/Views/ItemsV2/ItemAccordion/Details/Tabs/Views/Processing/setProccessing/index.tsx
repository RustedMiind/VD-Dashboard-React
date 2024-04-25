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

enum ProccessingActions {
  CREATE = "create",
  REPLY = "reply",
}

export default function ChooseProcessingType(props: ChooseProcessingTypeProps) {
  // TODO::define our component state variables
  let { open, setOpen } = props;
  const [operationType, setOperationType] = useState<ProccessingActions>(
    ProccessingActions.CREATE
  );
  const [openCreateNewProccessDialog, setOpenCreateNewProccessDialog] =
    useState(false);
  const [openReplyProccessDialog, setOpenReplyProccessDialog] = useState(false);

  // TODO::define helper functions
  const handleClose = () => {
    setOpen(false);
  };
  const handleNextStep = () => {
    switch (operationType) {
      case ProccessingActions.CREATE:
        setOpenCreateNewProccessDialog(true);
        handleClose();
        break;
      case ProccessingActions.REPLY:
        setOpenReplyProccessDialog(true);
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
      >
        <DialogTitle sx={{ textAlign: "center" }} fontWeight={800}>
          انشاء المعاملة
        </DialogTitle>
        <DialogContent
          sx={{
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
            value={operationType}
            onChange={(e) =>
              setOperationType(e.target.value as ProccessingActions)
            }
          >
            <FormControlLabel
              value={ProccessingActions.CREATE}
              control={<Radio />}
              label="جديد"
            />
            <FormControlLabel
              value={ProccessingActions.REPLY}
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
        onClose={() => setOpenCreateNewProccessDialog(false)}
      />
      <ReplyProccessing
        open={openReplyProccessDialog}
        onClose={() => setOpenReplyProccessDialog(false)}
      />
    </>
  );
}

type ChooseProcessingTypeProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
