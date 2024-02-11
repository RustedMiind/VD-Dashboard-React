import { useContext, useState } from "react";
import GradientBg from "../../../../../components/GradientBg";
import { Grid, GridProps, Stack, Typography } from "@mui/material";
import StatusChip from "../../../../../components/StatusChip";
import { SoilDataContext } from "../..";
import { TenderItemStatus } from "../../../../../types/Tenders/Status.enum";
import NonRoundedChip from "../../../../../components/NonRoundedChip";

const Label = (props: GridProps & { label: string }) => (
  <Grid item xs={5} {...props}>
    <Typography variant="body1">{props.label}</Typography>
  </Grid>
);

const Content = (props: GridProps) => <Grid item xs={7} {...props} />;
export const generateChip = (value: number | undefined): JSX.Element => {
  const variant = "outlined";
  let chip: JSX.Element = <></>;

  switch (value) {
    case 0:
      chip = <NonRoundedChip color="primary" variant={variant} label="جاري" />;
      break;
    case 19:
      chip = <NonRoundedChip color="error" variant={variant} label="مرفوض" />;
      break;
    case 18:
      chip = <NonRoundedChip color="success" variant={variant} label="مقبول" />;
      break;
    case 33:
      chip = <NonRoundedChip color="success" variant={variant} label="معتمد" />;
      break;
    default:
      chip = (
        <NonRoundedChip color="primary" variant={variant} label="لم يبداء" />
      );
  }

  return chip;
};
export default function Items() {
  const { items } = useContext(SoilDataContext);

  if (Array.isArray(items)) {
    return (
      <GradientBg reverseBg>
        <Stack>
          <Grid container rowGap={2} alignItems={"center"}>
            <Label label="البنود" />
            <Label xs={7} label="الحاله" />
            <Label label="الزيارة" />
            {items.map(
              (item) =>
                item?.form_id === 4 &&
                item?.order_steps_form && (
                  <Content>
                    {generateChip(item?.order_steps_form?.status)}
                  </Content>
                )
            )}
            <Label label="الاختبار" />
            {items.map(
              (item) =>
                item?.form_id === 5 &&
                item?.order_steps_form && (
                  <Content>
                    {generateChip(item?.order_steps_form?.status)}
                  </Content>
                )
            )}
            <Label label="التقرير" />
            {items.map(
              (item) =>
                item?.form_id === 6 &&
                item?.order_steps_form && (
                  <Content>
                    {generateChip(item?.order_steps_form?.status)}
                  </Content>
                )
            )}
          </Grid>
        </Stack>
      </GradientBg>
    );
  } else {
    return <></>;
  }
}
