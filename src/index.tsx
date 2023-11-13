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
import { getCookie, setCookie } from "./methods/cookies";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

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
      window.location.replace(Domain());
    });
} else {
  setCookie(db_token, "", 0.00001);
  window.location.replace(Domain());
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
