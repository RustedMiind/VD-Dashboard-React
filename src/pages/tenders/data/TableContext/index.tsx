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
  const [tenderId, setTenderId] = useState<number[]>([]);
  console.log(tenderId);
  function getTender(params?: unknown) {
    setTenderTableData("loading");
    axios
      .get<{ data: Tender[] }>(Api("employee/tender"), { params })
      .then((res) => {
        console.log("res", res.data.data);
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

  return (
    <TableContext.Provider
      value={{
        tenderTableData,
        setTenderTableData: getTender,
        tenderId,
        setTenderId,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

type ContextType = {
  tenderTableData?: TenderStateType;
  setTenderTableData?: ((param?: unknown) => void) | null;
  tenderId?: number[];
  setTenderId?: React.Dispatch<React.SetStateAction<number[]>>;
};

type TenderStateType = "none" | "error" | "loading" | Tender[] | "empty";
