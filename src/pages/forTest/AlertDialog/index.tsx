import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import img1 from "../../../assets/images/Vector.png";

export default function AlertDaialog() {
  return (
    <Dialog open={true} onClose={() => {}} maxWidth="xs">
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          rowGap={2}
        >
          <img width={"80"} src={img1} alt="" />
          <Typography
            variant="body2"
            sx={{ fontWeight: "800", textAlign: "center", py: 1 }}
          >
            هل تريد الحفظ مع تغيير الحالة ام الحفظ فقط ؟
          </Typography>
          <Button variant="outlined">حفظ مع تغيير الحالة</Button>
          <Button variant="contained">حفظ</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
