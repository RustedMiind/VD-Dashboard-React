import "./App.scss";
import "leaflet/dist/leaflet.css";
import { theme } from "./theme/MUI_Theme";
import { SnackbarProvider } from "notistack";
import { Grow, ThemeProvider } from "@mui/material";
import MainLayout from "./layout/main-layout/MainLayout";
import RoutesComponent from "./Routes";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import PermissionsContextProvider from "./Permissions/provider";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { UserContextProvider } from "./contexts/user/user";
import ContractItemsContextProvider from "./pages/contracts/SetContract/ContractItemsContext";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function App() {
  return (

    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <ThemeProvider theme={theme}>
      <ContractItemsContextProvider>
        <UserContextProvider>
          <SnackbarProvider
            transitionDuration={{ appear: 500, exit: 500, enter: 300 }}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            TransitionComponent={Grow}
            variant="success"
            autoHideDuration={10000}
          >
            <PermissionsContextProvider>
              <MainLayout>
                <RoutesComponent />
              </MainLayout>
            </PermissionsContextProvider>
          </SnackbarProvider>
        </UserContextProvider>
      </ContractItemsContextProvider>
      </ThemeProvider>
    </QueryParamProvider>
  );
}

export default App;
