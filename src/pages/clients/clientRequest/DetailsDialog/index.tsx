import { useEffect, useState } from "react";
import { StepData } from "../types";
import axios from "axios";
import { Api } from "../../../../constants";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import DataInputLike from "./DataInputLike";
import { formatDate } from "../../../../methods";

const DetailsDialog = ({ open, requestId, onClose }: PropsType) => {
  const [details, setDetails] = useState<StepData[] | undefined>(undefined);

  useEffect(() => {
    if (open && requestId) {
      setDetails(undefined);
      axios
        .get<{ data: StepData[] }>(
          Api(`employee/client/order/showOrder?client_id=${requestId}`)
        )
        .then(({ data }) => {
          setDetails(data.data);
        });
    }
  }, [open]);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>نوع الطلب</DialogTitle>
      <DialogContent>
        <Grid container>
          {details && (
            <>
              <DataInputLike title="اسم العميل" value={details[0]?.name} />
              <DataInputLike
                title="تاريخ الورود"
                value={formatDate(details[0]?.created_date)}
              />
              <DataInputLike title="رقم الطلب" value={details[0]?.id} />
              <DataInputLike
                title="نوع العميل"
                value={details[0]?.type === "individual" ? "فرد" : "شركة"}
              />
              <DataInputLike
                title="نوع الطلب"
                cols={12}
                value={details[0]?.order_type_name}
              />
              <DataInputLike
                title="القسم"
                cols={12}
                value={details[0]?.branch_name}
              />
              <DataInputLike
                title="الملاحظات"
                cols={12}
                value={details[0]?.note || "----"}
              />
            </>
          )}
        </Grid>
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
