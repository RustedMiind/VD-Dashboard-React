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

  console.log("state id :", id, "param id :", params.id);

  function getTenderData() {
    if (idToUse) {
      setTender("loading");
      axios
        .get<{ data?: Tender }>(Api("employee/tender/" + idToUse))
        .then((res) => {
          console.log(res.data);
          if (res.data.data) {
            setTender(res.data.data);
            setId(res.data.data.id);
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

  let formStatus: TenderFormStatus = "create";
  const isUpdateMode = typeof tender === "object"; // checks if the data from api exists,
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
        tenderId: idToUse,
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
  tenderId?: number | string;
  setTenderId?: (id: number) => void;
};

export type TenderFormStatus = "update" | "create" | "complete";
