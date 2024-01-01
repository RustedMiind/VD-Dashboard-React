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
      title={TypographyProps.children}
    >
      <Typography
        {...TypographyProps}
        sx={{
          width: "fit-content",
          maxWidth: maxWidth || 175,
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
