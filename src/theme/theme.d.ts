/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
