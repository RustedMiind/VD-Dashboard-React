import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import CreateTransactionDialog from "./SetTransaction";
import EditTransitionD2 from "./ReplyTransaction";

export default function ChooseOperationTypeDialog({
  open,
  setOpen,
  setActiveSubItemId
}: CreateOrUpdateTransactionsD1Props) {
  //   TODO::define our component state variables
  const [operationType, setOperationType] = React.useState("create");
  const [openCreateD2, setOpenCreateD2] = React.useState(false);
  const [openEditD2, setOpenEditD2] = React.useState(false);
  //TODO::define helper functions
  const handleClose = () => {
    setOpen(false);
  };
  const handleNextStep = () => {
    switch (operationType) {
      case "create":
        setOpenCreateD2(true);
        handleClose();
        break;
      case "edit":
        setOpenEditD2(true);
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
      <CreateTransactionDialog open={openCreateD2} setOpen={setOpenCreateD2} setActiveSubItemId={setActiveSubItemId} />
      <EditTransitionD2 open={openEditD2} setOpen={setOpenEditD2} />
    </>
  );
}

type CreateOrUpdateTransactionsD1Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveSubItemId: React.Dispatch<React.SetStateAction<number>>;
};
