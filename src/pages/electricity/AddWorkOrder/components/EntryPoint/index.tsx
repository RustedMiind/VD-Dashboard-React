import { Grid, Stack, Typography } from "@mui/material";
import WorkOrderFormsIndex from "../forms";

export default function AddWorkOrderEntryPoint() {
  return (
    <Stack spacing={2}>
      <Typography variant="h6" fontSize={"1rem"} fontWeight={600}>
        اضافة أمر العمل
      </Typography>
      <Grid container>
        <Grid item xs={8} px={2}>
          <WorkOrderFormsIndex />
        </Grid>
        <Grid item xs={4}>
          Map...
        </Grid>
      </Grid>
    </Stack>
  );
}
