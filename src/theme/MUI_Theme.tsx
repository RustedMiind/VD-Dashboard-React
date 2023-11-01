import { colors, createTheme } from "@mui/material";

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
    // secondary: {
    //   main: "#004693",
    // },
    background: {
      paper: "#F3F5F7",
      default: "#FFFFFF",
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
