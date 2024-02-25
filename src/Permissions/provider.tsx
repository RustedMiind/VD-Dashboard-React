import { useContext, useEffect, useState } from "react";
import { PermissionsContext } from "./context";
import axios from "axios";
import { Api } from "../constants";
import { Permission } from "../constants/Permission";
import { useSnackbar } from "notistack";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { AccountStatus, useUser } from "../contexts/user/user";

function PermissionsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [status, setStatus] = useState<"loading" | "done" | "error">("done");
  function hasPermission(permission: Permission): boolean {
    return permissions.includes(permission);
  }
  function hasPermissions(toCheck: Permission[]): boolean {
    let hasPermissionTo = toCheck.filter((toCheck) =>
      permissions.includes(toCheck)
    );
    return hasPermissionTo.length === toCheck.length;
  }
  function hasAnyOfPermissions(toCheck: Permission[]): boolean {
    let hasPermission = false;
    for (let i = 0; i < toCheck.length; i++) {
      if (permissions.includes(toCheck[i])) {
        hasPermission = true;
        break;
      }
    }
    return hasPermission;
  }
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setStatus("loading");

    if (user.status === AccountStatus.IS_USER)
      axios
        .get<{ permissions?: Permission[] }>(Api("employee/get-permissions"))
        .then(({ data }) => {
          setPermissions(data.permissions || []);
          setStatus("done");
        })
        .catch(() => {
          enqueueSnackbar("فشل في تحميل صلاحيات العميل", { variant: "error" });
          setStatus("error");
        });
  }, [user.status]);

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        hasPermission,
        hasPermissions,
        hasAnyOfPermissions,
      }}
    >
      {children}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={status === "loading"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </PermissionsContext.Provider>
  );
}

export default PermissionsContextProvider;
