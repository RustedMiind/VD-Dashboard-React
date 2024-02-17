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

console.info("v1.6.0");

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

// Beta
MountApp();
function MountApp() {
  root.render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <CacheProvider value={cacheRtl}>
          <App />
        </CacheProvider>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
