import { ThemeOptions, TypeBackground } from "@mui/material";

declare module "@mui/material" {
  interface TypeBackground {
    med: React.CSSProperties["color"];
  }
}
