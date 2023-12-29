import { Stack, Typography, TypographyProps } from "@mui/material";
import RequiredSymbol from "../RequiredSymbol";

function AddLabelToEl(props: PropsType) {
  return (
    <Stack width={1}>
      <Typography
        component="label"
        gutterBottom
        {...props.labelTypographyProps}
      >
        {props.label} {props.required && <RequiredSymbol />}
      </Typography>
      {props.children}
    </Stack>
  );
}

export default AddLabelToEl;

type PropsType = {
  children?: React.ReactNode;
  label: string;
  required?: boolean;
  labelTypographyProps?: TypographyProps;
};
