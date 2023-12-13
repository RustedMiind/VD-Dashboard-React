import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Typography,
} from "@mui/material";
import { DialogState } from "../branchDetails/FilterDetails";
export default function ErrorDialog(props: PropsType) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogContent sx={{ px: 4, pt: 6 }}>
        <Typography fontWeight={700}>{props.massage}</Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ my: 2, px: 5 }}
          onClick={props.onClose}
        >
          رجوع
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  open: boolean;
  onClose: () => void;
  massage: string | null;
};
