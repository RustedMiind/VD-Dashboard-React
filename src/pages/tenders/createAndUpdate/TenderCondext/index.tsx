import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tender } from "../../../../types";
import axios from "axios";
import { Api } from "../../../../constants";

export const TenderContext = createContext<ContextType>({});

export function TenderContextProfider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const [id, setId] = useState<number | undefined>(undefined);
  const [tender, setTender] = useState<"none" | "error" | "loading" | Tender>(
    "none"
  );

  const idToUse = params.id || id;

  function getTenderData() {
    if (idToUse) {
      setTender("loading");
      axios
        .get<{ data?: Tender }>(Api("employee/tender/" + idToUse))
        .then((res) => {
          if (res.data.data) {
            setTender(res.data.data);
          } else {
            setTender("error");
          }
        })
        .catch(() => {
          setTender("error");
        });
    }
  }

  useEffect(getTenderData, [idToUse]);

  let formStatus: TenderFormStatus = "loading";

  const isUpdateMode = !!tender; // checks if the data from api exists,
  const isCompleted = typeof tender === "object" && !!tender?.is_done; // checks if all the form are done or not

  if (isUpdateMode) {
    if (isCompleted) formStatus = "update";
    else formStatus = "complete";
  }

  return (
    <TenderContext.Provider
      value={{
        formStatus,
        tender,
        getTenderData,
        setTenderId: setId,
      }}
    >
      {children}
    </TenderContext.Provider>
  );
}

type ContextType = {
  formStatus?: TenderFormStatus;
  tender?: Tender | "loading" | "error" | "none";
  getTenderData?: () => void;
  setTenderId?: (id: number) => void;
};

export type TenderFormStatus =
  | "update"
  | "create"
  | "complete"
  | "loading"
  | "error";
