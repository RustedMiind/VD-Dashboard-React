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
  <Grid item lg={12 / 8} md={3} xs={6} {...props} />
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
  return (
    <Paper sx={{ width: 1, p: 2 }} elevation={1}>
      <Grid container>
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
        <DetailsItem label="اخر تخديث">
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
