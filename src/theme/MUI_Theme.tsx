import { colors, createTheme } from "@mui/material";
import "../assets/fonts/include.scss";
import "./Mui_Custom.scss";

export const theme = createTheme({
  direction: "rtl",
  shape: {
    borderRadius: 10,
  },
  palette: {
    primary: {
      main: "#004693",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#18CB5F",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#CB1818",
    },
    // secondary: {
    //   main: "#004693",
    // },
    background: {
      paper: "#F3F5F7",
      default: "#FFFFFF",
      med: "#D2DCEA",
    },
    text: {
      primary: "#004693",
      secondary: colors.grey[600],
      disabled: colors.grey[600],
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "TheSans",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
    },
  },
  typography: {
    fontFamily: [
      "TheSans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
