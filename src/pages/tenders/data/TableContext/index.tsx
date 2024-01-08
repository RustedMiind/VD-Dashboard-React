import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../../constants";
import { Tender } from "../../../../types";

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
  function getTender(params?: unknown) {
    setTenderTableData("loading");
    axios
      .get<{ data: Tender[] }>(Api("employee/tender"), { params })
      .then((res) => {
        if (res.data.data.length) {
          setTenderTableData(res.data.data);
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
};

type TenderStateType = "none" | "error" | "loading" | Tender[] | "empty";
