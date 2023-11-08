import "./App.scss";
import { theme } from "./theme/MUI_Theme";
import { ThemeProvider } from "@mui/material";
import MainLayout from "./layout/main-layout/MainLayout";
import RoutesComponent from "./Routes";
import axios from "axios";
import { Api } from "./constants";
import { useEffect } from "react";

const session =
  "eyJpdiI6IkdyMnRvWTZvQ29XbEcyR2g1dnJrcnc9PSIsInZhbHVlIjoiWG5EdEZQNGxIaUI4Y0tvVS9KSWV5QnhGSm4waWZKSUVrK25MeW8zR05xL0I1ZHFsaTZ4Z05pbThLY1FCVFF3cmRiRFJYUVFVMExNUjNqVFRieERiSmNEelJRWjVvYk5aeUtBTjV6cWYzWis2YWxLUjh4L3VFOFBQZlJ4T1FaWWwiLCJtYWMiOiJhYTExMjk0YmE0ODFjYTAyNGEzYjViYmRmNGY1YzJmN2M3ZTlmNzM0MDc3Y2Y2MTYwYzRjMDBiZmYyZDc1NGRiIiwidGFnIjoiIn0%3D";
document.cookie = `vision_session=${session}; expires=2024-11-08T15:10:31.339Z; path=pathName;`;

function App() {
  // Delete After presentation
  useEffect(() => {
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
  }, []);
  // End Delete

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <RoutesComponent />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
