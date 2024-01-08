import { Chip, ChipProps } from "@mui/material";
import NonRoundedChip from "../NonRoundedChip";

function StatusChip(props: ChipProps) {
  return (
    <NonRoundedChip
      variant="outlined"
      sx={{ bgcolor: `${props.color}.lightest` }}
      {...props}
    />
  );
}

export type MuiMainColors =
  | "success"
  | "error"
  | "warning"
  | "primary"
  | "secondary";

export default StatusChip;
