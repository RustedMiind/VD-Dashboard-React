import { useContext, useMemo } from "react";
import { TenderDataContext } from "../../..";
import { Grid, GridProps, TypographyProps, Typography } from "@mui/material";
import AddLabelToEl from "../../../../../../components/AddLabelToEl";
import { getDateDiff } from "../../../../../../methods";

function GridItem(props: GridProps) {
  return <Grid item lg={6} xs={12} {...props} />;
}

function InfoItem(props: { label: string; value?: React.ReactNode }) {
  return (
    <GridItem>
      <AddLabelToEl
        labelTypographyProps={{ gutterBottom: false }}
        label={props.label}
      >
        <Typography fontWeight={700} variant="body1">
          {props.value}
        </Typography>
      </AddLabelToEl>
    </GridItem>
  );
}

function DetailsView(): JSX.Element {
  const { tender } = useContext(TenderDataContext);

  if (typeof tender === "object") {
    const warranties = tender?.tenderdata?.tender_warranties
      ?.filter((i) => !!i.warranties)
      .map((i) => i.warranties?.name)
      .join(" ,");
    const tenderDurationInDays =
      getDateDiff(
        new Date(tender.tenderdata?.strat_date || ""),
        new Date(tender.tenderdata?.end_date || "")
      ) /
      (1000 * 60 * 60 * 24);
    const durationToShow = `${tenderDurationInDays} يوم`;

    return (
      <Grid container rowSpacing={4} columnSpacing={2}>
        <InfoItem
          label="نوع الفرع"
          value={tender.tenderdata?.management?.branch?.name}
        />
        <InfoItem label="الادارة" value={tender.tenderdata?.management?.name} />
        <InfoItem
          label="الرقم المرجعي للمنافسة"
          value={tender.tenderdata?.code_reference}
        />
        <InfoItem label="رقم المنافسة" value={tender.tenderdata?.code_tender} />
        <InfoItem label="اسم المنافسة" value={tender.tenderdata?.name} />
        <InfoItem
          label="تاريخ التقديم المطلوب"
          value={tender.tenderdata?.strat_date}
        />
        <InfoItem
          label="الجهة الحكومية"
          value={tender.tenderdata?.organization?.name}
        />
        <InfoItem
          label="تاريخ انتهاء المنافسة"
          value={tender.tenderdata?.end_date}
        />
        <InfoItem label="القيمة المالية" value={tender.tenderdata?.price} />
        <InfoItem label="نوع المنافسة" value={"منافسة"} />
        <InfoItem
          label="القسم التابع له المنافسة"
          value={tender.tenderdata?.department?.name}
        />
        <InfoItem label="نشاط المنافسة" value={tender.tenderdata?.activity} />
        <InfoItem label="مدة العقد" value={durationToShow} />
        <InfoItem
          label="طريقة التقديم"
          value={tender.tenderdata?.apply?.name}
        />
        <InfoItem label="الضمان المطلوب" value={warranties} />
      </Grid>
    );
  } else return <></>;
}

export default DetailsView;
