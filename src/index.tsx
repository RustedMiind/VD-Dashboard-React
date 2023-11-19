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
import { Api, Domain } from "./constants";
import { deleteCookie, getCookie, setCookie } from "./methods/cookies";

console.table({
  Version: "1.1.3",
  Comment: "Added Next Step to Employee Request Status Dialog",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
function resetAuth() {
  deleteCookie("db_token");
  deleteCookie("vision_session");
  deleteCookie("XSRF-TOKEN");
  window.location.replace(Domain("admin/login"));
}

MountApp("development");

function MountApp(type: "production" | "development") {
  switch (type) {
    case "development":
      RunDev();
      break;
    case "production":
      RunProd();
      break;
    default:
      RunProd();
      break;
  }
}

function RunProd() {
  const db_token = getCookie("db_token");
  if (db_token) {
    console.log(db_token);
    axios.defaults.headers.common.Authorization = `Bearer ${db_token}`;
    axios
      .post(Api("employee/user"))
      .then((res) => {
        console.log(res);
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
      .catch((err) => {
        console.log(err);
        resetAuth();
      });
  } else {
    resetAuth();
  }
}
function RunDev() {
  axios
    .post<{ data: { token: string; user: any } }>(Api("employee/login"), {
      email: "ali@gmail.com",
      password: "123",
      imei: "5153153",
      device_token: "scqwsvcqewcqw",
      device_type: "android",
    })
    .then(({ data }) => {
      console.log("User Data: ", data.data.user);
      console.log("User Token", data.data.token);
      axios.defaults.headers.common.Authorization = `Bearer ${data.data.token}`;
      setCookie("db_token", data.data.token, 7);
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
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
