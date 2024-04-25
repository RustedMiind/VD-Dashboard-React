import { createContext, useEffect, useReducer, useState, Reducer } from "react";
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
import {
  ActionTypes,
  ContractItemsState,
  SubItem,
} from "../FormSections/ContractItems/reducer";
import {
  contractItemsIntial,
  reducer,
} from "../FormSections/ContractItems/reducer";
import { DbOptionType } from "../../../../types/other/DbOptionType";
import { Client } from "../../../../types/Clients";

// use contractT because back-end dont return all contract data in first function we may tell him and update it.
type contractT = {
  contract_type: number;
  id: number;
};
export const ContractDetailsContext = createContext<{
  contract?: Contract;
  use?: ContractUse;
  refreshUse?: (queries: {
    branchId?: number;
    managementId?: number;
  }) => Promise<ContractUse>;
  refreshContract?: () => void;
  disableInputs?: boolean;
  contractItemsData?: ContractItemsState;
  updateContractItemsData?: React.Dispatch<ActionTypes>;
  forceId?: (id: number | undefined) => void;
}>({});

function ContractDetailsContextProvider({ children }: PropsType) {
  const params = useParams();
  const [forceId, setForceId] = useState<number | undefined>(undefined);
  const id = forceId || params.id;
  const [contractDetails, setContractDetails] = useState<undefined | Contract>(
    undefined
  );
  const [disableInputs, setDisableInputs] = useState(true);
  const [contractUse, setContractUse] = useState<undefined | ContractUse>(
    undefined
  );
  const [contractItemsData, updateContractItemsData] = useReducer(
    reducer,
    contractItemsIntial
  );
  const [createdContract, setCreatedContract] = useState<contractT>({
    contract_type: 0,
    id: 0,
  });

  // useEffect(() => {
  //   if (id) {
  //     axios
  //       .get<{ data: ContractItemsState }>(Api(`employee/contract/items/${id}`))
  //       .then((res) => {
  //         // Assuming your API response contains the contract items data
  //         // updateContractItemsData({ type: 'SET_CONTRACT_ITEMS', payload: res.data.data });
  //       })
  //       .catch((err) => {
  //         // Handle error
  //       });
  //   }
  // }, [id]);

  useEffect(getContract, [id]);

  function getContract() {
    console.log("refresh contract executed");
    if (id)
      axios
        .get<{ data: Contract }>(Api(`employee/contract/${id}`))
        .then((res) => {
          setContractDetails(res.data.data);
        })
        .catch((err) => {
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
          setContractUse(res.data);
          ressolve(res.data);
          setDisableInputs(false);
        })
        .catch((err) => {
          setContractUse(undefined);
          reject(err);
          setDisableInputs(true);
        });
    });
  }
  function updateCreatedContractData(data: contractT) {
    setCreatedContract(data);
  }

  return (
    <ContractDetailsContext.Provider
      value={{
        contract: contractDetails,
        use: contractUse,
        refreshContract: getContract,
        refreshUse: getUse,
        disableInputs,
        contractItemsData,
        updateContractItemsData,
        forceId: setForceId,
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
  client?: Client[];
  contractType?: ContractType[];
  employees?: EmployeeType[];
  management?: Management[];
  attachments_types?: DbOptionType[];
};

export default ContractDetailsContextProvider;
