import { Stack } from "@mui/system";
import StatusChip, { MuiMainColors } from "../StatusChip";

function DoubleChips(props: PropsType) {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      alignItems="center"
      mx={props.space ? 1 : undefined}
    >
      <StatusChip color={props.color} label={props.label} />
      <StatusChip color={props.color} label={props.value} />
    </Stack>
  );
}

type PropsType = {
  label: string;
  value: string | number;
  color: MuiMainColors;
  space?: boolean;
};

export default DoubleChips;
