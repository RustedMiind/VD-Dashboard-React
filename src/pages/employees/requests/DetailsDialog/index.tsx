import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import { EmployeeRequest } from "../../../../types";
import { useEffect, useState } from "react";
import { RequestDetails } from "../../../../types/RequestDetails";
import axios from "axios";
import { Api } from "../../../../constants";
import { objectToArrayWithArName } from "../../../../methods/objToArrWithAr";
import DataInputLike from "../../../../components/DataInputLike";
import { formatDate } from "../../../../methods";
import VacationDetails from "./VacationDetails";
import WorkNeeds from "./WorkNeeds";
import MissionDetails from "./MissionDetails";

function DetailsDialog(props: PropsType) {
  const [details, setDetails] = useState<RequestDetails | undefined>(undefined);

  useEffect(() => {
    if (props.open && props.requestId > 0) {
      setDetails(undefined);
      axios
        .get<{ request: RequestDetails }>(
          Api(`employee/general-requests/requests/${props.requestId}`)
        )
        .then(({ data }) => {
          console.log("Details Log :", data);
          setDetails(data.request);
        });
    }
  }, [props.open]);

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
      <DialogTitle>نوع الطلب</DialogTitle>
      <DialogContent>
        <Grid container>
          {details && (
            <>
              <DataInputLike
                title="اسم الموظف"
                value={details?.employee?.name}
              />
              <DataInputLike
                title="تاريخ الورود"
                value={formatDate(details?.created_at)}
              />
              <DataInputLike
                title="نوع الطلب"
                value={details?.requestable?.typeInArabic}
              />
              {((): React.ReactElement | "" | undefined => {
                return (
                  <>
                    <VacationDetails details={details} />
                    <WorkNeeds details={details} />
                    <MissionDetails details={details} />
                  </>
                );
              })()}
            </>
          )}
        </Grid>
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
