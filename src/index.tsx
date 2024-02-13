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
import { DevUserType } from "./DevUserType";
import { DevUser } from "./DevUser";

console.table({
  Version: "1.3.0",
  Comment: "Rebased the logic for contracts and clients",
});

const devUser: DevUserType = DevUser;
/* 
Add File DevUser.tsx in /src

Copy & Paste the following code and replace username and password with yours;

<-------File Content-------->

import { DevUserType } from "./DevUserType";

export const DevUser: DevUserType = {
  email: "",
  password: "",
};


<-------End File Content-------->

*/

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

// Mount the application in mode Development or Production
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
    axios.defaults.headers.common.Authorization = `Bearer ${db_token}`;
    axios
      .post(Api("employee/user"))
      .then((res) => {
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
        resetAuth();
      });
  } else {
    resetAuth();
  }
}

function RunDev() {
  axios
    .post<{ data: { token: string; user: unknown } }>(Api("employee/login"), {
      email: devUser.email,
      password: devUser.password,
      imei: "5153153",
      device_token: "scqwsvcqewcqw",
      device_type: "android",
    })
    .then(({ data }) => {
      root.render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <CacheProvider value={cacheRtl}>
              <App />
            </CacheProvider>
          </BrowserRouter>
        </LocalizationProvider>
      );
      console.log("User Token", data.data.token);
      axios.defaults.headers.common.Authorization = `Bearer ${data.data.token}`;
      setCookie("db_token", data.data.token, 7);
    });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
