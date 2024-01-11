import { Stack } from "@mui/material";
import React from "react";
export default function ReverseBgCard({ children, reverseBg }: PropsType) {
  return (
    <Stack sx={{ bgcolor: reverseBg ? "red" : "blue", height: 400 }}>
      {children}
    </Stack>
  );
}

type PropsType = {
  children: React.ReactNode;
  reverseBg?: boolean;
};
