import {
  Grid,
  GridProps,
  IconButton,
  Paper,
  Typography,
  TypographyProps,
} from "@mui/material";
import AddLabelToEl from "../../../../../../../../../../../../components/AddLabelToEl";
import { TransactionType } from "../../../../../../../../../../../../types/Contracts/ContractTransactionAttachment";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { useContext } from "react";
import { OpenCreateProcessingContext } from "../../../../../../CreateNewProcessingDialog/CreateProcessingContextProvider";
import { CreateProcessingReplyContext } from "../../../../../../ReplyExistingProcessing/CreateProcessingReplyContext";
import { ContractItemContext } from "../../../../../ItemContext";

const GridItem = (props: GridProps) => (
  <Grid item xl={12 / 9} lg={3} md={6} xs={12} {...props} />
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
  const { fetchItemDetails } = useContext(ContractItemContext);
  const { openUpdateDialog } = useContext(OpenCreateProcessingContext);
  const { openCreateDialog, OnSubmitSucess } = useContext(
    CreateProcessingReplyContext
  );
  return (
    <Paper sx={{ width: 1, p: 2, bgcolor: "background.default" }} elevation={2}>
      <Grid container spacing={1}>
        <DetailsItem label="رقم المعاملة">{processing.id}</DetailsItem>
        <DetailsItem label="تاريخ الارسال">
          {new Date(processing.created_at).toLocaleDateString()}
        </DetailsItem>
        <DetailsItem label="عدد الردود">
          {processing.comments_count || "0"}
        </DetailsItem>
        <DetailsItem gridProps={{ xl: 24 / 9 }} label="اسم الراسل">
          {processing.system_logs?.[0]?.name || "-"}
        </DetailsItem>
        <DetailsItem label="اخر رد">
          {processing.comments?.[processing.comments.length - 1]?.comment ||
            "-"}
        </DetailsItem>
        <DetailsItem label="الاجراء"></DetailsItem>

        <DetailsItem label="المرفقات">
          <IconButton
            onClick={() => {
              openUpdateDialog({ processingId: processing.id, step: 2 });
            }}
          >
            <FileDownloadIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              openCreateDialog(processing.id);
              OnSubmitSucess(() => {
                fetchItemDetails?.({ optimized: false, soft: true });
              });
            }}
          >
            <InsertCommentIcon />
          </IconButton>
        </DetailsItem>
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
