import { Stack } from "@mui/material";
import React from "react";
export default function GradientBg({ children, reverseBg }: PropsType) {
  return (
    <Stack
      sx={{
        background: reverseBg
          ? "linear-gradient(255.62deg, rgba(243, 245, 247, 0.3) 0%, rgba(0, 70, 147, 0.2) 99.49%)"
          : "linear-gradient(75.62deg, rgba(243, 245, 247, 0.3) 0%, rgba(0, 70, 147, 0.2) 99.49%)",

        borderRadius: 2,
        p: 2,
        height: 1,
      }}
    >
      {children}
    </Stack>
  );
}

type PropsType = {
  children: React.ReactNode;
  reverseBg?: boolean;
};
