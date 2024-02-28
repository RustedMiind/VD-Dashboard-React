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
import React, {  useReducer, useContext } from "react";
import { FormData, reducer, ActionTypes } from "../FormSections/BnodElamal/reducer"

interface ContractItemsContextType {
  ContractItemsData: FormData;
  dispatch: React.Dispatch<ActionTypes>;
}
const ContractItemsContext = createContext<ContractItemsContextType | undefined>(undefined);

export const useContractItemsContext = () => {
  const context = useContext(ContractItemsContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};


export const ContractItemsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ContractItemsData, dispatch] = useReducer(reducer, {} as FormData);

  return (
    <ContractItemsContext.Provider value={{ ContractItemsData, dispatch }}>
      {children}
    </ContractItemsContext.Provider>
  );
};

// export const ContractItemsContext = createContext<{
//   contract?: Contract;
//   use?: ContractUse;
//   refreshUse?: (queries: {
//     contract_item_title?: string;
//     managementId?: number;
//   }) => Promise<ContractUse>;
//   refreshContract?: () => void;
//   disableInputs?: boolean;
// }>({});

// function ContractItemsContextProvider({ children }: PropsType) {
//   const { id } = useParams();
//   const [contractDetails, setContractDetails] = useState<undefined | Contract>(
//     undefined
//   );
//   const [disableInputs, setDisableInputs] = useState(true);
//   const [contractUse, setContractUse] = useState<undefined | ContractUse>(
//     undefined
//   );

//   useEffect(getContract, []);

//   function getContract() {
//     if (id)
//       axios
//         .get<{ data: Contract }>(Api(`employee/contract/${id}`))
//         .then((res) => {
//           setContractDetails(res.data.data);
//         })
//         .catch((err) => {
//           setContractDetails(undefined);
//         });
//     getUse();
//   }
//   function getUse(queries?: {
//     branchId?: number;
//     managementId?: number;
//   }): Promise<ContractUse> {
//     setDisableInputs(true);
//     return new Promise((ressolve, reject) => {
//       axios
//         .get<ContractUse>(Api(`employee/contract/use`), {
//           params: {
//             management_id: queries?.managementId,
//             branch_id: queries?.branchId,
//           },
//         })
//         .then((res) => {
//           setContractUse(res.data);
//           ressolve(res.data);
//           setDisableInputs(false);
//         })
//         .catch((err) => {
//           setContractUse(undefined);
//           reject(err);
//           setDisableInputs(true);
//         });
//     });
//   }

//   return (
//     <ContractItemsContext.Provider
//       value={{
//         contract: contractDetails,
//         use: contractUse,
//         refreshContract: getContract,
//         refreshUse: getUse,
//         disableInputs,
//       }}
//     >
//       {children}
//     </ContractItemsContext.Provider>
//   );
// }

// type PropsType = {
//   children: Children;
// };

// export type ContractUse = {
//   branches?: Branch[];
//   brokers?: Broker[];
//   contractType?: ContractType[];
//   employees?: EmployeeType[];
//   management?: Management[];
// };

export default ContractItemsContextProvider;
