import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { StandredContractType } from "../../../../types/Contracts/StandredContract";

// * create context
export const StandredContractContext =
  createContext<StandredContractContextType>({
    isExtended: false,
    handleSetSxtended: (open) => {},
    contractType: "",
    contract: undefined,
    storeContract: (contract) => {},
  });

export function StandredContractContextProvider({ children }: PropsType) {
  // TODO::declare and define our state and variables
  const { type } = useParams(); //store contract type
  const [isExtended, setIsExtended] = useState(false); //to control extended ot not accordation.
  const [contract, setContract] = useState<StandredContractType | undefined>(
    undefined
  );

  // TODO::declare and define our helper methods
  /**
   * used to controll extend accordion or not
   * @param open boolean variable
   */
  function handleSetSxtended(open: boolean) {
    setIsExtended(open);
  }

  /**
   * store standard contract
   * @param contract
   */
  function storeContract(contract: StandredContractType | undefined) {
    setContract(contract);
  }

  // return UI.
  return (
    <StandredContractContext.Provider
      value={{
        contract,
        isExtended,
        handleSetSxtended,
        contractType: type ?? "",
        storeContract,
      }}
    >
      {children}
    </StandredContractContext.Provider>
  );
}

// * declare and define needed types
type PropsType = {
  children: React.ReactNode;
};

type StandredContractContextType = {
  isExtended: boolean;
  contractType: string;
  handleSetSxtended(open: boolean): void;
  contract: StandredContractType | undefined;
  storeContract(contract: StandredContractType | undefined): void;
};
