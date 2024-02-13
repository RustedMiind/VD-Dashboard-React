import { useEffect, useState } from "react";
import { StepData } from "../types";
import axios from "axios";
import { Api } from "../../../../constants";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import DataInputLike from "./DataInputLike";
import { formatDate } from "../../../../methods";

const DetailsDialog = ({ open, requestId, onClose }: PropsType) => {
  const [details, setDetails] = useState<StepData>();

  useEffect(() => {
    axios
      .get<{ data: StepData }>(
        Api(`employee/client/order/show/order/${requestId}`)
      )
      .then((res) => {
        setDetails(res.data.data);
        console.log(details);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [open]);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>نوع الطلب</DialogTitle>
      <DialogContent>
        {typeof details === "object" && (
          <Grid container>
            <DataInputLike
              title="اسم العميل"
              value={details?.order?.client?.name}
            />
            <DataInputLike
              title="تاريخ الورود"
              value={formatDate(details?.created_at)}
            />
            <DataInputLike title="رقم الطلب" value={details?.order_id} />
            <DataInputLike
              title="نوع العميل"
              value={
                details?.order?.client?.type === "individual" ? "فرد" : "شركة"
              }
            />
            <DataInputLike
              title="نوع الطلب"
              cols={12}
              value={details?.order?.order_type?.name}
            />
            <DataInputLike
              title="القسم"
              cols={12}
              value={details?.department?.name}
            />
            <DataInputLike
              title="الملاحظات"
              cols={12}
              value={details?.note || "----"}
            />
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

type PropsType = {
  open: boolean;
  requestId: number | undefined;
  onClose: () => void;
};

export default DetailsDialog;
