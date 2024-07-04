import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { StandredContractType } from "../../../../types/Contracts/StandredContract";
import { Api } from "../../../../constants";

// * create context
export const StandredContractContext =
  createContext<StandredContractContextType>({
    isExtended: false,
    handleSetSxtended: (open) => {},
    contractType: "",
    contract: undefined,
    storeContract: (contract) => {},
    isEdit: false,
    getContractData: () => {},
  });

export function StandredContractContextProvider({ children }: PropsType) {
  // TODO::declare and define our state and variables
  const { type, contractId } = useParams(); // store contract type.
  const isEdit = contractId ? true : false; // determine which case create or edit.
  const [isExtended, setIsExtended] = useState(isEdit); //to control extended ot not accordation.
  const [contract, setContract] = useState<StandredContractType | undefined>(
    undefined
  );

  // Fetch data of contract on Edit case
  useEffect(() => {
    if (isEdit) {
      // TODO::fetch contract data.
      getContractData();
    }
  }, [isEdit]);

  // TODO::declare and define our helper methods
  /**
   * used to controll extend accordion or not
   * @param open boolean variable
   */
  function handleSetSxtended(open: boolean) {
    setIsExtended(open);
  }

  function getContractData() {
    axios
      .get<{ unified_contract: StandredContractType[] }>(
        Api(`employee/unified-contract/${contractId}`)
      )
      .then((response) => {
        if (
          response.data.unified_contract &&
          response.data.unified_contract.length
        ) {
          setContract(response.data.unified_contract[0]);
        }
      })
      .catch((err) => {});
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
        isEdit,
        getContractData,
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
  isEdit: boolean;
  getContractData(): void;
};
