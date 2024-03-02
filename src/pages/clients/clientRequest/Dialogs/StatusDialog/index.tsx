import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Dialog, DialogContent, DialogTitle, Paper } from "@mui/material";
import axios from "axios";
import { PanelData, StepStatusData } from "../../types";
import { Api } from "../../../../../constants";
import StatusTable from "./StatusTable";

const StatusDialog = ({ open, onClose, id }: PropsType) => {
  const [details, setDetails] = useState<PanelData>();
  const [date, setDate] = useState("");

  useEffect(() => {
    if (open && id) {
      axios
        .get<{ data: PanelData }>(
          Api(`employee/client/order/statusOrder/${id}`)
        )
        .then(({ data }) => {
          setDetails(data.data || []);
          // setDate(formatDate(data.data[0].created_date) || "");
        });
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>حالة الطلب</DialogTitle>
      <DialogContent>
        <Paper elevation={3} sx={{ bgcolor: "Background" }}>
          {typeof details === "object" && <StatusTable details={details} />}
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

type PropsType = {
  id: number | undefined;
  open: boolean;
  onClose: () => void;
  setRequests?: Dispatch<
    SetStateAction<
      StepStatusData[] | PanelData[] | "loading" | "none" | "error"
    >
  >;
};

export default StatusDialog;
