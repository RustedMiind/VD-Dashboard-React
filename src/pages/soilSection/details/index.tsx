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
import { SoilRequest } from "../../../types/Soil/SoilRequest";
// import Chat from "./Chat";

export const SoilDataContext = createContext<SoilDataContextType>({
  soilData: FetchStatusEnum.NONE,
});

function SoilDetails() {
  const { id } = useParams();
  const [soilData, setSoilData] = useState<FetchStatus<SoilRequest>>(
    FetchStatusEnum.NONE
  );
  function loadTender() {
    if (id) {
      setSoilData(FetchStatusEnum.LOADING);
      getSoilData(id)
        .then((res) => {
          setSoilData(res);
        })
        .catch(() => {
          setSoilData(FetchStatusEnum.ERROR);
        });
    } else setSoilData(FetchStatusEnum.ERROR);
  }
  useEffect(loadTender, [id]);

  return (
    <SoilDataContext.Provider value={{ soilData }}>
      <Stack>
        <Cards />
        <Grid container spacing={2}>
          <Grid item md={9} sm={6}>
            <TabsContainer />
          </Grid>
          {/* <Grid item md={3} sm={8}>
            <Chat />
          </Grid> */}
        </Grid>
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={soilData === FetchStatusEnum.LOADING}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </SoilDataContext.Provider>
  );
}

function getSoilData(id: string): Promise<SoilRequest> {
  return new Promise((ressolve, reject) => {
    if (isStringAllNumbers(id)) {
      axios
        .get<{ data: SoilRequest }>(Api("employee/soil/" + id))
        .then((res) => {
          ressolve(res.data.data);
        })
        .catch(reject);
    } else {
      reject({ msg: "برجاء ادخال مدخلات صحيحة للبحث عن المنافسة" });
    }
  });
}

type SoilDataContextType = {
  soilData: FetchStatus<SoilRequest>;
};

export default SoilDetails;
