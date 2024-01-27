import { useContext, useEffect, useState } from "react";
import { PermissionsContext } from "./context";
import axios from "axios";
import { Api } from "../constants";
import { Permission } from "../constants/Permission";
import { useSnackbar } from "notistack";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

function PermissionsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [status, setStatus] = useState<"loading" | "done" | "error">("done");
  function hasPermission(permission: Permission): boolean {
    return permissions.includes(permission);
  }
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setStatus("loading");
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
  }, []);

  return (
    <PermissionsContext.Provider value={{ permissions, hasPermission }}>
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
