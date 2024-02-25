import { createContext, useReducer, useState } from "react";
import { Envoy } from "../../../../types/Envoys/Envoy";
import { reducer } from "./reducer";

const ContextInitial: EnvoysContextType = {
  setEnvoys(envoys: Envoy[]) {},
  setError() {},
  setLoading() {},
  state: { status: "none" },
  selectedEnvoys: [],
  selectEnvoy(id) {},
  unselectEnvoy() {},
  selectAllEnvoys() {},
  unselectAllEnvoys() {},
  isAllSelected() {
    return false;
  },
  isSelected(id) {
    return false;
  },
  toggleEnvoy(id, checked) {},
};

export const EnvoysContext = createContext<EnvoysContextType>(ContextInitial);

function EnvoysContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { status: "none" });
  const [selectedEnvoys, setSelectedEnvoys] = useState<number[]>([]);

  const selectEnvoy = (id: number) => {
    if (!selectedEnvoys.includes(id)) {
      setSelectedEnvoys([...selectedEnvoys, id]);
    }
  };

  const toggleEnvoy = (id: number, checked: boolean) => {
    if (!selectedEnvoys.includes(id) && checked) selectEnvoy(id);
    else if (selectedEnvoys.includes(id) && !checked) unselectEnvoy(id);
  };

  const unselectEnvoy = (id: number) => {
    if (selectedEnvoys.includes(id)) {
      setSelectedEnvoys(selectedEnvoys.filter((e) => e !== id));
    }
  };

  const setEnvoys = (envoys: Envoy[]) => {
    dispatch({ type: "SET_ENVOYS", payload: envoys });
  };

  const selectAllEnvoys = () => {
    state.envoys && setSelectedEnvoys(state.envoys?.map((e) => e.id));
  };
  const unselectAllEnvoys = () => {
    setSelectedEnvoys([]);
  };

  const setLoading = () => {
    dispatch({ type: "SET_LOADING", payload: undefined });
  };

  const setError = () => {
    dispatch({ type: "SET_ERROR", payload: undefined });
  };

  const isAllSelected = (): boolean => {
    return selectedEnvoys.length === state.envoys?.length;
  };

  const isSelected = (id: number): boolean => {
    return selectedEnvoys.includes(id);
  };

  return (
    // Context Initial Still have no state
    <EnvoysContext.Provider
      value={{
        selectedEnvoys,
        state,
        selectEnvoy,
        unselectEnvoy,
        setEnvoys,
        setError,
        setLoading,
        selectAllEnvoys,
        unselectAllEnvoys,
        isAllSelected,
        isSelected,
        toggleEnvoy,
      }}
    >
      {children}
    </EnvoysContext.Provider>
  );
}

type EnvoysContextType = {
  setLoading: () => void;
  setError: () => void;
  setEnvoys: (envoys: Envoy[]) => void;
  state: EnvoysStateType;
  selectedEnvoys: number[];
  selectEnvoy: (id: number) => void;
  toggleEnvoy: (id: number, checked: boolean) => void;
  unselectEnvoy: (id: number) => void;
  selectAllEnvoys: () => void;
  unselectAllEnvoys: () => void;
  isAllSelected: () => boolean;
  isSelected: (id: number) => boolean;
};

export type EnvoysStateType = {
  envoys?: Envoy[];
  status: "none" | "loading" | "error";
};

export default EnvoysContextProvider;
