import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../../types/User/user";
import { deleteCookie, getCookie, setCookie } from "../../methods";
import { devMode } from "../../devMode";
import axios from "axios";
import { Api, Domain } from "../../constants";
import { DevUser } from "../../DevUser";

export enum AccountStatus {
  IS_USER = "is_user",
  UNKNOWN = "unknown",
  NOT_USER = "not_user",
  LOADING = "loading",
}

function login(): Promise<string | undefined> {
  console.log("Login Run");
  return new Promise((ressolve, reject) => {
    if (devMode) {
      const token = getCookie("db_token");
      if (token) ressolve(token);
      else {
        axios
          .post<{ data: { token: string; user: User } }>(
            Api("employee/login"),
            {
              email: DevUser.email,
              password: DevUser.password,
              imei: "5153153",
              device_token: "scqwsvcqewcqw",
              device_type: "android",
            }
          )
          .then(({ data }) => {
            ressolve(data.data.token);
            console.log("login success");
          })
          .catch(() => {
            console.log("login rejected");
          });
      }
    } else {
      console.log("ressolved undefined");
      ressolve(undefined);
    }
  });
}

function resetAuth(disableRedirect?: boolean) {
  deleteCookie("db_token");
  deleteCookie("vision_session");
  deleteCookie("XSRF-TOKEN");
  if (!disableRedirect) window.location.replace(Domain("admin/login"));
}

function setToken(token: string, override?: boolean) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  if (override) setCookie("db_token", token, 7);
}

const userContext = createContext<UserContext>({
  status: AccountStatus.UNKNOWN,
});

type UserContext = {
  user?: User;
  token?: string;
  status: AccountStatus;
};

export function useUser(): UserContext {
  const context = useContext(userContext);
  return context;
}

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accountStatus, setAccountStatus] = useState<AccountStatus>(
    AccountStatus.UNKNOWN
  );
  const [{ token, user }, setAccountData] = useState<AccountData>({});

  function getUserData(token?: string) {
    const tokenToUse = getCookie("db_token") || token;
    console.log("passedToken: ", token, "calculatedToken: ", tokenToUse);
    if (tokenToUse) {
      setToken(tokenToUse, true);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      axios
        .post<{ data: { token: string; user: User } }>(Api("employee/user"))
        .then(({ data }) => {
          setAccountStatus(AccountStatus.IS_USER);
          setAccountData({ token: data.data.token, user: data.data.user });
        })
        .catch(() => {
          resetAuth(true);
        });
    } else if (!devMode) {
      resetAuth(false);
    } else resetAuth(true);
  }

  useEffect(() => {
    login().then(getUserData);
  }, []);

  return (
    <userContext.Provider value={{ status: accountStatus, token, user }}>
      {accountStatus === AccountStatus.IS_USER ? children : <></>}
    </userContext.Provider>
  );
}

export type AccountData = { user?: User; token?: string };
