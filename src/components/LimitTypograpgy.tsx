import { TypographyProps, TooltipProps, Typography } from "@mui/material";
import { Tooltip } from "@mui/material";

function LimitTypography({
  maxWidth,
  ToolTipProps,
  ...TypographyProps
}: PropsType) {
  return (
    <Tooltip
      arrow
      placement={"top"}
      {...ToolTipProps}
      title={
        <Typography variant="body1">{TypographyProps.children}</Typography>
      }
    >
      <Typography
        {...TypographyProps}
        variant="body2"
        sx={{
          width: "fit-content",
          maxWidth: maxWidth || 120,
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",

          ...TypographyProps.sx,
        }}
      />
    </Tooltip>
  );
}

export default LimitTypography;

type PropsType = TypographyProps & {
  maxWidth?: number;
  ToolTipProps?: TooltipProps;
};
