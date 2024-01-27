import { createContext } from "react";

export const PermissionsContext = createContext<PermissionsContextType>({
  hasPermission() {
    return false;
  },
  permissions: [],
});

type PermissionsContextType = {
  hasPermission: (permission: Permission) => boolean;
  permissions: string[];
};
