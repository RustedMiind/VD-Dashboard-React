import { Stack } from "@mui/system";
import StatusChip, { MuiMainColors } from "../StatusChip";
import { ChipProps } from "@mui/material";

function DoubleChips(props: PropsType) {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      alignItems="center"
      mx={props.space ? 1 : undefined}
    >
      <StatusChip
        {...props.chipProps}
        color={props.color}
        label={props.label}
      />
      <StatusChip
        {...props.chipProps}
        color={props.color}
        label={props.value}
      />
    </Stack>
  );
}

type PropsType = {
  label: string;
  value?: number | string;
  color: MuiMainColors;
  space?: boolean;
  chipProps?: ChipProps;
};

export default DoubleChips;
