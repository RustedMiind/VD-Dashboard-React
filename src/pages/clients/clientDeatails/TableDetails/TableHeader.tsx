import { Grid, Stack, Typography, Button, TextField } from "@mui/material";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DeleteIcon from "@mui/icons-material/Delete";

function TableHeader() {
  return (
    <Grid container px={2} py={3}>
      <Grid item xs={2}>
        <Typography variant="subtitle2">حالات العقد</Typography>
      </Grid>
      <Grid item xs={6}>
        <Stack
          component="form"
          direction="row"
          gap={1}
          sx={{
            button: { px: 4 },
            position: "relative",
          }}
        >
          <TextField label="بحث" sx={{ flexGrow: 1 }} size="small" />
          <Button variant="contained" type="submit">
            بحث
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={3} display={"left"}>
        <Stack direction="row">
          <Button
            sx={{ borderRadius: "10px", ml: 2, px: 4 }}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            حذف
          </Button>
          <Button
            sx={{ borderRadius: "10px", ml: 2, px: 4 }}
            variant="outlined"
            startIcon={<CreditScoreIcon />}
          >
            تعديل
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default TableHeader;
