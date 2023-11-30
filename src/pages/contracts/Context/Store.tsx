import { useState } from "react";
import { createContext } from "react";

type childrenProps = {
  children: React.ReactNode;
};

export const ContractContext = createContext<IndexValue | null>(null);

export function IndexContextProvider({ children }: childrenProps) {
  let [selectedIds, setSelectedIds] = useState<number[]>([]);
  return (
    <ContractContext.Provider value={{ selectedIds, setSelectedIds }}>
      {children}
    </ContractContext.Provider>
  );
}
type IndexValue = {
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
};
