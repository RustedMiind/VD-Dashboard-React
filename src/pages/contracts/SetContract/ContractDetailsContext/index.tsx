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
import { ContractItems } from "../../../../types/Contracts/ContractItems";
import {
  ActionTypes,
  ContractItemsState,
  SubItem,
} from "../FormSections/ContractItems/reducer";
import {
  contractItemsIntial,
  reducer,
} from "../FormSections/ContractItems/reducer";

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
  const [contractItemsData, updateContractItemsData] = useReducer(
    reducer,
    contractItemsIntial
  );

  useEffect(() => {
    if (id) {
      axios
        .get<{ data: ContractItemsState }>(Api(`employee/contract/items/${id}`))
        .then((res) => {
          // Assuming your API response contains the contract items data
          // updateContractItemsData({ type: 'SET_CONTRACT_ITEMS', payload: res.data.data });
        })
        .catch((err) => {
          // Handle error
        });
    }
  }, [id]);

  useEffect(getContract, []);

  function getContract() {
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
