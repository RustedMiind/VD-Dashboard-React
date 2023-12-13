import { useParams } from "react-router-dom";
import { Stack, Typography, Grid, Box, Paper } from "@mui/material";
import FinantialTable from "./FinancialTable";
import { PieChart } from "@mui/x-charts";
import TableDetails from "./TableDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../constants";
import { ClientDetailsType } from "../../../types/Clients";

function ClientDetails() {
  const { id } = useParams();
  const [clientData, setClientData] = useState<ClientDetailsType | null>(null);
  useEffect(() => {
    axios
      .get<ClientDetailsType>(Api(`employee/contract/project/${id}`))
      .then((res) => {
        setClientData(res?.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Stack>
      <Grid container px={2} py={2} mb={2}>
        <Grid item xs={3}>
          <Box>
            <Typography variant="subtitle2" color="gray" mb={1}>
              الاسم
            </Typography>
            <Typography>{clientData?.client?.name}</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <Typography variant="subtitle2" color="gray" mb={1}>
              البريد الالكتروني
            </Typography>
            <Typography>{clientData?.client?.email}</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <Typography variant="subtitle2" color="gray" mb={1}>
              رقم التليفون
            </Typography>
            <Typography>{clientData?.client?.phone}</Typography>
          </Box>
        </Grid>
      </Grid>

      <Paper>
        <Grid container>
          <Grid item md={6}>
            <Grid container>
              <Typography variant="h6" mb={2}>
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
                <Typography textAlign={"center"} variant="h6" mb={2}>
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
        {clientData?.data.length ? (
          <TableDetails ClientData={clientData} />
        ) : (
          "لايوجد عقود"
        )}
      </Stack>
    </Stack>
  );
}

export default ClientDetails;
