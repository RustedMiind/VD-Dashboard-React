import { createContext } from "react";
import { Permission } from "../constants/Permission";

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
