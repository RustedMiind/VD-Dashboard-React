import { Backdrop, CircularProgress, Grid, Stack } from "@mui/material";
import TabsContainer from "./Tabs";
import { createContext, useEffect, useState } from "react";
import { Tender } from "../../../types";
import { FetchStatus } from "../../../types/FetchStatus";
import { FetchStatusEnum } from "../../../types/FetchStatusEnum";
import { useParams } from "react-router-dom";
import { Api } from "../../../constants";
import { isStringAllNumbers } from "../../../methods";
import axios from "axios";
import Cards from "./Cards";
import Chat from "./Chat";

export const TenderDataContext = createContext<TenderDataContextType>({
  tender: FetchStatusEnum.NONE,
  refresh() {},
});

function TenderDetails() {
  const { id } = useParams();

  const [tender, setTender] = useState<FetchStatus<Tender>>(
    FetchStatusEnum.NONE
  );
  function loadTender() {
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
  }
  useEffect(loadTender, [id]);

  return (
    <TenderDataContext.Provider value={{ tender, refresh: loadTender }}>
      <Stack>
        <Cards />
        <Grid container spacing={2}>
          <Grid item md={9} sm={6}>
            <TabsContainer />
          </Grid>
          <Grid item md={3} sm={8}>
            <Chat />
          </Grid>
        </Grid>
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={tender === FetchStatusEnum.LOADING}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
  refresh: () => void;
};

export default TenderDetails;
