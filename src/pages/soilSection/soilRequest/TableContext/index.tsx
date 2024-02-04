import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../../constants";
import { Tender } from "../../../../types";
import { Map } from "typescript";
import { TenderEntityStatus } from "../../../../types/Tenders/Status.enum";
import { SoilRequest } from "../../../../types/Soil/SoilRequest";

export const TableContext = createContext<ContextType>({});

export function SoilRequestTableContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [soilRequest, setSoilRequest] = useState<SoilStateType>("none");
  const [selectSoilId, setselectSoilId] = useState<number[]>([]);

  let [limit, setLimit] = useState<string>("25");
  let [counts, setCounts] = useState<Counts | undefined>(undefined);
  function getSoilData(params?: unknown) {
    setSoilRequest("loading");
    axios
      .get<{ data: SoilStateType }>(Api("employee/soil/index"), {
        params: { ...(typeof params === "object" ? params : {}) },
      })
      .then((res) => {
        setSoilRequest(res.data.data);
      })
      .catch(() => {
        setSoilRequest("error");
      });
  }
  useEffect(getSoilData, []);
  function setLimitAndUpdate(rows: string) {
    setLimit(rows);
    getSoilData({ limit: rows });
  }
  return (
    <TableContext.Provider
      value={{
        soilRequest,
        setSoilRequest: getSoilData,
        selectSoilId,
        setselectSoilId,
        limit,
        setLimit: setLimitAndUpdate,
        counts,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

type ContextType = {
  soilRequest?: SoilStateType;
  setSoilRequest?: ((param?: unknown) => void) | null;
  selectSoilId?: number[];
  setselectSoilId?: React.Dispatch<React.SetStateAction<number[]>>;
  limit?: string | null;
  setLimit?: ((rows: string) => void) | null;
  counts?: Counts;
};

type Counts = {
  [key in TenderEntityStatus]?: string | number;
};

type SoilStateType = "none" | "error" | "loading" | SoilRequest[] | "empty";
