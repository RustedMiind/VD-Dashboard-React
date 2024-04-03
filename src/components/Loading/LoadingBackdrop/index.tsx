import * as React from "react";
import Backdrop, { BackdropProps } from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

function LoadingBackdrop(props: BackdropProps) {
  return (
    <Backdrop {...props}>
      <CircularProgress
        variant="indeterminate"
        size={50}
        sx={{ color: "background.default" }}
      />
    </Backdrop>
  );
}

export default LoadingBackdrop;
