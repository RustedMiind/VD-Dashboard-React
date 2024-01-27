import { useContext, useState } from "react";
import { PermissionsContext } from "./context";

function PermissionsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  function hasPermission(permission: Permission): boolean {
    return permissions.includes(permission);
  }

  return (
    <PermissionsContext.Provider value={{ permissions, hasPermission }}>
      {children}
    </PermissionsContext.Provider>
  );
}

export default PermissionsContextProvider;
