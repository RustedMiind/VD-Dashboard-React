import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DialogTitle } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function DialogAddFloor(props: TypeProps) {
  return (
    <Dialog
      open={props.open}
      fullWidth
      maxWidth={"md"}
      onClose={props.closeDialog}
      component="form"
    >
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          right: 20,
          mt: 3,
          border: "solid 1px ",
          borderRadius: "8px",
        }}
        color="primary"
        onClick={props.closeDialog}
      >
        <GridCloseIcon fontSize="inherit" />
      </IconButton>

      <DialogTitle
        textAlign={"start"}
        fontWeight={500}
        pt={4}
        sx={{ bgcolor: "Background" }}
      >
        إضافة الأدوار
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "Background" }}>
        <Paper sx={{ padding: 2, my: 2 }}>
          <Grid container spacing={2} component="form">
            <Grid item md={12}>
              <Stack>
                <Typography fontSize={14} component={"label"}>
                  عدد الأدوار{" "}
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  placeholder={"عدد الأدوار "}
                />
              </Stack>
            </Grid>
            <Grid item md={12}>
              <Stack>
                <Typography fontSize={14} component={"label"}>
                  العمق{" "}
                </Typography>
                <TextField type="text" size="small" placeholder={"العمق "} />
              </Stack>
            </Grid>
            <Grid item md={12}>
              <Stack>
                <Typography fontSize={14} component={"label"}>
                  الحد الأدنى
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  placeholder={"الحد الأدنى"}
                />
              </Stack>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ padding: 2 }}>
          <Grid container spacing={2} component="form">
            <Grid item md={12}>
              <Stack>
                <Typography fontSize={14} component={"label"}>
                  عدد الأدوار{" "}
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  placeholder={"عدد الأدوار "}
                />
              </Stack>
            </Grid>
            <Grid item md={12}>
              <Stack>
                <Typography fontSize={14} component={"label"}>
                  العمق{" "}
                </Typography>
                <TextField type="text" size="small" placeholder={"العمق "} />
              </Stack>
            </Grid>
            <Grid item md={12}>
              <Stack>
                <Typography fontSize={14} component={"label"}>
                  الحد الأدنى
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  placeholder={"الحد الأدنى"}
                />
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        <Grid container padding={2}>
          <Grid item md={12}>
            <LoadingButton variant="contained" type="submit" fullWidth>
              <AddCircleOutlineIcon />
              إضافة مساحة أخرى
            </LoadingButton>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <LoadingButton variant="contained" type="submit" sx={{ width: 0.7 }}>
          حفظ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default DialogAddFloor;

type TypeProps = {
  open: boolean;
  closeDialog: () => void;
};
