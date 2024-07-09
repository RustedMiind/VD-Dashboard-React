import { Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

export default function SearchDate(props: PropsType) {
  // TODO::declare and define component state and variables
  let { value, setValue } = props;

  // TODO::declare and define component helper methods
  
  // * return component UI.
  return (
    <Stack direction="row" alignItems={"center"} gap={2} mb={2}>
      <Typography variant="body1">التاريخ</Typography>
      <DatePicker
        slotProps={{
          textField: { size: "small" },
        }}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </Stack>
  );
}

type PropsType = {
  value: Dayjs | null;
  setValue: React.Dispatch<React.SetStateAction<Dayjs | null>>;
};
