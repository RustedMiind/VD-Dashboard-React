import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import GridItem from "../../../GridItem";
import { TextField } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DialogTitle } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function DialogAddArea({ open, setOpen }: propsType) {
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth={"md"}
      onClose={() => setOpen(false)}
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
        onClick={() => setOpen(false)}
      >
        <GridCloseIcon fontSize="inherit" />
      </IconButton>

      <DialogTitle
        textAlign={"start"}
        fontWeight={500}
        pt={4}
        sx={{ bgcolor: "Background" }}
      >
        إضافة مساحة
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "Background" }}>
        <Paper sx={{ padding: 2, my: 2 }}>
          <Grid container spacing={2} component="form">
            <GridItem>
              <Typography component={"label"}>المساحة من</Typography>
              <TextField type="text" size="small" placeholder={"المساحة من"} />
            </GridItem>
            <GridItem>
              <Typography component={"label"}>المساحة إلى</Typography>
              <TextField type="text" size="small" placeholder={"المساحة إلى"} />
            </GridItem>
            <Grid item md={12}>
              <Stack>
                <Typography component={"label"}>العدد المقابل </Typography>
                <TextField
                  type="text"
                  size="small"
                  placeholder={"العدد المقابل "}
                />
              </Stack>
            </Grid>
            <Grid item md={12}>
              <Stack>
                <Typography component={"label"}>الحد الأدنى </Typography>
                <TextField
                  type="text"
                  size="small"
                  placeholder={"الحد الأدنى "}
                />
              </Stack>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ padding: 2 }}>
          <Grid container spacing={2} component="form">
            <GridItem>
              <Typography component={"label"}>المساحة من</Typography>
              <TextField type="text" size="small" placeholder={"المساحة من"} />
            </GridItem>
            <GridItem>
              <Typography component={"label"}>المساحة إلى</Typography>
              <TextField type="text" size="small" placeholder={"المساحة إلى"} />
            </GridItem>
            <Grid item md={12}>
              <Stack>
                <Typography component={"label"}>العدد المقابل </Typography>
                <TextField
                  type="text"
                  size="small"
                  placeholder={"العدد المقابل "}
                />
              </Stack>
            </Grid>
            <Grid item md={12}>
              <Stack>
                <Typography component={"label"}>الحد الأدنى </Typography>
                <TextField
                  type="text"
                  size="small"
                  placeholder={"الحد الأدنى "}
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

export default DialogAddArea;

type propsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
