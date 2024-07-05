import { useEffect, useState, createContext } from "react";
import axios from "axios";
import { Contract } from "../../../../types";
import { useParams } from "react-router-dom";
import { Api } from "../../../../constants";

type childrenProps = {
  children: React.ReactNode;
};

export const ContractTyoeAndDataContext =
  createContext<ContractTyoeAndDataContextType>({
    ContractData: undefined,
    ContractType: "Infrestructure",
  });

export function ContractTyoeAndDataContextProvider({
  children,
}: childrenProps) {
  // TODO::declare and define component state and variables
  let { id } = useParams(); //get contract data from url
  const [ContractType, setContractType] = useState<
    "Infrestructure" | "Standard"
  >("Infrestructure");
  const [ContractData, setContractData] = useState<Contract | undefined>(
    undefined
  ); //contract data

  // TODO::get contract data
  useEffect(() => {
    getContract();
  }, [id]);
  // TODO::declare and define component helper methods
  function getContract() {
    if (id) {
      axios
        .get<{ data: Contract }>(Api(`employee/contract/${id}`))
        .then((res) => {
          let _contract = res.data.data;
          setContractData(res.data.data);
          if (_contract?.type?.id === 5) setContractType("Standard");
          else setContractType("Infrestructure");
          console.log("ContractTyoeAndDataContext Data::", _contract);
        })
        .catch((err) => {});
    }
  }
  // * return component ui
  return (
    <ContractTyoeAndDataContext.Provider value={{ ContractData, ContractType }}>
      {children}
    </ContractTyoeAndDataContext.Provider>
  );
}
type ContractTyoeAndDataContextType = {
  ContractData: Contract | undefined;
  ContractType: "Infrestructure" | "Standard";
};
