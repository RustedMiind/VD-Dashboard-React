import { useEffect, useState } from "react";
import { Api } from "../../../constants";
import axios from "axios";
import {
  Box,
  Button,
  CardActions,
  Grid,
  Stack,
  CardMedia,
  Typography,
  Card,
  CardActionArea,
} from "@mui/material";
import { NavLink } from "react-router-dom";

function VacationsSettings() {
  const [vacationsArr, setVacationsData] = useState<VacationsArr[] | undefined>(
    undefined
  );

  useEffect(() => {
    axios
      .get<{ date: VacationsArr[] }>(Api("employee/vacation"))
      .then((data) => {
        setVacationsData(data.data.date);
      })
      .catch((err) => {
        setVacationsData(undefined);
      });
  }, []);

  return (
    <Stack>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        إعدادات الأجازات
      </Typography>

      <Grid container spacing={4} mt={1}>
        {vacationsArr?.map((vacation, index) => (
          <Grid item xs={4} key={index}>
            <Card>
              <CardActionArea
                component={NavLink}
                to={`${vacation.id}`}
                sx={{ position: "relative" }}
              >
                <CardMedia
                  component="img"
                  height={220}
                  image="https://w0.peakpx.com/wallpaper/340/751/HD-wallpaper-city-aerial-view-road-buildings-coast-thumbnail.jpg"
                  alt="green iguana"
                />
                <Stack
                  sx={{
                    top: 0,
                    position: "absolute",
                    width: 1,
                    height: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(180deg, rgba(243, 245, 247, 0.5) 0%, #dadcde 72.18%)",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    {vacation.name}
                  </Typography>
                </Stack>
              </CardActionArea>
              <Box
                sx={{
                  backgroundColor: "primary.main",
                }}
                py={1}
              >
                <CardActions
                  sx={{
                    overflowX: "auto",
                    maxWidth: 1,
                    width: 1,
                    direction: "row",
                  }}
                >
                  {vacation.vacation_dates.map(
                    (vacationDate, index) => (
                      <Box
                        key={index}
                        sx={{
                          borderRadius: 1,
                          bgcolor: "Background",
                          maxWidth: 0.318,
                          minWidth: 0.318,
                        }}
                      >
                        <Button size="large" color="primary" fullWidth>
                          {vacationDate.year}
                        </Button>
                      </Box>
                    )
                  )}
                </CardActions>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default VacationsSettings;

type VacationsArr = {
  id: number;
  name: string;
  vacation_dates: VacationDate[];
  vacationbranch: VacationBranch;
};

type VacationBranch = {
  branch_id: number;
  card_image: null;
  created_at: null;
  id: number;
  status_id: number;
  updated_at: null;
};

type VacationDate = {
  id: number;
  branch_id: number;
  year: number;
  created_at: null;
  updated_at: null;
};
