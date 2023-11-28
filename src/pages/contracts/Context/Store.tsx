import { useState } from "react";
import { createContext } from "react";
import { IdListType } from "../../clients/data/Table";

type childrenProps = {
  children: React.ReactNode;
};

export const ContractContext = createContext<IndexValue | null>(null);

export function IndexContextProvider({ children }: childrenProps) {
  let [index, setIndex] = useState<number[] | undefined>(undefined);
  return (
    <ContractContext.Provider value={{ index, setIndex }}>
      {children}
    </ContractContext.Provider>
  );
}
type IndexValue = {
  index: number[] | undefined;
  setIndex: React.Dispatch<React.SetStateAction<number[] | undefined>>;
};
