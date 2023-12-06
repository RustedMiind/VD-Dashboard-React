import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
export default function PopUpError({
  registerError,
  card_idError,
  open,
  handleClickOpen,
  setOpen,
  checkPhone,
}: PropsType) {
  return (
    <Dialog
      open={open}
      onClose={handleClickOpen}
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
        display={"flex"}
        flexDirection={"column"}
      >
        <ErrorIcon
          color="warning"
          sx={{ fontSize: "86px", alignSelf: "center" }}
        />
        <Typography sx={{ mt: 4 }}>
          {card_idError || registerError
            ? card_idError
            : " رقم الجوال مسجل مسبقاهل تريد الاستمرار؟"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            mt: 3,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(!open);
            }}
            sx={{ px: 5, border: 2 }}
          >
            رجوع
          </Button>

          {card_idError ? (
            ""
          ) : (
            <Button sx={{ px: 5 }} variant="contained" onClick={checkPhone}>
              نعم
            </Button>
          )}
        </Box>
      </Box>
    </Dialog>
  );
}

type PropsType = {
  phoneError?: string;
  card_idError?: string;
  registerError?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickOpen?: () => void;
  checkPhone: () => void;
};
