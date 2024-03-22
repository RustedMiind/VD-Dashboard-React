import { MenuList, MenuItem } from "@mui/material";
import { DataItem } from "..";
import { RequestDetails } from "../../../../../types/RequestDetails";

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
        <DataItem label="رقم اللوحة" value={details.requestable?.number_car} />
        <DataItem
          label="الشخص المكلف"
          value={
            details.steps_of_approval &&
            details.steps_of_approval[0]?.employee?.name
          }
        />
        <DataItem label="نوع السيارة" value={details.requestable?.car_type} />
        <DataItem
          label="وصف العطل"
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
        <DataItem
          label="صورة العطل"
          value={
            <MenuList>
              {details.requestable.builder[0]?.media?.map((media) => (
                <MenuItem component="a" href={media.original_url}>
                  {media.file_name}
                </MenuItem>
              ))}
            </MenuList>
          }
        />
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
