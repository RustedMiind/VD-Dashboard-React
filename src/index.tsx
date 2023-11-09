import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { Api } from "./constants";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Delete After presentation
const session =
  "eyJpdiI6IkdyMnRvWTZvQ29XbEcyR2g1dnJrcnc9PSIsInZhbHVlIjoiWG5EdEZQNGxIaUI4Y0tvVS9KSWV5QnhGSm4waWZKSUVrK25MeW8zR05xL0I1ZHFsaTZ4Z05pbThLY1FCVFF3cmRiRFJYUVFVMExNUjNqVFRieERiSmNEelJRWjVvYk5aeUtBTjV6cWYzWis2YWxLUjh4L3VFOFBQZlJ4T1FaWWwiLCJtYWMiOiJhYTExMjk0YmE0ODFjYTAyNGEzYjViYmRmNGY1YzJmN2M3ZTlmNzM0MDc3Y2Y2MTYwYzRjMDBiZmYyZDc1NGRiIiwidGFnIjoiIn0%3D";
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
    document.cookie = `vision_session=${session}; expires=2024-11-08T15:10:31.339Z; path=pathName;`;
    root.render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <CacheProvider value={cacheRtl}>
            <App />
          </CacheProvider>
        </BrowserRouter>
      </LocalizationProvider>
    );
  })
  .catch(console.log);
// End Delete

// root.render(
//   <LocalizationProvider dateAdapter={AdapterDayjs}>
//     <BrowserRouter>
//       <CacheProvider value={cacheRtl}>
//         <App />
//       </CacheProvider>
//     </BrowserRouter>
//   </LocalizationProvider>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
