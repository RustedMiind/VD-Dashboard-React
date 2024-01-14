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
  const [tenderControlData, setTenderControlData] = useState<TenderStateType>({
    incoming: "none",
    ongoing: "none",
  });
  function getTender(params?: unknown) {
    setTenderControlData({
      incoming: "loading",
      ongoing: "loading",
    });
    axios
      .get<Partial<TenderStateType>>(Api("employee/tender/form"), {
        params,
      })
      .then((res) => {
        let stateToUpdate: TenderStateType = {
          ongoing: "empty",
          incoming: "empty",
        };
        if (res.data.incoming?.length)
          stateToUpdate.incoming = res.data.incoming;

        if (res.data.ongoing?.length) stateToUpdate.ongoing = res.data.ongoing;
        setTenderControlData(stateToUpdate);
      })
      .catch((error) => {
        setTenderControlData({
          incoming: "error",
          ongoing: "error",
        });
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

type TenderStateType = {
  incoming: Tender[] | "none" | "error" | "loading" | "empty";
  ongoing: Tender[] | "none" | "error" | "loading" | "empty";
};
type ContextType = {
  tenderControlData?: TenderStateType;
  setTenderControlData?: ((param?: unknown) => void) | null;
};
