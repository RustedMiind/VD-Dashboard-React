import { useState } from "react";
import { createContext } from "react";
import { IdListType } from "../data/Table";

type childrenProps = {
  children: React.ReactNode;
};

export const TableContext = createContext<IndexValue | null>(null);

export function IndexContextProvider({ children }: childrenProps) {
  let [index, setIndex] = useState<IdListType | undefined>(undefined);
  return (
    <TableContext.Provider value={{ index, setIndex }}>
      {children}
    </TableContext.Provider>
  );
}
type IndexValue = {
  index: IdListType | undefined;
  setIndex: React.Dispatch<React.SetStateAction<IdListType | undefined>>;
};
