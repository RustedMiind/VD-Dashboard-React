import React from "react";
import GradientBg from "../../../../../components/GradientBg";
import { Grid, GridProps, Stack, Typography } from "@mui/material";
import StatusChip from "../../../../../components/StatusChip";
const Label = (props: GridProps & { label: string }) => (
  <Grid item xs={4} {...props}>
    <Typography variant="body1">{props.label}</Typography>
  </Grid>
);
const Content = (props: GridProps) => <Grid item xs={8} {...props} />;

export default function Items() {
  return (
    <GradientBg reverseBg>
      <Stack>
        <Grid container rowGap={2} alignItems={"center"}>
          <Label label="البنود" />
          <Label xs={8} label="الحاله" />
          <Label label="الفني" />
          <Content>
            <StatusChip label={"لم يبدأ"} sx={{ background: "background" }} />
          </Content>
          <Label label="المالي" />
          <Content>
            <StatusChip label={"لم يبدأ"} sx={{ background: "background" }} />
          </Content>
          <Label label="التقديم" />
          <Content>
            <StatusChip label={"لم يبدأ"} sx={{ background: "background" }} />
          </Content>
        </Grid>
      </Stack>
    </GradientBg>
  );
}
