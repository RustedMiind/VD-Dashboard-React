import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { RequestDetails } from "../../../../types/RequestDetails";
import axios from "axios";
import { Api } from "../../../../constants";
import DataInputLike from "../../../../components/DataInputLike";
import { formatDate } from "../../../../methods";
import VacationDetails from "./VacationDetails";
import WorkNeeds from "./WorkNeeds";
import MissionDetails from "./MissionDetails";
import CarFixDetails from "./CarFixDetails";
import CustodyDetails from "./CustodyDetails";
import AdvanceDetails from "./AdvanceDetails";

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
          setDetails(data.request);
        });
    }
  }, [props.open]);

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="sm" fullWidth>
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
                switch (details.type) {
                  case 1:
                    return <VacationDetails details={details} />;
                  case 2:
                    return <MissionDetails details={details} />;
                  case 3:
                    return <AdvanceDetails details={details} />;
                  case 4:
                    return <CustodyDetails details={details} />;
                  case 5:
                    return <WorkNeeds details={details} />;
                  case 6:
                    return <CarFixDetails details={details} />;
                  default:
                    return <></>;
                }
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
