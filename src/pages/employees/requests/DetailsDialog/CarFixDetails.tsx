import { Button, Grid } from "@mui/material";
import DataInputLike from "../../../../components/DataInputLike";
import { formatDate } from "../../../../methods";
import { RequestDetails } from "../../../../types/RequestDetails";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ImageIcon from "@mui/icons-material/Image";
import FilePreview from "../../../../components/FilePreview";

function CarFixDetails({ details }: PropsType) {
  if (
    details.requestable?.builder &&
    Array.isArray(details.requestable?.builder)
  ) {
    const splittedFileName =
      details.requestable.builder[0]?.media[0]?.file_name.split(".");

    const fileExtension = splittedFileName[splittedFileName.length - 1];
    return (
      <>
        <DataInputLike
          cols={12}
          title="نوع السيارة"
          value={details.requestable?.car_type}
        />
        <DataInputLike
          cols={12}
          title="وصف العطل"
          value={details?.requestable?.builder[0]?.description}
        />
        {/* <Box px={2} py={1}>
          <Typography gutterBottom fontWeight={700}>
            صورة العطل
          </Typography>
          <Button
            variant="contained"
            startIcon={<ImageIcon />}
            component="a"
            target="_blank"
            href={details.requestable.builder[0]?.media[0]?.original_url}
          >
            صورة العطل
          </Button>
        </Box> */}
        <Grid xs={12} item px={2} py={1}>
          <Typography gutterBottom fontWeight={700}>
            صورة العطل
          </Typography>
          <FilePreview
            fileLink={details.requestable.builder[0]?.media[0]?.original_url}
            fileName={details.requestable.builder[0]?.media[0]?.file_name}
            fileExtension={fileExtension}
          />
        </Grid>
      </>
    );
  } else {
    return <></>;
  }
}

type PropsType = {
  details: RequestDetails;
};

export default CarFixDetails;
