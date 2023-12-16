import { Chip, ChipProps } from "@mui/material";

function StatusChip(props: ChipProps) {
  return (
    <Chip
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
