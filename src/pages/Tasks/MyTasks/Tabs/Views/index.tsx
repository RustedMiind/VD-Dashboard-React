import { Paper } from "@mui/material";
import { TabsEnum } from "..";
import { useMemo } from "react";
import IncomingTasks from "./IncomingTasks";
import OngoingTasks from "./OngoingTasks";
import { motion } from "framer-motion";
function Views({ tab }: PropsType) {
  const ViewComponent: React.ReactNode = useMemo(() => {
    switch (tab) {
      case TabsEnum.INCOMING:
        return <IncomingTasks />;
      case TabsEnum.ONGOING:
        return <OngoingTasks />;
    }
  }, [tab]);

  return (
    <motion.div
      key={tab}
      layout
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <Paper sx={{ p: 2 }}>{ViewComponent}</Paper>
    </motion.div>
  );
}

type PropsType = {
  tab: TabsEnum;
};

export default Views;
