import {
  Grid,
  GridProps,
  Paper,
  Typography,
  TypographyProps,
} from "@mui/material";
import AddLabelToEl from "../../../../../../../../../../../../components/AddLabelToEl";
import { TransactionType } from "../../../../../../../../../../../../types/Contracts/ContractTransactionAttachment";

const GridItem = (props: GridProps) => (
  <Grid item xl={12 / 8} lg={3} md={6} xs={12} {...props} />
);

type DetailsItemProps = {
  label: string;
  children?: React.ReactNode;
  gridProps?: GridProps;
  typographyProps?: TypographyProps;
};
const DetailsItem = ({
  label,
  children,
  gridProps,
  typographyProps,
}: DetailsItemProps) => (
  <GridItem {...gridProps}>
    <AddLabelToEl label={label}>
      <Typography fontWeight={700} {...typographyProps}>
        {children}
      </Typography>
    </AddLabelToEl>
  </GridItem>
);

function ProcessingCard({ processing }: PropsType) {
  console.log(processing);

  return (
    <Paper sx={{ width: 1, p: 2, bgcolor: "background.default" }} elevation={2}>
      <Grid container spacing={1}>
        <DetailsItem label="رقم المعاملة">{processing.id}</DetailsItem>
        <DetailsItem label="عدد الردود">
          {processing.comments_count}
        </DetailsItem>
        <DetailsItem label="اسم الراسل">{processing.id}</DetailsItem>
        <DetailsItem label="اسم الراسل">
          {processing.system_logs?.[0]?.name}
        </DetailsItem>
        <DetailsItem label="اخر رد">
          {processing.comments?.[processing.comments.length - 1]?.comment}
        </DetailsItem>
        <DetailsItem label="الاجراء"></DetailsItem>

        <DetailsItem label="المرفقات">UNDER MENTAINANCE</DetailsItem>
        <DetailsItem
          label="اخر تحديث"
          typographyProps={{ color: "secondary.main" }}
        >
          {new Date(processing.updated_at).toLocaleDateString()}
        </DetailsItem>
      </Grid>
    </Paper>
  );
}
type PropsType = {
  processing: TransactionType;
};

export default ProcessingCard;
