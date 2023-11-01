import "./App.scss";
import Typography from "@mui/material/Typography";
import { theme } from "./theme/MUI_Theme";
import { ThemeProvider } from "@mui/material";
import MainLayout from "./layout/main-layout/MainLayout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout></MainLayout>
    </ThemeProvider>
  );
}

export default App;
