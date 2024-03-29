import { useContext, useState } from "react";
import GradientBg from "../../../../../components/GradientBg";
import { Grid, GridProps, Stack, Typography } from "@mui/material";
import StatusChip from "../../../../../components/StatusChip";
import { TenderDataContext } from "../..";
import { TenderItemStatus } from "../../../../../types/Tenders/Status.enum";

const Label = (props: GridProps & { label: string }) => (
  <Grid item xs={4} {...props}>
    <Typography variant="body1">{props.label}</Typography>
  </Grid>
);

const Content = (props: GridProps) => <Grid item xs={8} {...props} />;
function generateStatusChip(status?: TenderItemStatus): JSX.Element {
  let chip = <StatusChip label="لم يبدأ" disabled color="default" />;
  if (typeof status === "number" || typeof status === "string")
    switch (status) {
      case TenderItemStatus.ONGOING:
        chip = <StatusChip label="جاري" color="success" />;
        break;

      case TenderItemStatus.ENDED:
        chip = <StatusChip label="منتهي" color="error" />;
        break;
    }

  return chip;
}
export default function Items() {
  const { tender } = useContext(TenderDataContext);

  if (typeof tender === "object") {
    return (
      <GradientBg reverseBg>
        <Stack>
          <Grid container rowGap={2} alignItems={"center"}>
            <Label label="البنود" />
            <Label xs={8} label="الحاله" />
            <Label label="الفني" />
            <Content>{generateStatusChip(tender.technical_status)}</Content>
            <Label label="المالي" />
            <Content>{generateStatusChip(tender.file_finacial_status)}</Content>
            <Label label="التقديم" />
            <Content>{generateStatusChip(tender.apply_status)}</Content>
          </Grid>
        </Stack>
      </GradientBg>
    );
  } else {
    return <></>;
  }
}
