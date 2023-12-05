import { createContext, useEffect, useState } from "react";
import {
  Branch,
  Broker,
  Children,
  Contract,
  ContractType,
  EmployeeType,
} from "../../../../types";
import axios from "axios";
import { Api } from "../../../../constants";
import { useParams } from "react-router-dom";

export const ContractDetailsContext = createContext<{
  contract?: Contract;
  use?: ContractUse;
  refreshContract?: () => void;
}>({});

function ContractDetailsContextProvider({ children }: PropsType) {
  const { id } = useParams();
  const [contractDetails, setContractDetails] = useState<undefined | Contract>(
    undefined
  );
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
    axios
      .get<ContractUse>(Api(`employee/contract/use`))
      .then((res) => {
        console.log("Contract Use", res);
        setContractUse(res.data);
      })
      .catch((err) => {
        console.log("Contract Use Error", err);
        setContractUse(undefined);
      });
  }

  return (
    <ContractDetailsContext.Provider
      value={{
        contract: contractDetails,
        use: contractUse,
        refreshContract: getContract,
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
};

export default ContractDetailsContextProvider;
