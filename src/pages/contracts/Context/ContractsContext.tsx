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
  limit: 0,
  setLimit: null,
});

export function ContractsContextProvider({ children }: childrenProps) {
  let [contracts, setContracts] = useState<ContextContracts>("none");
  let [limit, setLimit] = useState<number>(5);

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

  function setLimitAndUpdate(rows: number) {
    setLimit(rows);
    getAllContracts({ limit: rows });
  }

  return (
    <ContractsContext.Provider
      value={{
        contracts,
        setContracts: getAllContracts,
        limit,
        setLimit: setLimitAndUpdate,
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
}
type ContractContextType = {
  contracts: ContextContracts;
  setContracts: ((param?: unknown) => void) | null;
  limit: number | null;
  setLimit: ((rows: number) => void) | null;
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
