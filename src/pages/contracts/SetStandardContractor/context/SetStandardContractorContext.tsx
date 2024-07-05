import { createContext } from "react";
import { useParams } from "react-router-dom";

export const SetStandardContractorContext =
  createContext<SetStandardContractorContextType>({});

export function SetStandardContractorContextProvider({
  children,
}: childrenProps) {
  // TODO::declare and define component state and variables
  let { contractId } = useParams(); //contract id

  // TODO::declare and define component helper methods

  // TODO::return component ui.
  return (
    <SetStandardContractorContext.Provider value={{}}>
      {children}
    </SetStandardContractorContext.Provider>
  );
}

type SetStandardContractorContextType = {};

type childrenProps = {
  children: React.ReactNode;
};
