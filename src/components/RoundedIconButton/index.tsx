import { Fab, FabProps } from "@mui/material";

function RoundedIconButton(props: FabProps) {
  return (
    <Fab
      size={"small"}
      {...props}
      sx={{ borderRadius: 0.5, zIndex: 0, ...props.sx }}
    />
  );
}

export default RoundedIconButton;
