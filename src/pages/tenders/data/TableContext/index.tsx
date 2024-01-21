import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../../constants";
import { Tender } from "../../../../types";
import { Map } from "typescript";
import { TenderItemStatus } from "../../../../types/Tenders/Status.enum";

export const TableContext = createContext<ContextType>({});

export function TenderTableContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tenderTableData, setTenderTableData] =
    useState<TenderStateType>("none");
  const [selectedTenderId, setSelectedTenderId] = useState<number[]>([]);

  let [limit, setLimit] = useState<string>("25");
  let [counts, setCounts] = useState<Counts | undefined>(undefined);
  function getTender(params?: unknown) {
    setTenderTableData("loading");
    axios
      .get<{ data: Tender[]; count?: Counts }>(Api("employee/tender"), {
        params: { draft: 0, ...(typeof params === "object" ? params : {}) },
      })
      .then((res) => {
        if (res.data.data.length) {
          setTenderTableData(res.data.data);
          if (res.data.count) {
            setCounts(res.data.count);
          }
        } else {
          setTenderTableData("empty");
        }
      })
      .catch(() => {
        setTenderTableData("error");
      });
  }
  useEffect(getTender, []);
  function setLimitAndUpdate(rows: string) {
    setLimit(rows);
    getTender({ limit: rows });
  }
  return (
    <TableContext.Provider
      value={{
        tenderTableData,
        setTenderTableData: getTender,
        selectedTenderId,
        setSelectedTenderId,
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
  tenderTableData?: TenderStateType;
  setTenderTableData?: ((param?: unknown) => void) | null;
  selectedTenderId?: number[];
  setSelectedTenderId?: React.Dispatch<React.SetStateAction<number[]>>;
  limit?: string | null;
  setLimit?: ((rows: string) => void) | null;
  counts?: Counts;
};

type Counts = {
  [key in TenderItemStatus]?: string | number;
};

type TenderStateType = "none" | "error" | "loading" | Tender[] | "empty";
