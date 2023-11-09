import "./App.scss";
import { theme } from "./theme/MUI_Theme";
import { ThemeProvider } from "@mui/material";
import MainLayout from "./layout/main-layout/MainLayout";
import RoutesComponent from "./Routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <RoutesComponent />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
