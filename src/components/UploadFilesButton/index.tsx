import * as React from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const InputFileUpload = React.forwardRef<HTMLInputElement, PropsType>(
  ({ buttonProps, ...props }: PropsType, ref) => {
    return (
      <Button
        component="label"
        role={undefined}
        variant="contained"
        startIcon={<FileUploadIcon />}
        {...buttonProps}
      >
        ارفاق ملف
        <VisuallyHiddenInput ref={ref} type="file" multiple {...props} />
      </Button>
    );
  }
);
type PropsType = React.InputHTMLAttributes<HTMLInputElement> & {
  buttonProps?: ButtonProps;
};

export default InputFileUpload;
export type InputFileUploadProps = PropsType;
