import { Box, Button, Paper, Stack } from "@mui/material";
import Tabs from "./Tabs";
import { createContext, useRef, useState } from "react";
import { TabEnum } from "./TabEnum";
import TabViews from "./Views";
import { useQueryParam, StringParam } from "use-query-params";
import PrintIcon from "@mui/icons-material/Print";
import { styled } from "@mui/material/styles";

import ReactToPrint from "react-to-print";
export const NotPrintableTableCell = styled(Box)({
  "@media print": {
    display: "none",
  },
});
export type IdListType = {
  id: number[];
};
function TabsContainer() {
  const [tab, setTab] = useState<TabEnum>(TabEnum.DETAILS);
  const reportPrint: React.RefObject<HTMLTableElement> =
    useRef<HTMLTableElement>(null);
  const handlePrint = () => {
    if (reportPrint.current) {
      window.print();
    }
  };
  return (
    <TabContext.Provider value={{ tab, setTab }}>
      <Stack spacing={1}>
        <Tabs />
        <Stack component={Paper} p={2} ref={reportPrint}>
          <TabViews />
          <NotPrintableTableCell>
            <Box sx={{ display: "flex", justifyContent: "end", my: 2 }}>
              <ReactToPrint
                trigger={() => (
                  <Button
                    variant="contained"
                    startIcon={<PrintIcon />}
                    onClick={handlePrint}
                  >
                    طباعه
                  </Button>
                )}
                content={() => reportPrint.current}
              />
            </Box>
          </NotPrintableTableCell>
        </Stack>
      </Stack>
    </TabContext.Provider>
  );
}

export const TabContext = createContext<TabContextValue>({
  tab: TabEnum.DETAILS,
  setTab() {},
});

export type TabContextValue = {
  tab: TabEnum;
  setTab: (tab: TabEnum) => void;
};

export default TabsContainer;
