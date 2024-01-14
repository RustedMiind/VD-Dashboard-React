import { Stack } from "@mui/material";
import TabsContainer from "./Tabs";
import { createContext, useEffect, useState } from "react";
import { Tender } from "../../../types";
import { FetchStatus } from "../../../types/FetchStatus";
import { FetchStatusEnum } from "../../../types/FetchStatusEnum";
import { useParams } from "react-router-dom";
import { Api } from "../../../constants";
import { isStringAllNumbers } from "../../../methods";
import axios from "axios";

export const TenderDataContext = createContext<TenderDataContextType>({
  tender: FetchStatusEnum.NONE,
});

function TenderDetails() {
  const { id } = useParams();

  const [tender, setTender] = useState<FetchStatus<Tender>>(
    FetchStatusEnum.NONE
  );

  useEffect(() => {
    if (id) {
      setTender(FetchStatusEnum.LOADING);
      getTender(id)
        .then((res) => {
          setTender(res);
        })
        .catch(() => {
          setTender(FetchStatusEnum.ERROR);
        });
    } else setTender(FetchStatusEnum.ERROR);
  }, [id]);

  return (
    <TenderDataContext.Provider value={{ tender }}>
      <Stack>
        {/* Cards */}
        <TabsContainer />
      </Stack>
    </TenderDataContext.Provider>
  );
}

function getTender(id: string): Promise<Tender> {
  return new Promise((ressolve, reject) => {
    if (isStringAllNumbers(id)) {
      axios
        .get<{ data: Tender }>(Api("employee/tender/" + id))
        .then((res) => {
          ressolve(res.data.data);
        })
        .catch(reject);
    } else {
      reject({ msg: "برجاء ادخال مدخلات صحيحة للبحث عن المنافسة" });
    }
  });
}

type TenderDataContextType = {
  tender: FetchStatus<Tender>;
};

export default TenderDetails;
