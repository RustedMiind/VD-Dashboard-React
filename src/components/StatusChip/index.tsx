import { Chip } from "@mui/material";

function StatusChip(props: PropsType) {
  return (
    <Chip
      variant="outlined"
      color={props.color}
      sx={{ bgcolor: `${props.color}.lightest` }}
      label={props.label}
    />
  );
}

type PropsType = {
  color: MuiMainColors;
  label: number | undefined | string;
};

export type MuiMainColors =
  | "success"
  | "error"
  | "warning"
  | "primary"
  | "secondary";

export default StatusChip;
