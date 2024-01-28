import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItem } from "@mui/material";
import RequiredSymbol from "../../../../../components/RequiredSymbol";

export default function DialogAddLocation(props: TypeProps) {
  return (
    <>
      <Dialog
        maxWidth={"sm"}
        fullWidth
        open={props.open}
        onClose={props.closeDialog}
      >
        <DialogTitle sx={{ fontWeight: "600", textAlign: "center" }}>
          اضافة موقع
        </DialogTitle>
        <DialogContent>
          <Grid container p={1} spacing={4}>
            <Grid item md={6}>
              <Typography sx={{ ml: 2 }}>
                اسم الموقع <RequiredSymbol />
              </Typography>
              <TextField
                type="text"
                size="small"
                fullWidth
                onChange={(e) => {}}
              />
            </Grid>
            <Grid item md={6}>
              <Typography>
                المدينة <RequiredSymbol />
              </Typography>
              <FormControl fullWidth size="small">
                <Select onChange={() => {}}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <Typography sx={{ ml: 2 }}>
                نظام البناء <RequiredSymbol />
              </Typography>
              <TextField
                type="text"
                size="small"
                fullWidth
                onChange={(e) => {}}
              />
            </Grid>
            <Grid item md={6}>
              <Typography sx={{ ml: 2 }}>
                الموقع <RequiredSymbol />
              </Typography>
              <TextField
                type="text"
                size="small"
                fullWidth
                onChange={(e) => {}}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" sx={{ mb: 2 }} onClick={() => {}}>
            حفظ
          </Button>
        </DialogActions>
        <IconButton
          onClick={props.closeDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>
    </>
  );
}
type TypeProps = {
  open: boolean;
  closeDialog: () => void;
};
