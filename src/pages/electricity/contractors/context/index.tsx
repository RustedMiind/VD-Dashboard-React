import { createContext, useReducer, useState } from "react";
import { reducer } from "./reducer";
import { Contractor } from "../../../../types/Contractors/Contractor";

const ContextInitial: ContractorsContextType = {
  setContractors(contractors: Contractor[]) {},
  setError() {},
  setLoading() {},
  state: { status: "none",contractors:[] },
  selectedContractors: [],
  selectContractor(id) {},
  unselectContractor() {},
  selectAllContractors() {},
  unselectAllContractors() {},
  isAllSelected() {
    return false;
  },
  isSelected(id) {
    return false;
  },
  toggleContractor(id, checked) {},
};

export const ContractorsContext =
  createContext<ContractorsContextType>(ContextInitial);

function ContractorsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, { status: "none" });
  const [selectedContractors, setSelectedContractors] = useState<number[]>([]);

  const selectContractor = (id: number) => {
    if (!selectedContractors.includes(id)) {
      setSelectedContractors([...selectedContractors, id]);
    }
  };

  const toggleContractor = (id: number, checked: boolean) => {
    if (!selectedContractors.includes(id) && checked) selectContractor(id);
    else if (selectedContractors.includes(id) && !checked)
      unselectContractor(id);
  };

  const unselectContractor = (id: number) => {
    if (selectedContractors.includes(id)) {
      setSelectedContractors(selectedContractors.filter((e) => e !== id));
    }
  };

  const setContractors = (contractors: Contractor[]) => {
    dispatch({ type: "SET_CONTRACTORS", payload: contractors });
  };

  const selectAllContractors = () => {
    state.contractors &&
      setSelectedContractors(state.contractors?.map((e) => e.id));
  };
  const unselectAllContractors = () => {
    setSelectedContractors([]);
  };

  const setLoading = () => {
    dispatch({ type: "SET_LOADING", payload: undefined });
  };

  const setError = () => {
    dispatch({ type: "SET_ERROR", payload: undefined });
  };

  const isAllSelected = (): boolean => {
    return selectedContractors.length === state.contractors?.length;
  };

  const isSelected = (id: number): boolean => {
    return selectedContractors.includes(id);
  };

  return (
    // Context Initial Still have no state
    <ContractorsContext.Provider
      value={{
        selectedContractors,
        state,
        selectContractor,
        unselectContractor,
        setContractors,
        setError,
        setLoading,
        selectAllContractors,
        unselectAllContractors,
        isAllSelected,
        isSelected,
        toggleContractor,
      }}
    >
      {children}
    </ContractorsContext.Provider>
  );
}

type ContractorsContextType = {
  setLoading: () => void;
  setError: () => void;
  setContractors: (contractors: Contractor[]) => void;
  state: ContractorsStateType;
  selectedContractors: number[];
  selectContractor: (id: number) => void;
  toggleContractor: (id: number, checked: boolean) => void;
  unselectContractor: (id: number) => void;
  selectAllContractors: () => void;
  unselectAllContractors: () => void;
  isAllSelected: () => boolean;
  isSelected: (id: number) => boolean;
};

export type ContractorsStateType = {
  contractors?: Contractor[];
  status: "none" | "loading" | "error";
};

export default ContractorsContextProvider;
