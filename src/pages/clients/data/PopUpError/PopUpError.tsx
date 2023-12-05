import { Box, Dialog, Typography } from "@mui/material";
export default function PopUpError({
  phoneError,
  card_idError,
  open,
  handleClose,
}: PropsType) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
          p: 5,
        }}
        noValidate
        autoComplete="off"
      >
        <Typography>{phoneError ? phoneError : card_idError}</Typography>
      </Box>
    </Dialog>
  );
}

type PropsType = {
  phoneError?: string;
  card_idError?: string;
  open: boolean;
  handleClose: () => void;
};
