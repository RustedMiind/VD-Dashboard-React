import { Box, Dialog, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function PopUpError({
  phoneError,
  card_idError,
  open,
  handleClose,
  setOpen,
}: PropsType) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <IconButton
        aria-label="delete"
        size="small"
        sx={{
          position: "absolute",
          right: 20,
          mt: 3,
          border: "solid 1px ",
          borderRadius: "8px",
        }}
        color="primary"
        onClick={() => setOpen(!open)}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
          p: 5,
        }}
        noValidate
        autoComplete="off"
      >
        <Typography sx={{ mt: 4 }}>
          {phoneError ? phoneError : card_idError}
        </Typography>
      </Box>
    </Dialog>
  );
}

type PropsType = {
  phoneError?: string;
  card_idError?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose?: () => void;
};
