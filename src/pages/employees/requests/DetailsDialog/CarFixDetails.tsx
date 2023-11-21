import { Button } from "@mui/material";
import DataInputLike from "../../../../components/DataInputLike";
import { formatDate } from "../../../../methods";
import { RequestDetails } from "../../../../types/RequestDetails";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ImageIcon from "@mui/icons-material/Image";

function CarFixDetails({ details }: PropsType) {
  if (
    details.requestable?.builder &&
    Array.isArray(details.requestable?.builder)
  ) {
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
        <Box px={2} py={1}>
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
        </Box>
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
