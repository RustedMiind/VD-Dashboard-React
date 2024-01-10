import { createContext, useEffect, useState } from "react";
import { Api } from "../../../../constants";
import axios from "axios";
import { Tender } from "../../../../types";

export const ControlPanelContext = createContext<ContextType>({});

export default function ControlPanelContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tenderControlData, setTenderControlData] =
    useState<TenderStateType>("none");
  function getTender(params?: unknown) {
    console.log(params);

    setTenderControlData("loading");
    axios
      .get<tenderControlType>(Api("employee/tender/form/eng_employee"), {
        params,
      })
      .then((res) => {
        if (res.data) {
          setTenderControlData(res.data);
          console.log(res.data);
          console.log(res.data);
        } else {
          setTenderControlData("empty");
        }
      })
      .catch((error) => {
        setTenderControlData("error");
      });
  }
  useEffect(() => {
    getTender();
  }, []);
  return (
    <ControlPanelContext.Provider
      value={{
        tenderControlData,
        setTenderControlData: getTender,
      }}
    >
      {children}
    </ControlPanelContext.Provider>
  );
}

type tenderControlType = {
  incoming: Tender[];
  ongoing: Tender[];
};
type ContextType = {
  tenderControlData?: TenderStateType;
  setTenderControlData?: ((param?: unknown) => void) | null;
};

type TenderStateType =
  | "none"
  | "error"
  | "loading"
  | tenderControlType
  | "empty";
