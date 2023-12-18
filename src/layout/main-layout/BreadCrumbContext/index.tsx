import { createContext } from "react";

export const BreadCrumbContext = createContext<ContextType>({
  links: [],
});

type ContextType = {
  links: BreadCrumbLinkType[];
  updateAll?: (links: BreadCrumbLinkType[]) => void;
  updateLast?: (link: BreadCrumbLinkType) => void;
  addLast?: (...link: BreadCrumbLinkType[]) => void;
};

export type BreadCrumbLinkType = {
  title: string;
  path: string;
};
