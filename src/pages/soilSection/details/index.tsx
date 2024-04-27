import { Backdrop, CircularProgress, Grid, Stack } from "@mui/material";
import TabsContainer from "./Tabs";
import { createContext, useEffect, useState } from "react";
import { Tender } from "../../../types";
import { FetchStatus } from "../../../types/FetchStatus";
import { FetchStatusEnum } from "../../../types/FetchStatusEnum";
import { useLocation, useParams } from "react-router-dom";
import { Api } from "../../../constants";
import { isStringAllNumbers } from "../../../methods";
import axios from "axios";
import Cards from "./Cards";
import { SoilRequest } from "../../../types/Soil/SoilRequest";
import { Step } from "../../../types/Soil/Step";
import {
  TakeActionFiles,
  IncomingFiles,
} from "../../../types/Soil/FileFinancial";
import Chat from "./Chat";
// import Chat from "./Chat";

export const SoilDataContext = createContext<SoilDataContextType>({});

function SoilDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const url = pathname.includes("showtask")
    ? "employee/soil/-1/"
    : "employee/soil/";
  const [soilData, setSoilData] = useState<SoilRequest | undefined>(undefined);
  const [items, setItems] = useState<Step[] | undefined>(undefined);
  const [reportFiles, setReportFiles] = useState<TakeActionFiles | undefined>(
    undefined
  );
  const [visitFiles, setVisitFiles] = useState<TakeActionFiles | undefined>(
    undefined
  );
  const [taskFiles, setTaskFiles] = useState<TakeActionFiles | undefined>(
    undefined
  );
  const [incomingFiles, setIncomingFiles] = useState<IncomingFiles | undefined>(
    undefined
  );
  function getData() {
    axios
      .get<{
        data: SoilRequest;
        step: Step[];
        tasks: Step[];
        file_visit?: TakeActionFiles;
        file_task?: TakeActionFiles;
        file_report?: TakeActionFiles;
        incoming_fills: IncomingFiles;
      }>(Api(`${url}` + id))
      .then((res) => {
        const arr = res.data.step
          ?.map((item) => {
            if (item.is_current) {
              return res.data.tasks?.find((task) => task.id === item.id);
            }
            return item;
          })
          .filter((item) => !!item) as Step[] | undefined;

        setSoilData(res.data.data);
        setItems(arr);
        setReportFiles(res.data.file_visit);
        setIncomingFiles(res.data.incoming_fills);
        setVisitFiles(res.data.file_visit);
        setTaskFiles(res.data.file_task);
      })
      .catch((err) => {});
  }
  useEffect(getData, [id]);

  return (
    <SoilDataContext.Provider
      value={{
        soilData,
        items,
        setItems: getData,
        reportFiles,
        taskFiles,
        visitFiles,
        incomingFiles,
      }}
    >
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
    </SoilDataContext.Provider>
  );
}

type SoilDataContextType = {
  soilData?: SoilRequest;
  items?: Step[];
  setItems?: () => void;
  reportFiles?: TakeActionFiles;
  taskFiles?: TakeActionFiles;
  visitFiles?: TakeActionFiles;
  incomingFiles?: IncomingFiles;
};
export default SoilDetails;
