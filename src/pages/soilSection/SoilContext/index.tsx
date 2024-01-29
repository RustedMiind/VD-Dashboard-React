import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../constants";
import { Tender } from "../../../types";
import { Soil } from "../../../types/Soil";

export const SoilContext = createContext<ContextType>({});

export function SoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [soilData, setSoilData] = useState<TenderStateType>("none");
  function getSoil(params?: unknown) {
    setSoilData("loading");
    axios
      .get<Soil>(Api("employee/soil"), { params })
      .then((res) => {
        setSoilData(res?.data);
        console.log(res.data, "abdo");
      })
      .catch(() => {
        setSoilData("error");
      });
  }
  useEffect(getSoil, []);
  //   function setLimitAndUpdate(rows: string) {
  //     setLimit(rows);
  //     getTender({ limit: rows });
  //   }
  return (
    <SoilContext.Provider
      value={{
        soilData,
        setSoilData: getSoil,
        getSoil,
        // selectedTenderId,
        // setSelectedTenderId,
        // limit,
        // setLimit: setLimitAndUpdate,
      }}
    >
      {children}
    </SoilContext.Provider>
  );
}

type ContextType = {
  soilData?: TenderStateType;
  setSoilData?: ((param?: unknown) => void) | null;
  selectedTenderId?: number[];
  setSelectedTenderId?: React.Dispatch<React.SetStateAction<number[]>>;
  limit?: string | null;
  setLimit?: ((rows: string) => void) | null;
  getSoil?: () => void;
};

type TenderStateType = "none" | "error" | "loading" | Soil | "empty";
