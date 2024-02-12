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
import { Step } from "../../../types/Soil/Step";
// import Chat from "./Chat";

export const SoilDataContext = createContext<SoilDataContextType>({});

function SoilDetails() {
  const { id } = useParams();
  const url = window.location.href.toString().includes("-1")
    ? "employee/soil/-1/"
    : "employee/soil/";
  const [soilData, setSoilData] = useState<SoilRequest | undefined>(undefined);
  const [items, setItems] = useState<Step[] | undefined>(undefined);
  useEffect(() => {
    axios
      .get<{ data: SoilRequest; step: Step[] }>(Api(`${url}` + id))
      .then((res) => {
        setSoilData(res.data.data);
        setItems(res.data.step);
      })
      .catch((err) => {});
  }, [id]);

  return (
    <SoilDataContext.Provider value={{ soilData, items }}>
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
    </SoilDataContext.Provider>
  );
}

type SoilDataContextType = {
  soilData?: SoilRequest;
  items?: Step[];
};

export default SoilDetails;
