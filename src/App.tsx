import "./App.scss";
import { theme } from "./theme/MUI_Theme";
import { ThemeProvider } from "@mui/material";
import MainLayout from "./layout/main-layout/MainLayout";
import RoutesComponent from "./Routes";
import axios from "axios";
import { Api } from "./constants";
import { useEffect } from "react";

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
