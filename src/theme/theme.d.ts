import {
  ThemeOptions,
  TypeBackground,
  PaletteColorOptions,
  SimplePaletteColorOptions,
} from "@mui/material";
import { TypeBackground } from "@mui/material";

export declare module "@mui/material" {
  interface TypeBackground {
    med: string;
  }

  interface PaletteColorOptions extends SimplePaletteColorOptions {
    lightest?: string;
  }
}
