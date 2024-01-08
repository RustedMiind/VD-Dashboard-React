import { Chip, ChipProps } from "@mui/material";

function NonRoundedChip(chipProps: ChipProps) {
  return (
    <Chip
      {...chipProps}
      sx={{
        borderRadius: 1,
        ...chipProps.sx,
      }}
    />
  );
}

export default NonRoundedChip;
