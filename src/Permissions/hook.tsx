import { useContext } from "react";
import { PermissionsContext } from "./context";

function usePermissions() {
  const permissions = useContext(PermissionsContext);

  return {
    hasPermission: permissions.hasPermission,
    permissions: permissions.permissions,
  };
}

export default usePermissions;
