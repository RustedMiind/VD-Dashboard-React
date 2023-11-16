import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Stack,
  Typography,
} from "@mui/material";
import { EmployeeRequest } from "../../../../types";
import { useEffect, useState } from "react";
import { RequestDetails } from "../../../../types/RequestDetails";
import axios from "axios";
import { Api } from "../../../../constants";
import { objectToArrayWithArName } from "../../../../methods/objToArrWithAr";

function DetailsDialog(props: PropsType) {
  const [details, setDetails] = useState<RequestDetails | undefined>(undefined);

  useEffect(() => {
    if (props.open)
      axios
        .get<{ request: RequestDetails }>(
          Api("employee/general-requests/requests/" + props.requestId)
        )
        .then(({ data }) => {
          setDetails(data.request);
        });
    else {
      setDetails(undefined);
    }
  }, [props.open]);

  const detailsWithAr = details ? objectToArrayWithArName(details) : [];

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
      <DialogTitle>نوع الطلب</DialogTitle>
      <DialogContent>
        <Stack py={1}>
          <Typography variant="body1" fontWeight={700}>
            اسم الموظف
          </Typography>
          <Typography variant="body2">{details?.employee?.name}</Typography>
        </Stack>
        {detailsWithAr.map(
          (item) =>
            (typeof item.value === "string" ||
              typeof item.value === "number") && (
              <Stack py={1}>
                <Typography variant="body1" fontWeight={700}>
                  {item.name}
                </Typography>
                <Typography variant="body2">{item.value}</Typography>
              </Stack>
            )
        )}
      </DialogContent>
    </Dialog>
  );
}

type PropsType = {
  open: boolean;
  requestId: number;
  onClose: () => void;
};

export default DetailsDialog;
