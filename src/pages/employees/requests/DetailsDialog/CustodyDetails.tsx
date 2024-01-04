import { Grid } from "@mui/material";
import DataInputLike from "../../../../components/DataInputLike";
import { RequestDetails } from "../../../../types/RequestDetails";
import Typography from "@mui/material/Typography";
import FilePreview from "../../../../components/FilePreview";

function CustodyDetails({ details }: PropsType) {
  const splittedFileName =
    details.requestable?.media &&
    details.requestable.media[0]?.file_name.split(".");

  const fileExtension =
    splittedFileName && splittedFileName[splittedFileName.length - 1];

  return (
    <>
      <DataInputLike
        title="العهدة السابقة"
        value={details.requestable?.last_custody}
      />
      <DataInputLike
        cols={12}
        title="متبقي العهدة السابقة"
        value={details.requestable?.remaining_lastCustody}
      />
      <DataInputLike
        cols={12}
        title="وصف العهدة"
        value={details.requestable?.description}
        multiLine
      />
      <Grid xs={12} item px={2} py={1}>
        <Typography gutterBottom fontWeight={700}>
          ارفاق تصفية العهدة السابقة
        </Typography>
        {details.requestable?.media &&
        Array.isArray(details.requestable.media) ? (
          <FilePreview
            fileLink={details.requestable.media[0]?.original_url}
            fileName={details.requestable.media[0]?.file_name}
            fileExtension={fileExtension}
          />
        ) : (
          <FilePreview
            fileLink={""}
            fileName={"لا يوجد صورة"}
            fileExtension={fileExtension}
          />
        )}
      </Grid>
    </>
  );
}

type PropsType = {
  details: RequestDetails;
};

export default CustodyDetails;
