import { IconButton, Paper, Stack, Typography } from "@mui/material";
import { TransactionType } from "../../../../../../../../../../../../types/Contracts/ContractTransactionAttachment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { SetProccessingContext } from "../context/SetProccessingContext";
import { useContext } from "react";

export default function ProccessingItemsRow(props: PropsType) {
  const SetProccessingContextData = useContext(SetProccessingContext);
  // * prepare last comment
  let lastComment = "--";
  if (props.item?.comments && props.item?.comments.length > 0) {
    let n = props.item?.comments?.length;
    lastComment = props.item?.comments[n - 1].comment;
  }

  // * Handle Show transactions attachments
  const showAttachments = (id: number) => {
    SetProccessingContextData.setTransactionId(id);
    SetProccessingContextData.setShowAttachments(true);
  };
  // * Declare and Define Helpers variables and functions
  type RowItemCompProps = {
    label: string;
    value: JSX.Element | string;
  };
  const RowItemComp = (rowProps: RowItemCompProps) => {
    return (
      <Stack spacing={1} marginY={1}>
        <Typography variant="body2">{rowProps.label}</Typography>
        <Typography variant="body2" fontSize={"17px"} fontWeight={600}>
          {rowProps.value ?? "--"}
        </Typography>
      </Stack>
    );
  };

  //return ui of main component
  return (
    <Paper
      component={"div"}
      elevation={4}
      sx={{
        borderRadius: "8px",
        minHeight: "80px",
        paddingX: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <RowItemComp label="رقم المعاملة" value={"" + props.item.id} />
      <RowItemComp
        label="تاريخ الارسال"
        value={new Date(props.item.created_at).toLocaleDateString()}
      />
      <RowItemComp
        label="عدد الردود"
        value={
          props.item?.comments_count ? "" + props.item?.comments_count : "0"
        }
      />
      <RowItemComp
        label="اسم الراسل"
        value={
          props.item?.system_logs && props.item?.system_logs?.length > 0
            ? props.item?.system_logs[0]?.name
            : "--"
        }
      />
      <RowItemComp label="اخر رد" value={lastComment} />
      <RowItemComp label="الاجراء" value={"--"} />
      <RowItemComp
        label="المرفقات"
        value={
          <>
            <IconButton
              onClick={() => showAttachments(props.item.id)}
              color="primary"
              size="small"
            >
              <RemoveRedEyeIcon />
            </IconButton>
            <IconButton
              onClick={() => showAttachments(props.item.id)}
              color="primary"
              size="small"
            >
              <CloudDownloadIcon color="secondary" />
            </IconButton>
          </>
        }
      />
      <RowItemComp
        label="اخر تحديث"
        value={new Date(props.item.updated_at).toLocaleDateString()}
      />
    </Paper>
  );
}

type PropsType = {
  item: TransactionType;
};
