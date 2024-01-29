import { createContext } from "react";
import { Permission } from "../constants/Permission";

export const PermissionsContext = createContext<PermissionsContextType>({
  hasPermission() {
    return false;
  },
  hasPermissions() {
    return false;
  },
  hasAnyOfPermissions() {
    return false;
  },
  permissions: [],
});

type PermissionsContextType = {
  hasPermission: (permission: Permission) => boolean;
  hasPermissions: (permission: Permission[]) => boolean;
  hasAnyOfPermissions: (permission: Permission[]) => boolean;
  permissions: string[];
};
