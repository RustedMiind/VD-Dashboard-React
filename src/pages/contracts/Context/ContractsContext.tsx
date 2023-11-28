import { useEffect, useState } from "react";
import { createContext } from "react";
import { Contract } from "../../../types";
import axios from "axios";
import { Api } from "../../../constants";

type childrenProps = {
  children: React.ReactNode;
};

export const ContractsContext = createContext<ContractContextType>({
  contracts: null,
  setContracts: null,
});

export function ContractsContextProvider({ children }: childrenProps) {
  let [contracts, setContracts] = useState<Contract[] | null>(null);
  useEffect(getAllContracts, []);
  console.log(contracts, "context");
  function getAllContracts() {
    axios
      .get<{ data: Contract[] }>(Api("employee/contract"))
      .then((res) => {
        setContracts(res.data.data);
      })
      .catch((err) => {
        setContracts(null);
      });
  }

  return (
    <ContractsContext.Provider
      value={{ contracts, setContracts: getAllContracts }}
    >
      {children}
    </ContractsContext.Provider>
  );
}
type ContractContextType = {
  contracts: Contract[] | null;
  setContracts: (() => void) | null;
};
