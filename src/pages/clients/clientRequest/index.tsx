import axios from "axios";
import { Api } from "../../../constants";
import { Box, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import LoadingTable from "../../../components/LoadingTable";

const ClientRequests = () => {
  const [currentTab, setCurrentTab] = useState<number>(-1);
  const [requests, setRequests] = useState<[] | "loading" | "none" | "error">(
    "loading"
  );
  const getRequests = () => {
    axios
      .get(Api("employee/client/order"))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getRequests();

  return (
    <>
      <Stack>
        <Typography variant="h5" fontWeight={600} mb={3}>
          طلبات العملاء
        </Typography>

        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          flexDirection="row-reverse"
          flexWrap="wrap"
          alignItems="end"
        >
          <Tabs
            aria-label="basic tabs example"
            value={currentTab}
            onChange={(e, v) => {
              setCurrentTab(v);
            }}
          >
            <Tab label="الكل" value={-1} />
            <Tab label="فرد" value={0} />
            <Tab label="شركة" value={1} />
          </Tabs>
        </Box>
        <Paper sx={{ overflow: "hidden" }} elevation={0}>
          {requests === "loading" && (
            <LoadingTable rows={8} cols={7} height={500} />
          )}
          {requests === "error" && (
            <Typography
              variant="h4"
              color="error"
              textAlign="center"
              fontWeight={700}
              p={1}
              py={4}
            >
              حدث خطأ في عرض الطلبات.
              <br />
              <br />
              برجاء اعادة المحاولة مرة اخري
            </Typography>
          )}
        </Paper>
      </Stack>
    </>
  );
};

export default ClientRequests;
