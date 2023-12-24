import { createContext, useEffect, useState } from "react";
import {
  Branch,
  Broker,
  Children,
  Contract,
  ContractType,
  EmployeeType,
  Management,
} from "../../../../types";
import axios from "axios";
import { Api } from "../../../../constants";
import { useParams } from "react-router-dom";

export const ContractDetailsContext = createContext<{
  contract?: Contract;
  use?: ContractUse;
  refreshUse?: (queries: {
    branchId?: number;
    managementId?: number;
  }) => Promise<ContractUse>;
  refreshContract?: () => void;
  disableInputs?: boolean;
}>({});

function ContractDetailsContextProvider({ children }: PropsType) {
  const { id } = useParams();
  const [contractDetails, setContractDetails] = useState<undefined | Contract>(
    undefined
  );
  const [disableInputs, setDisableInputs] = useState(true);
  const [contractUse, setContractUse] = useState<undefined | ContractUse>(
    undefined
  );

  useEffect(getContract, []);

  function getContract() {
    if (id)
      axios
        .get<{ data: Contract }>(Api(`employee/contract/${id}`))
        .then((res) => {
          console.log("Contract Details", res);
          setContractDetails(res.data.data);
        })
        .catch((err) => {
          console.log("Contract Details Error", err);
          setContractDetails(undefined);
        });
    getUse();
  }
  function getUse(queries?: {
    branchId?: number;
    managementId?: number;
  }): Promise<ContractUse> {
    setDisableInputs(true);
    return new Promise((ressolve, reject) => {
      axios
        .get<ContractUse>(Api(`employee/contract/use`), {
          params: {
            management_id: queries?.managementId,
            branch_id: queries?.branchId,
          },
        })
        .then((res) => {
          console.log("Contract Use", res);
          setContractUse(res.data);
          ressolve(res.data);
          setDisableInputs(false);
        })
        .catch((err) => {
          console.log("Contract Use Error", err);
          setContractUse(undefined);
          reject(err);
          setDisableInputs(true);
        });
    });
  }

  return (
    <ContractDetailsContext.Provider
      value={{
        contract: contractDetails,
        use: contractUse,
        refreshContract: getContract,
        refreshUse: getUse,
        disableInputs,
      }}
    >
      {children}
    </ContractDetailsContext.Provider>
  );
}

type PropsType = {
  children: Children;
};

export type ContractUse = {
  branches?: Branch[];
  brokers?: Broker[];
  contractType?: ContractType[];
  employees?: EmployeeType[];
  management?: Management[];
};

export default ContractDetailsContextProvider;
