import { useParams } from "react-router-dom";
import { Stack, Typography, Grid, Box, Paper } from "@mui/material";
import FinantialTable from "./FinancialTable";
import { PieChart } from "@mui/x-charts";
import TableDetails from "./TableDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../constants";
import { ClientDetailsType } from "../../../types/Clients";
import LoadingTable from "../../../components/LoadingTable";
import NotFound from "../../../components/NotFound";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ContractsNotFound from "../../contracts/SetContract/Components/ContractsNotFound.1";
function ClientDetails() {
  const params = useParams();
  const [clientData, setClientData] = useState<
    ClientDetailsType | "loading" | "error"
  >("loading");
  const [toSearch, setToSearch] = useState<string>();
  const [limit, setLimit] = useState<string>("5");
  useEffect(() => {
    setClientData("loading");
    axios
      .get<ClientDetailsType>(Api(`employee/contract/project/${params.id}`), {
        params: {
          code: toSearch,
          limit,
        },
      })
      .then((res) => {
        setClientData(res?.data);
      })
      .catch((err) => {
        setClientData("error");
        console.log(err);
      });
  }, [toSearch, limit]);

  return (
    <>
      {clientData === "loading" && <LoadingTable rows={20} cols={5} />}
      {clientData === "error" && <NotFound title="حدث خطأ حاول مرة أخرى" />}
      {typeof clientData === "object" && (
        <Stack>
          <Grid container px={2} py={2} mb={2}>
            <Grid item xs={3}>
              <Box>
                <Typography variant="subtitle2" color="gray" mb={1}>
                  الاسم
                </Typography>
                <Typography fontWeight={600}>
                  {clientData?.client?.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <Typography variant="subtitle2" color="gray" mb={1}>
                  البريد الالكتروني
                </Typography>
                <Typography fontWeight={600}>
                  {clientData?.client?.email}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <Typography variant="subtitle2" color="gray" mb={1}>
                  رقم التليفون
                </Typography>
                <Typography
                  display={"flex"}
                  alignItems={"center"}
                  fontWeight={600}
                >
                  <QuestionAnswerOutlinedIcon sx={{ mr: 1 }} />
                  {clientData?.client?.phone}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Paper sx={{ p: 3 }}>
            <Grid container>
              <Grid item md={6}>
                <Grid container>
                  <Typography variant="h6" mb={2} sx={{ fontWeight: 800 }}>
                    بيان مالي للعقود
                  </Typography>
                  <Grid item md={10}>
                    <FinantialTable clientData={clientData} />
                  </Grid>
                </Grid>
              </Grid>
              {clientData?.data.length !== 0 && (
                <Grid display="flex" justifyContent={"end"} item md={6}>
                  <Box>
                    <Typography
                      textAlign={"center"}
                      variant="h6"
                      mb={2}
                      sx={{ fontWeight: 800 }}
                    >
                      بيان للمشاريع
                    </Typography>
                    <PieChart
                      colors={["#FBB4AE", "#FED9A6", "#CCEBC5", "#D0DCE9"]}
                      series={[
                        {
                          paddingAngle: 4,
                          innerRadius: 5,
                          cornerRadius: 7,
                          data: [
                            { id: 0, value: 10, label: "متوقف" },
                            { id: 1, value: 15, label: "series B" },
                            { id: 2, value: 20, label: "series C" },
                            { id: 3, value: 20, label: "series E" },
                          ],
                        },
                      ]}
                      width={400}
                      height={200}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>

          <Stack>
            {clientData.data.length ? (
              <TableDetails
                ClientData={clientData}
                setToSearch={setToSearch}
                setLimit={setLimit}
                limit={limit}
              />
            ) : (
              <ContractsNotFound />
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default ClientDetails;
