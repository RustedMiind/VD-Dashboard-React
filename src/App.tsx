import "./App.scss";
import { theme } from "./theme/MUI_Theme";
import { ThemeProvider } from "@mui/material";
import MainLayout from "./layout/main-layout/MainLayout";
import RoutesComponent from "./Routes";
import axios from "axios";
import { Api } from "./constants";

// Delete After presentation
const cookieToken = document.cookie
  .split(";")
  .map((cookie) => cookie.trim())
  .find((cookie) => cookie.startsWith("token="));
const tokenCookie = cookieToken ? cookieToken.split("=")[1] : null;
axios.defaults.headers.common.Authorization = tokenCookie;
axios
  .post<{ data: { token: string } }>(Api("employee/login"), {
    email: "heleenali847@gmail.com",
    password: "123456789",
    imei: "5153153",
    device_token: "scqwsvcqewcqw",
    device_type: "android",
  })
  .then(({ data }) => {
    console.log("Token", data.data.token);
    axios.defaults.headers.common.Authorization = `Bearer ${data.data.token}`;
    document.cookie = `token=Bearer ${data.data.token}; expires=2024-11-08T15:10:31.339Z; path=pathName;`;
  })
  .catch(console.log);
// End Delete

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
