import { Grid, Stack, Typography, Button, TextField, Box } from "@mui/material";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DeleteIcon from "@mui/icons-material/Delete";
import StatusChip from "../../../../components/StatusChip";

function TableHeader() {
  return (
    <Grid container px={2} py={3}>
      <Grid item xs={2}>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          حالات العقد
        </Typography>

        <StatusChip color="primary" label={0} />
        <StatusChip color="warning" label={0} />
        <StatusChip color="success" label={0} />
        <StatusChip color="secondary" label={0} />
      </Grid>
      <Grid item xs={6} display={"flex"} flexDirection={"row"}>
        <TextField component={"form"} label="بحث" fullWidth size="small" />
        <Box>
          <Button variant="contained" type="submit" sx={{ ml: 5 }}>
            بحث
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4} display={"flex"} justifyContent={"end"}>
        <Box>
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
            حذف
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            startIcon={<CreditScoreIcon />}
          >
            تعديل
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default TableHeader;
