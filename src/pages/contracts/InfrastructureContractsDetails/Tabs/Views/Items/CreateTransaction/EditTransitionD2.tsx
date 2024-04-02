import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle, TextField, Typography } from "@mui/material";
import AddLabelToEl from "../../../../../../../components/AddLabelToEl";
import EditTransactionD3 from "./EditTransactionD3";

export default function EditTransitionD2({
  open,
  setOpen,
}: EditTransitionD2Props) {
  //   TODO::define our component state variables
  const [transactionId, setTransactionId] = React.useState("");
  const [error, setError] = React.useState(false);
  const [openNextEditD, setOpenNextEditD] = React.useState(false);
  //TODO::define helper functions
  const handleClose = () => {
    setOpen(false);
  };
  const handleNextStep = () => {
    if (transactionId.trim().length == 0) {
      setError(true);
      return;
    } else setError(false);

    setOpenNextEditD(true);
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
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
          الرد على معاملة
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
          <AddLabelToEl label={"ادخل رقم المعاملة"} required>
            <TextField
              required
              size="small"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder={"ادخل رقم المعاملة"}
            />
            {error && (
              <Typography variant="body2" color="error">
                لا بد من ادخال رقم المعاملة
              </Typography>
            )}
          </AddLabelToEl>
          <Button
            sx={{
              width: "50%",
              marginTop: "3rem",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            onClick={handleNextStep}
            variant="contained"
          >
            التالي
          </Button>

          <Button
            sx={{
              width: "50%",
              marginTop: "8px",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            onClick={handleClose}
            variant="outlined"
          >
            رجوع
          </Button>
        </DialogContent>
      </Dialog>
      <EditTransactionD3
        open={openNextEditD}
        setOpen={setOpenNextEditD}
        transactionId={transactionId}
      />
    </>
  );
}

type EditTransitionD2Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
