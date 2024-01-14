import React from "react";
import GradientBg from "../../../../../components/GradientBg";
import { Grid, Stack, Typography } from "@mui/material";
import StatusChip from "../../../../../components/StatusChip";

export default function Items() {
  return (
    <GradientBg reverseBg>
      <Stack>
        <Grid container rowGap={2} alignItems={"center"}>
          <Grid item md={6}>
            <Typography variant="body1">البنود</Typography>
          </Grid>
          <Grid item md={6}>
            <Typography variant="body1">الحالة</Typography>
          </Grid>
          <Grid item md={6}>
            <Typography variant="body2">الفني</Typography>
          </Grid>
          <Grid item md={6}>
            <StatusChip label={"لم يبدأ"} sx={{ background: "background" }} />
          </Grid>
          <Grid item md={6}>
            <Typography variant="body2">المالي</Typography>
          </Grid>
          <Grid item md={6}>
            <StatusChip label={"لم يبدأ"} sx={{ background: "background" }} />
          </Grid>
          <Grid item md={6}>
            <Typography variant="body2">التقديم</Typography>
          </Grid>
          <Grid item md={6}>
            <StatusChip label={"لم يبدأ"} sx={{ background: "background" }} />
          </Grid>
        </Grid>
      </Stack>
    </GradientBg>
  );
}
