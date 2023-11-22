import { Box, Stack } from "@mui/system";
import ChipBox from "./ChipBox";

export default function TopTable() {
  return (
    <Stack>
      <Box>
        <ChipBox
          color="#18CB5F"
          backGround="#D4EEDE"
          lable={"ساري"}
          number={10}
        />
        <ChipBox color="#F19B02" backGround="red" lable={"متأخر"} number={10} />
        <ChipBox color="error" backGround="red" lable={"متوقف"} number={10} />
        <ChipBox color="red" backGround="red" lable={"منتهي"} number={10} />
      </Box>
      <Box></Box>
    </Stack>
  );
}
