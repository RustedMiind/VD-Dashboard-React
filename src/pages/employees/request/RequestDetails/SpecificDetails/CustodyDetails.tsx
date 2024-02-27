import { Grid, MenuItem, MenuList } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DataItem } from "..";
import { RequestDetails } from "../../../../../types/RequestDetails";

function CustodyDetails({ details }: PropsType) {
  const splittedFileName =
    details.requestable?.media &&
    details.requestable.media[0]?.file_name.split(".");

  const fileExtension =
    splittedFileName && splittedFileName[splittedFileName.length - 1];

  return (
    <>
      <DataItem
        label="الشخص المكلف"
        value={
          details.steps_of_approval &&
          details.steps_of_approval[0]?.employee?.name
        }
      />
      <DataItem
        label="العهدة السابقة"
        value={details.requestable?.last_custody}
      />
      <DataItem
        label="متبقي العهدة السابقة"
        value={details.requestable?.remaining_lastCustody}
      />
      <DataItem label="وصف العهدة" value={details.requestable?.description} />
      <DataItem
        label="ارفاق تصفية العهدة السابقة"
        value={
          <MenuList>
            {details.requestable?.media?.map((media) => (
              <MenuItem component="a" href={media.original_url}>
                {media.file_name}
              </MenuItem>
            ))}
          </MenuList>
        }
      />
    </>
  );
}

type PropsType = {
  details: RequestDetails;
};

export default CustodyDetails;
