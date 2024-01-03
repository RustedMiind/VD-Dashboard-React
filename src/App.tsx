import "./App.scss";
import { theme } from "./theme/MUI_Theme";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material";
import MainLayout from "./layout/main-layout/MainLayout";
import RoutesComponent from "./Routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <SnackbarProvider
          transitionDuration={{ appear: 500, exit: 500, enter: 300 }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          autoHideDuration={10000}
        >
          <RoutesComponent />
        </SnackbarProvider>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
