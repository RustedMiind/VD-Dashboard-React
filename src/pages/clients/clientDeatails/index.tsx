import { useParams } from "react-router-dom";
import { Stack, Typography, Grid, Box, Paper } from "@mui/material";
import FinantialTable from "./FinancialTable";
import { PieChart } from "@mui/x-charts";
import TableDetails from "./TableDetails";

function ClientDetails() {
  const { id } = useParams();

  console.log(id);

  return (
    <Stack>
      <Grid container px={2} py={2} mb={2}>
        <Grid item xs={3}>
          <Box>
            <Typography variant="subtitle2" color="gray" mb={1}>
              الاسم
            </Typography>
            <Typography>بيجاد السيد العشري</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <Typography variant="subtitle2" color="gray" mb={1}>
              البريد الالكتروني
            </Typography>
            <Typography>begadelashry7@gmail.com</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <Typography variant="subtitle2" color="gray" mb={1}>
              رقم التليفون
            </Typography>
            <Typography>01007381850</Typography>
          </Box>
        </Grid>
      </Grid>

      <Paper elevation={1} square={true} >
        <Grid container p={2} py={2}>
          <Grid item md={6}>
            <Grid container>
              <Typography variant="h6" mb={2}>
                بيان مالي للعقود
              </Typography>
              <Grid item md={10}>
                <FinantialTable />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6}>
            <Box>
              <Typography variant="h6" mb={2} align="center">
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
        </Grid>
      </Paper>

      <Stack>
        <TableDetails  />
      </Stack>
    </Stack>
  );
}

export default ClientDetails;
