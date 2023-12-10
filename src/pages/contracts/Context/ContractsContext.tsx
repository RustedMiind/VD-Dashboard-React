import { useEffect, useState } from "react";
import { createContext } from "react";
import { Contract } from "../../../types";
import axios from "axios";
import { Api } from "../../../constants";

type childrenProps = {
  children: React.ReactNode;
};

export const ContractsContext = createContext<ContractContextType>({
  contracts: "none",
  setContracts: null,
});

export function ContractsContextProvider({ children }: childrenProps) {
  let [contracts, setContracts] = useState<ContextContracts>("none");

  useEffect(getAllContracts, []);

  function getAllContracts(params?: unknown) {
    setContracts("loading");
    axios
      .get<Partial<ContractResponse>>(Api("employee/contract"), { params })
      .then((res) => {
        setContracts(res.data);
      })
      .catch((err) => {
        setContracts("error");
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
  contracts: ContextContracts;
  setContracts: ((param?: unknown) => void) | null;
};

export interface ContractResponse {
  data: Contract[];
  contract_work: number;
  contract_stop: number;
  contract_payment: number;
  contract_end: number;
}

type ContextContracts =
  | Partial<ContractResponse>
  | "none"
  | "loading"
  | "error";
