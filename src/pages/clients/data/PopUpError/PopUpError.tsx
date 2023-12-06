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
          color={card_idError ? "error" : "warning"}
          sx={{ fontSize: "86px", alignSelf: "center" }}
        />
        <Typography
          sx={{ mt: 4, fontSize: "24px" }}
          color={card_idError ? "error" : "secondary.main"}
        >
          {card_idError || registerError
            ? "لا يمكن حفظ بيانات العميل رقم الهوية مسجل مسبقا"
            : ` رقم الجوال مسجل مسبقا
             هل تريد الاستمرار؟`}
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
