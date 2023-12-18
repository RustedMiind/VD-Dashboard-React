import { Typography, TypographyProps } from "@mui/material";

export function ErrorTypography(props: TypographyProps) {
  return (
    <Typography variant="body2" color="error" {...props}>
      {props.children}
    </Typography>
  );
}